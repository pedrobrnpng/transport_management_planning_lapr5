% A*
:- consult('./algoritmos/a_star').
% Algoritmo Genetico
:- consult('./algoritmos/algoritmo_genetico_adaptado').
:-dynamic init/8.
:-dynamic sol/1.
% Gerar serviços viatura
:- consult('./algoritmos/SprintD').

% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_open)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_error)).
:- use_module(library(uri)).
:- use_module(library(http/http_cors)).
:- use_module(library(ssl)).
:- use_module(library(http/http_ssl_plugin)).

:- set_setting(http:cors, [*]).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

% Routes
:- http_handler(root(hello_world), say_hi, []).
:- http_handler('/mudmot', mud_mot_meth, []).
:- http_handler('/algen', algen_meth, []).
:- http_handler('/gerast', gera_st,[]).
:- http_handler(root(test), test, []).

:- json_object nos_mud(noi: string, nof: string).
:- json_object algen_data(sv: string, ng: string, dm: string, pb: string, pm: string, pi: string, tempo: string, aval: string).
:- json_object path(no: string) + [type=list(any)].
:- json_object algen_sol(sol: string).

server(Port) :-
        http_server(http_dispatch, [port(Port)]),
        asserta(port(Port)).

stopServer:-
        retract(port(Port)),
        http_stop_server(Port,_).

say_hi(_Request):-
        format('Content-type: text/plain~n~n'),
        format('Hello World!~n').

algen_meth(Request):-
        ((
        option(method(options), Request),!,cors_enable(Request,[methods([get,post,delete])]),format('~n')
        );(
        cors_enable(Request,[ methods([get,post,delete,options])]),
        http_read_json(Request, Json),
        json_to_prolog(Json, Data),
        algen(Data,Sol),
        arg(1, Sol, L),
        prolog_to_json(L,SolJ),
        reply_json(SolJ))).

algen(Data, Sol):-
        arg(1,Data,Data1),
        Data1=[NSV|[NG|[DP|[P1|[P2|[P3|[P4|[P5|_]]]]]]]],
        arg(2,NSV,NSV1),
        arg(2,NG,NG1),
        arg(2,DP,DP1),
        arg(2,P1,P11),
        arg(2,P2,P21),
        arg(2,P3,P31),
        arg(2,P4,P41),
        arg(2,P5,P51),
        init(NSV1, NG1, DP1, P11, P21, P31, P41, P51),
        sol(Sol).


mud_mot_meth(Request):-
        consumo,
        gera_ligacoes,
        ((
		option(method(options), Request),!,cors_enable(Request,[methods([get,post,delete])]),format('~n')
	);(
        cors_enable(Request,[ methods([get,post,delete,options])]),
        http_read_json(Request, Json),
        json_to_prolog(Json, Nos),
        mud_mot(Nos,Ca),
        prolog_to_json(Ca,CaJ),
        reply_json(CaJ))).
        
mud_mot(Nos,Ca):-
        arg(1,Nos,Nos1),
        Nos1=[NoI|_],
        arg(2,NoI,NoI1),
        Nos1=[_|[NoF|_]],
        arg(2,NoF,NoF1),
        aStar(NoI1,NoF1,Ca,_).

mud_mot1(NoI,NoF,Ca):-
        aStar(NoI,NoF,Ca,_).

gera_st(Request):-
        ((
                option(method(options), Request),!,cors_enable(Request,[methods([get,post,delete])]),format('~n')
        );(
        cors_enable(Request,[ methods([get,post,delete,options])]),
        sprintD(_,A),findall(S,(driverduty(X,Y),string_concat(X,'-',S1),atomic_list_concat(Y, ';', Atom),string_concat(S1,Atom,S)),Lista),
        atomic_list_concat(A, '.', AL),string_concat(AL,'+',AL2),
        atomic_list_concat(Lista, ',', Atom2),string_concat(AL2,Atom2,Lista2),atom_string(Lista2, String2),
        prolog_to_json(String2,ReP),
        reply_json(ReP))).

test(_Request):-
        gera_ligacoes,
        mud_mot1('CRIST','ESTLO',Ca),
        prolog_to_json(Ca,CaJ),
        cors_enable,
        reply_json(CaJ).

inicializar_server:-
        server(5000),!.

:- inicializar_server.
