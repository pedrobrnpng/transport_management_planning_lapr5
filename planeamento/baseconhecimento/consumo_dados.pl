% Bibliotecas HTTP
:- use_module(library(ssl)).
:- use_module(library(http/http_ssl_plugin)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_open)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- json_object no(abv: string, name: string, type: string, xCoor: string, yCoor: string).
:- json_object velocidade(value: number).
:- json_object distancia(value: number).


nos(Request):-
        asserta(no_id(0)),
        json_read_dict(Request, Nos),
        regista_no(Nos),
        retract(no_id(_)),
        close(Request).

regista_no([]).
regista_no([H|T]):-
        retract(no_id(B)),
        text_to_string('paragem', P),
        text_to_string('pontorendicao', PR),
        text_to_string('estacaorecolha', ER),
        text_to_string(H.type,Tipo),
        atom_concat('', H.name, Nome),
        atom_concat('', H.id_abreviature, Abv2),
        
        ((Tipo == P, asserta(no(B,Nome, Abv2, f, f, H.xCoordinate, H.yCoordinate,0)));
        (Tipo == PR, asserta(no(B,Nome, Abv2, t, f, H.xCoordinate, H.yCoordinate,0)));
        (Tipo == ER, asserta(no(B,Nome, Abv2, f, t, H.xCoordinate, H.yCoordinate,0)))),
        B1 is B + 1,
        asserta(no_id(B1)),
        regista_no(T).

linhas(Request):-
        json_read_dict(Request, Linhas),
        regista_linha(Linhas),
        close(Request).
        
regista_linha([]).
regista_linha([H|T]):-
        asserta(velocidade_maxima(50)),
        text_to_string(H.id, Id),
        length(H.idTiposViatura, Tam),
        (Tam > 0 -> tipos_viatura(H.idTiposViatura);true),
        URL = 'https://optlapr.herokuapp.com/api/percursos/linhas/',
        string_concat(URL,Id,URLF),
        http_open(URLF, Request, [request_header('Origin'='http://localhost:4200')]),
        json_read_dict(Request, P),
        percursos(H.nome, P),
        retract(velocidade_maxima(_)),
        close(Request),
        regista_linha(T).

percursos(_,[]).
percursos(Nome,[H|_]):-
        segmentos(Nome, H.id, H.segmentosRede).
percursos(Nome,[H|T]):-
        segmentos(Nome, H.id, H.segmentosRede),
        percursos(Nome,T).

segmentos(Nome, IdP, Seg):-segmentos(Nome, IdP, Seg,[],_,0,0).
segmentos(Nome, IdP, [H], L, Cam, Dist, Tempo):- 
        atom_concat('', H.idNoInicio, NoI),
        atom_concat('', H.idNoFim, NoF),
        H.distancia=V,
        Distx is Dist + V.value,
        H.tempoViagem=T,
        Tempox is Tempo + T.value,
        
        LR=[NoI|L],
        reverse([NoF|LR], Cam),
        velocidade_maxima(VELOCIDADE),
        atom_number(IdP, IdN),
        atom_concat('', Nome, Nomex),
        asserta(linha(Nomex, IdN, Cam, Distx, Tempox, VELOCIDADE)).

segmentos(Nome, IdP, [H|T], L, Cam, Dist, Tempo):- 
        atom_concat('', H.idNoInicio, NoI),
        H.distancia=V,
        Distx is Dist + V.value,
        H.tempoViagem=B,
        Tempox is Tempo + B.value,
        segmentos(Nome,IdP,T,[NoI|L],Cam,Distx,Tempox).
        
tipos_viatura([]).
tipos_viatura([H|_]):-
        URL = 'https://optlapr.herokuapp.com/api/tipoViatura/',
        text_to_string(H,Id),
        string_concat(URL,Id,URLF),
        http_open(URLF, Request, [request_header('Origin'='http://localhost:4200')]),
        json_read_dict(Request, R),
        VA = R.velocidadeMedia,
        velocidade_maxima(V), 
        (VA > V -> (retract(velocidade_maxima(_)), asserta(velocidade_maxima(VA)));true),
        close(Request).
tipos_viatura([H|T]):-
        URL = 'https://optlapr.herokuapp.com/api/tipoViatura/',
        text_to_string(H,Id),
        string_concat(URL,Id,URLF),
        http_open(URLF, Request, [request_header('Origin'='http://localhost:4200')]),
        json_read_dict(Request, R),
        VA = R.velocidadeMedia,
        velocidade_maxima(V), 
        (VA > V -> (retract(velocidade_maxima(_)), asserta(velocidade_maxima(VA)));true),
        close(Request),
        tipos_viatura(T).

viagens(Request):-
        json_read_dict(Request, Viagens),
        regista_viagens(Viagens),
        close(Request).

regista_viagens([]).
regista_viagens([H|T]):-
        asserta(viagem(H.codigo, H.horaInicio, H.idPercurso, H.linha)),
        regista_viagens(T).

consumo():-
        retractall(no(_,_,_,_,_,_,_,_)),
        retractall(linha(_,_,_,_,_,_)),
        retractall(viagem(_,_,_,_,_,_)),
        http_open('https://optlapr.herokuapp.com/api/nos', Nos, [request_header('Origin'='http://localhost:4200')]),
        nos(Nos),
        close(Nos),
        http_open('https://optlapr.herokuapp.com/api/linhas', Linhas, [request_header('Origin'='http://localhost:4200')]),
        linhas(Linhas),
        close(Linhas),
        http_open('https://mdvlapr.herokuapp.com/api/Viagens', Viagens, [request_header('Origin'='http://localhost:4200')]),
        viagens(Viagens),
        close(Viagens).