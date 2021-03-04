:- consult('../baseconhecimento/files/bc_teste').

:- dynamic melhor_sol_distancia/2.
:- dynamic ligad/7.

gera_ligacoes:- retractall(ligad(_,_,_,_,_,_)),
    findall(_,
        ((no(_,_,No1,t,f,_,_,_);no(_,_,No1,f,t,_,_,_)),
        (no(_,_,No2,t,f,_,_,_);no(_,_,No2,f,t,_,_,_)),
        No1\==No2,
        linha(_,N,LNos,_,V,X),
        ordem_membros(No1,No2,LNos),
        horario(N,Lh),valorHorario(No1,LNos,Lh,Ci),valorHorario(No2,LNos,Lh,Cf),
        Ci>0,Cf>0,Y is Cf - Ci,Y >0,
        assertz(ligad(N,No1,No2,X,Y,V))
        ),_).

ordem_membros(No1,No2,[No1|L]):- member(No2,L),!.
ordem_membros(No1,No2,[_|L]):- ordem_membros(No1,No2,L).

bestfs(Orig,Dest,Cam,Custo):-
    bestfs2(Dest,(_,0,0,0,[Orig]),Cam,Custo).
    
bestfs2(Dest,(_,_,_,Custo,[Dest|T]),Cam,Custo):-
    reverse([Dest|T],Cam).
    
bestfs2(Dest,(_,Ch,DistT,Ca,LA),Cam,Custo):-
    LA=[Act|_],
    findall(
        (EstX,Ce,DistC,CaX,[X|LA]),
        (ligad(Id,Act,X,_,V,Dist),
        \+member(X,LA),
        linha(_,Id,Lp,_,_,_),
        horario(Id,Lv),
        valorHorario(Act,Lp,Lv,Ce),
        valorHorario(X,Lp,Lv,_Cs),Ce>=Ch,calculo(Ce,Ch,ChD),
        estimativa(X,Dest,EstX),
        CaX is ChD+Ca+V,
        DistC is Dist+DistT),
        Novos),
    sort(Novos,NovosOrd),
    proximo(NovosOrd,CS,DistS,CM,Melhor),
    bestfs2(Dest,(EstX,CS,DistS,CM,Melhor),Cam,Custo).

calculo(X,Y,Z):-(Y>0,!,(A is X-Y,calculoSeZero(A,Z)));(Z is 0).
calculoSeZero(A,Z):-(A>0,!,Z is A);(Z is 120).

proximo([(_,CS,DistS,CM,Melhor)|_],CS,DistS,CM,Melhor).
proximo([_|L],CS,DistS,CM,Melhor):-proximo(L,CS,DistS,CM,Melhor).

estimativa(Nodo1,Nodo2,Estimativa):-
    no(_,_,Nodo1,_,_,X1,Y1,_),
    no(_,_,Nodo2,_,_,X2,Y2,_),
    Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).

plan_mud_mot(Noi,Nof,LCaminho_menosd,Custo):-
    get_time(Ti),
    findall((LCaminho,Custo),bestfs(Noi,Nof,LCaminho,Custo),LLCaminho),
    menor_distancia(LLCaminho,LCaminho_menosd),
    get_time(Tf),
    length(LLCaminho,NSol),
    TSol is Tf-Ti,
    write('Numero de Solucoes:'),
    write(NSol),nl,write('Tempo de geracao da solucao: '),write(TSol),nl.

plan_mud_mot1(Noi,Nof,LCaminho_menosd, Todos):-
    get_time(Ti),
    (melhor_caminho(Noi,Nof,LCaminho_menosd,Todos);true),
    retract(melhor_sol_distancia(LCaminho_menosd,_)),
    get_time(Tf),
    TSol is Tf-Ti,
    write('Tempo de geracao da solucao: '),
    write(TSol),nl.

melhor_caminho(Noi,Nof,LCaminho,Custo):-
    asserta(melhor_sol_distancia(_,100000)),
    bestfs(Noi,Nof,LCaminho,Custo),
    atualiza_melhor(LCaminho,Custo),
    fail.
    
atualiza_melhor(LCaminho,Custo):-
    melhor_sol_distancia(_,N),
    Custo<N,retract(melhor_sol_distancia(_,_)),
    asserta(melhor_sol_distancia(LCaminho,Custo)).

menor_distancia([H|Cams],Cam):-
    arg(2,H,N),arg(1,H,C),
    menor_distancia1(Cams,N,C,Cam).

menor_distancia1([],_,C,C):-!.

menor_distancia1([H|Cams],N,_,Cam):-
    arg(2, H, X),
    X<N,!,
    arg(1, H, C2),
    menor_distancia1(Cams,X,C2,Cam).

menor_distancia1([_|Cams],N,C,Cam):-
    menor_distancia1(Cams,N,C,Cam).

menor([H],H):-!.
menor([H|T],Hmenor):-menor(T,L1),length(H,C),length(L1,C1),
    ((C<C1,!,Hmenor=H);Hmenor=L1).

valorHorario(_,_,[],-1):-!.
valorHorario(_,[],_,-1):-!.
valorHorario(X,[X|_],[H|_],H):-!.
valorHorario(X,[_|L1],[_|L2],H):-valorHorario(X,L1,L2,H).