:- consult('../baseconhecimento/files/bc_teste').

:- dynamic ligaT/6.

gera_ligacoes:- retractall(ligaT(_,_,_,_,_,_)),
    findall(_,
    ((no(_,_,No1,t,f,_,_,_);no(_,_,No1,f,t,_,_,_)),
    (no(_,_,No2,t,f,_,_,_);no(_,_,No2,f,t,_,_,_)),
     No1\==No2,
     linha(_,N,LNos,_,_,V),
     ordem_membros(No1,No2,LNos,Lnt),
    horario(N,_,Lh),valorHorario(No1,LNos,Lh,Ci),valorHorario(No2,LNos,Lh,Cf),
    Ci>0,Cf>0,X is Cf - Ci,X >0,reverse(Lnt,Ln),
     assertz(ligaT(N,No1,No2,X,Ln,V))
    ),_).

ordem_membros(No1,No2,[No1|L],Ln):-ordem_membros2(No2,L,Ln).
ordem_membros(No1,No2,[_|L],Ln):- ordem_membros(No1,No2,L,Ln).
ordem_membros(_,[],_):-!,fail.
ordem_membros2(No2,[No2|_],[No2]):-!.
ordem_membros2(No2,[X|L],[X|Ln]):-ordem_membros2(No2,L,Ln).

calculo(X,Y,Z):-(A is X-Y,calculoSeZero(A,Z)).
calculoSeZero(A,Z):-(A>0,!,Z is A);(Z is 120).

valorHorario(_,_,[],-1):-!.
valorHorario(_,[],_,-1):-!.
valorHorario(X,[X|_],[H|_],H):-!.
valorHorario(X,[_|L1],[_|L2],H):-valorHorario(X,L1,L2,H).

estimativa(Nodo1,Nodo2,V,Estimativa):-
    no(_,_,Nodo1,_,_,X1,Y1,_),
    no(_,_,Nodo2,_,_,X2,Y2,_),
    D is sqrt((X1-X2)^2+(Y1-Y2)^2),
    Estimativa is D/V.

aStar(Orig,Dest,HI,Cam,Custo):-
    gera_ligacoes,
    aStar2(Dest,[(_,HI,0,[Orig])],Cam,Custo).

aStar2(Dest,[(_,_,Custo,[Dest|T])|_],Cam,Custo):-!,
    reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ch,Ca,LA)|Outros],Cam,Custo):-
    LA=[Act|_],
    findall((CEX,Cs,CaX,[X|LA]),
            (Dest\==Act,ligaT(Id,Act,X,CustoX,_,V),\+ member(X,LA),
            linha(_,Id,Lp,_,_,_),horario(Id,_,Lv),valorHorario(Act,Lp,Lv,Ce),valorHorario(X,Lp,Lv,Cs),Ce>=Ch,calculo(Ce,Ch,ChD),
             CaX is CustoX + Ca + ChD,estimativa(X,Dest,V,EstX),
             CEX is CaX + EstX),Novos),
    append(Outros,Novos,Todos),
    %write('Novos='),write(Novos),nl,
    sort(Todos,TodosOrd),
    %write('TodosOrd='),write(TodosOrd),nl,
    aStar2(Dest,TodosOrd,Cam,Custo).