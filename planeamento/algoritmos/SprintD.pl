:-consult('../baseconhecimento/files/horarios_motoristas_teste').
:-consult('./algoritmo_genetico_adaptado_SprintD').
:-consult('./processar_driverduties').
%:-consult('./a_star_SprintD').
 
:-dynamic rangevd/3.
:-dynamic margem/1.
:-dynamic t/4.
:-dynamic m_wb/2.
:-dynamic driverduty/2.

margem(20).

sprintD(DT,A):-
    atribui_motoristas_vds,
    findall(X,lista_motoristas_nworkblocks(X,_),ListaVD),
    sprintD2(ListaVD,ListaPopulacaoFinal),!,
    (retractall(m_wb(_,_));true),!,
    gera_motoristas_wb(ListaPopulacaoFinal),
    findall(X,m_wb(X,_),ListM),
    remove_m_iguais(ListM,ListMU),
    (retractall(driverduty(_,_));true),!,
    cria_driver_duties(ListMU),
    processar_driverduties(A),
    driverduties(DT).

sprintD2([],[]).

sprintD2([VD|ListaVD],[(VD,PF)|ListaPopulacaoFinal]):-
    inicializa(VD),
    gera,populacao_final(PFT),PFT=PF*_,
    sprintD2(ListaVD,ListaPopulacaoFinal).

atribui_motoristas_vds:-
    (retractall(lista_motoristas_nworkblocks(_,_));true),!, 
    gera_ranges,
    verifica_carga,
    cria_tuplos_disponibilidades,
    ordena_vd(ListaVDOrd),
    ordena_m(ListaMOrd),
    atribui_motoristas_vds2(ListaVDOrd,ListaMOrd).

atribui_motoristas_vds2([],_).

atribui_motoristas_vds2([(VD,_)|ListaVDOrd],ListaM):-
    vehicleduty(VD,WBLista),
    length(WBLista,SizeWBLista),
    findall((HI,HF),(member(X,WBLista),workblock(X,_,HI,HF)),ListaHorariosWB),
    maior_wb(ListaHorariosWB,Maior),
    atribui_motoristas_vd(Maior,SizeWBLista,ListaM,ListaMRestantes,ListaMWB),
    asserta(lista_motoristas_nworkblocks(VD,ListaMWB)),
    atribui_motoristas_vds2(ListaVDOrd,ListaMRestantes).



atribui_motoristas_vd(_,SizeWBLista,RestoListaM,RestoListaM,[]):-SizeWBLista < 1,!.

atribui_motoristas_vd(Maior,SizeWBLista,[(_,_,TTM,M)|RestoListaM],RestantesDisponiveis,[(M,NWB)|ListaMWB]):-
    NWB1 is TTM//Maior,
    (
        (NWB1>SizeWBLista,!, NWB is SizeWBLista, SizeWBLista1 is 0)
        ;
        (NWB is NWB1, SizeWBLista1 is SizeWBLista - NWB)
    ),
    atribui_motoristas_vd(Maior,SizeWBLista1,RestoListaM,RestantesDisponiveis,ListaMWB).
    



% Gera ranges para vehicleDuties
gera_ranges:-
    (retractall(rangevd(_,_,_));true),!, 
    findall((VD,WBL),vehicleduty(VD,WBL),Lista),
    gera_ranges2(Lista).

% Gera range para cada vehicle duty com o primeiro e o último bloco de trabalho
gera_ranges2([]):-!.

gera_ranges2([(VD,[WBI|WBR])|Resto]):-
    last(WBR,WBF),
    workblock(WBI,_,TI,_),
    workblock(WBF,_,_,TF),
    asserta(rangevd(VD,TI,TF)),
    gera_ranges2(Resto).

% Verifica se a carga total dos motoristas é 20 % maior que a carga total dos vehiclesDuties
verifica_carga:-
    carga_total_motoristas(CargaMotoristas),
    carga_total_veiculos(CargaVeiculos),
    Calc is ((CargaMotoristas-CargaVeiculos)/CargaVeiculos)*100,
    margem(M),
    Calc > M.

% Calculca a carga total dos motoristas
carga_total_motoristas(Result):- 
    findall(C,horariomotorista(_,_,_,C,_),ListaCargas),
    soma_tudo(ListaCargas,Result).

% Calcula a carga total dos vehicleDuties
carga_total_veiculos(Result):-
    findall(TF-TI,rangevd(_,TI,TF),ListaCargas),
    soma_tudo(ListaCargas,Result).

% Soma todos os valores de uma lista
soma_tudo([],0).

soma_tudo([H|Resto],Result):-soma_tudo(Resto,Result1), Result is Result1 + H.

% Criação de tuplos com disponibilidades de motoristas
cria_tuplos_disponibilidades:-
    (retractall(t(_,_,_,_));true),!, 
    findall((M,HI,HF,TT,LB),horariomotorista(M,HI,HF,TT,LB),ListaHorariosMotoristas),
    cria_tuplos_disponibilidades2(ListaHorariosMotoristas).

% Criação dos tuplos de disponibilidades
cria_tuplos_disponibilidades2([]).

cria_tuplos_disponibilidades2([(M,HI,HF,TT,BTList)|Resto]):-
    DT is (HF - HI) - TT,
    length(BTList,Size),
    Extra is DT//Size,
    %divisao_horario_trabalho(HI,Extra,BTList,HFList),
    cria_tuplos_disponibilidades2(M,HI,Extra,HF,BTList),!,
    cria_tuplos_disponibilidades2(Resto).

cria_tuplos_disponibilidades2(M,HI,_,HF,[T]):-
    asserta(t(HI,HF,T,M)).

cria_tuplos_disponibilidades2(M,HI,Extra,HF,[T|RestoBTList]):-
    HFM is HI + T + Extra,
    asserta(t(HI,HFM,T,M)),
    cria_tuplos_disponibilidades2(M,HFM,Extra,HF,RestoBTList).

ordena_vd(ListaVDOrd):-
    findall((VD,HI),rangevd(VD,HI,_),ListaVD),
    bublesort(ListaVD,ListaVDOrd).
    
bublesort([X],[X]):-!.
bublesort([X|Xs],Ys):-
    bublesort(Xs,Zs),
    bubletroca([X|Zs],Ys).
    
bubletroca([X],[X]):-!.

bubletroca([(X,VX),(Y,VY)|L1],[(Y,VY)|L2]):-
    VX>VY,!,
    bubletroca([(X,VX)|L1],L2).
    
bubletroca([X|L1],[X|L2]):-bubletroca(L1,L2).

maior_wb([(HI,HF)],Maior):-Maior is HF - HI.

maior_wb([(HI,HF)|ListaWB],Maior):-
    maior_wb(ListaWB,Maior1),DF is HF - HI,
    (
        (Maior1 > DF,!, Maior is Maior1)
        ;
        (Maior is DF)
    ).
    
ordena_m(ListaMOrd):-
    findall((HIM,HFM,TTM,M),t(HIM,HFM,TTM,M),ListaM),
    bublesortM(ListaM,ListaMOrd).

bublesortM([X],[X]):-!.
bublesortM([X|Xs],Ys):-
    bublesortM(Xs,Zs),
    bubletrocaM([X|Zs],Ys).
    
bubletrocaM([X],[X]):-!.

bubletrocaM([(VX,HFX,TTX,X),(VY,HFY,TTY,Y)|L1],[(VY,HFY,TTY,Y)|L2]):-
    VX>VY,!,
    bubletrocaM([(VX,HFX,TTX,X)|L1],L2).

bubletrocaM([X|L1],[X|L2]):-bubletrocaM(L1,L2).

gera_motoristas_wb([]):-!.

gera_motoristas_wb([(VD,ListaM)|RestoPop]):-
    vehicleduty(VD,ListaWB),
    gera_motoristas_wb2(ListaM,ListaWB),
    gera_motoristas_wb(RestoPop).

gera_motoristas_wb2([],_).

gera_motoristas_wb2([M|RestoM],[WB|RestoWB]):-
    asserta(m_wb(M,WB)),
    gera_motoristas_wb2(RestoM,RestoWB).

remove_m_iguais([], []):-!.
remove_m_iguais([E|L], R):- member(E, L), !, remove_m_iguais(L, R).
remove_m_iguais([E|L], [E|R]):- remove_m_iguais(L, R).

cria_driver_duties([]):-!.

cria_driver_duties([Ind|RestListaMU]):-
    findall(Y,m_wb(Ind,Y),ListaWB),
    reverse(ListaWB,ListaWBO),
    asserta(driverduty(Ind,ListaWBO)),
    cria_driver_duties(RestListaMU).
    
    


