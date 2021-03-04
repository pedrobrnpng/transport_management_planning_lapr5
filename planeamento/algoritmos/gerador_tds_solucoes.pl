:- consult('../baseconhecimento/files/bc_teste').

:- dynamic melhor_sol_ntrocas/2.
:- dynamic liga/3.

gera_ligacoes:- retractall(liga(_,_,_,_,_)),
    findall(_,
    ((no(_,_,No1,t,f,_,_,_);no(_,_,No1,f,t,_,_,_)),
    (no(_,_,No2,t,f,_,_,_);no(_,_,No2,f,t,_,_,_)),
     No1\==No2,
     linha(_,N,LNos,X,_,V),
     ordem_membros(No1,No2,LNos),
          write(N),write(','),
     write(No1),write(','),
     write(No2),write(','),
     write(X),write(','),
     write(V),write(','),nl,
     assertz(liga(N,No1,No2,X,V))
    ),_).

ordem_membros(No1,No2,[No1|L]):- member(No2,L),!.
ordem_membros(No1,No2,[_|L]):- ordem_membros(No1,No2,L).

menor_ntrocas(Noi,Nof,LCaminho_menostrocas):-
    findall(LCaminho,caminho(Noi,Nof,LCaminho),LLCaminho),
    menor(LLCaminho,LCaminho_menostrocas).
    
menor([H],H):-!.
menor([H|T],Hmenor):-menor(T,L1),length(H,C),length(L1,C1),
    ((C<C1,!,Hmenor=H);Hmenor=L1).

plan_mud_mot(Noi,Nof,LCaminho_menostrocas,Custo):-
    get_time(Ti),
    findall(LCaminho,caminho(Noi,Nof,LCaminho,Custo),LLCaminho),
    menor(LLCaminho,LCaminho_menostrocas),
    get_time(Tf),
    length(LLCaminho,NSol),
    TSol is Tf-Ti,
    write('Numero de Solucoes:'),
    write(NSol),nl,write('Tempo de geracao da solucao:'),write(TSol),nl.

plan_mud_mot1(Noi,Nof,LCaminho_menostrocas, Todos):-
    get_time(Ti),
    (melhor_caminho(Noi,Nof,LCaminho_menostrocas,Todos);true),
    retract(melhor_sol_ntrocas(LCaminho_menostrocas,_)),
    get_time(Tf),
    TSol is Tf-Ti,
    write('Tempo de geracao da solucao:'),
    write(TSol),nl.
    
melhor_caminho(Noi,Nof,LCaminho,Custo):-
    asserta(melhor_sol_ntrocas(_,10000)),
    caminho(Noi,Nof,LCaminho,Custo),
    atualiza_melhor(LCaminho),
    fail.
    
atualiza_melhor(LCaminho):-
    melhor_sol_ntrocas(_,N),
    length(LCaminho,C),
    C<N,retract(melhor_sol_ntrocas(_,_)),
    asserta(melhor_sol_ntrocas(LCaminho,C)).

caminho(Noi,Nof,LCaminho,Custo):-caminho(Noi,Nof,[(0,'','',0,0)],[Noi],LCaminho,Custo).
caminho(No,No,[(_,_,_,Custo,_)|_],[No|T],Lfinal,Custo):-reverse([No|T],Lfinal).
caminho(No1,Nof,Lusadas,L,Lfinal,Custo):-

    Lc = Lusadas,
    Lc = [At|_],
    At = (_,_,_,CustoAtual,HoraAtual),

    liga(IdLinha,No1,No2,TViagem,_), 
    \+member((IdLinha,_,_,_,_),Lusadas),
    \+member((_,No2,_,_,_),Lusadas),
    \+member((_,_,No2,_,_),Lusadas),

    linha(_,IdLinha,Lpontos,_,_,_), horario(IdLinha,Lhoras), 

    valorHorario(No1,Lpontos,Lhoras,Hora),
    valorHorario(No2,Lpontos,Lhoras,Cs),
    Hora>=HoraAtual, calculo(Hora,HoraAtual,ChD),
    
    CustoAtualX is TViagem + ChD + CustoAtual,
    caminho(No2,Nof,[(IdLinha,No1,No2,CustoAtualX,Cs)|Lusadas],[No2|L],Lfinal,Custo).


valorHorario(_,_,[],-1):-!.
valorHorario(_,[],_,-1):-!.
valorHorario(X,[X|_],[H|_],H):-!.
valorHorario(X,[_|L1],[_|L2],H):-valorHorario(X,L1,L2,H).

calculo(X,Y,Z):-(Y>0,!,(A is X-Y, calculoSeZero(A,Z)));(Z is 0).
calculoSeZero(A,Z):-(A>0,!,Z is A);(Z is 120).