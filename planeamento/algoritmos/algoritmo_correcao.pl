:-dynamic driverduty/2.
:-dynamic horario_almoco/2.
:-dynamic horario_jantar/2.
:-dynamic workblock/4.
:-dynamic hora_refeicao_SM3/5.
:-dynamic blocos/2.
:-dynamic erro/2.
:-dynamic motorista/1.
:-dynamic horas_consecutivas_SM1/2.
:-dynamic maximo_horas_diarias_SM1/2.
:-dynamic restricoes_horarios_SM1/2.
:-dynamic restricoes_horario/4.
:-dynamic calcular_intersecao/6.
:-dynamic intersecao_vehicleduties1/2.


corrigir_erros(Erros, [FA, FJ, FHC, FMHD, FRH, FIV]):-
    corrigir_almoco(Erros, FA),
    corrigir_jantar(Erros, FJ),
    corrigir_horas_concecutivas(Erros, FHC),
    corrigir_maximo_horas_diarias(Erros, FMHD),
    corrigir_restricoes_horarios(Erros, FRH),
    corrigir_intercecoes_vehicleduty(Erros, FIV).
    %validar intercecoes

corrigir_almoco(Erros, (1, FA)):-
    erros(Erros, 1, Erros1),
    corrigir_almoco1(Erros1, FA).

corrigir_jantar(Erros, (2, FA)):-
    erros(Erros, 2, Erros2),
    corrigir_jantar1(Erros2, FA).

corrigir_horas_concecutivas(Erros, (3, FHC)):-
    erros(Erros, 3, Erros3),
    corrigir_horas_concecutivas1(Erros3, FHC).
    
corrigir_maximo_horas_diarias(Erros, (4, FMHD)):-
    erros(Erros, 4, Erros4),
    corrigir_maximo_horas_diarias1(Erros4, FMHD).

corrigir_restricoes_horarios(Erros, (5, FRH)):-
    erros(Erros, 5, Erros5),
    corrigir_restricoes_horarios1(Erros5, FRH).

corrigir_intercecoes_vehicleduty(Erros, (6, FIV)):-
    erros(Erros, 6, Erros6),
    corrigir_intercecoes_vehicleduty1(Erros6, FIV).





corrigir_almoco1([], []):-!.
corrigir_almoco1([M | RestoM], FA):-
    horario_almoco(IR, FR),
    corrigir_refeicao(M, IR, FR), !,
    corrigir_almoco1(RestoM, FA).
corrigir_almoco1([M | RestoM], [M | RestoFA]):-
    corrigir_almoco1(RestoM, RestoFA).

corrigir_jantar1([], []):-!.
corrigir_jantar1([M | RestoM], FJ):-
    horario_jantar(IR, FR),
    corrigir_refeicao(M, IR, FR), !,
    corrigir_jantar1(RestoM, FJ).
corrigir_jantar1([M | RestoM], [M | RestoFJ]):-
    corrigir_jantar1(RestoM, RestoFJ).

corrigir_horas_concecutivas1([], []):-!.
corrigir_horas_concecutivas1([E | RestoM], FHC):-
    corrigir_horas_concecutivas2(E), !,
    corrigir_horas_concecutivas1(RestoM, FHC).
corrigir_horas_concecutivas1([E | RestoM], [E | RestoF]):-
    corrigir_horas_concecutivas1(RestoM, RestoF).

corrigir_maximo_horas_diarias1([],[]):-!.
corrigir_maximo_horas_diarias1([M | RestoM], FMHD):-
    corrigir_maximo_horas_diarias2(M), !,
    corrigir_maximo_horas_diarias1(RestoM, FMHD).
corrigir_maximo_horas_diarias1([M | RestoM], [M | RestoF]):-
    corrigir_maximo_horas_diarias1(RestoM, RestoF).

corrigir_restricoes_horarios1([],[]):-!.
corrigir_restricoes_horarios1([(M, VD, _) | RestoM], FR):-
    corrigir_restricoes_horarios2(M, VD), !,
    corrigir_restricoes_horarios1(RestoM, FR).
corrigir_restricoes_horarios1([E | RestoM], [E | RestoF]):-
    corrigir_restricoes_horarios1(RestoM, RestoF).

corrigir_intercecoes_vehicleduty1([], []):-!.
corrigir_intercecoes_vehicleduty1([(_, []) | RestoM], FR):-
    corrigir_intercecoes_vehicleduty1(RestoM, FR).
corrigir_intercecoes_vehicleduty1([(M, [(Ti, Tf) | RestoT]) | RestoM], FR):-
    corrigir_intercecoes_vehicleduty2(M, Ti, Tf), !,
    corrigir_intercecoes_vehicleduty1([(M,  RestoT) | RestoM], FR).
corrigir_intercecoes_vehicleduty1([(M, [(Ti, Tf) | RestoT]) | RestoM], [(M, (Ti, Tf)) | RestoF]):-
    corrigir_intercecoes_vehicleduty1([(M, RestoT) | RestoM], RestoF).


corrigir_refeicao(M, IR, FR):-
    driverduty(M, WBs),
    find_workblocks_R(WBs, IR, FR, WBsN),
    select_workblocks_R(WBsN, M, IR, FR, WBsN1),
    find_substitute(WBsN1, M, NM),!,
    substituir(M, NM, WBsN1).

corrigir_horas_concecutivas2((M, TI, TF)):-
    driverduty(M, WBs),
    find_workblocks_HC(WBs, TI, TF, WBsN),
    select_workblocks_HC(WBsN, M, WBsN1),
    find_substitute(WBsN1, M, NM),!,
    substituir(M, NM, WBsN1).

corrigir_maximo_horas_diarias2(M):-
    driverduty(M, WBs),
    select_workblocks_MHD(WBs, M, WBsN),
    find_substitute(WBsN, M, NM),!,
    substituir(M, NM, WBsN).

corrigir_restricoes_horarios2(M, VD):-
    driverduty(M, WBs),
    find_workblocks_RH(WBs, M, VD, WBsN),
    select_workblocks_RH(WBsN, M, WBsN1),
    find_substitute(WBsN1, M, NM),!,
    substituir(M, NM, WBsN1).

corrigir_intercecoes_vehicleduty2(M, Ti, Tf):-
    driverduty(M, WBs),
    find_workblocks_IV(WBs, Ti, Tf, [_ | RestoWB]),
    find_substitute_IV(RestoWB, M, NM),!,
    substituir(M, NM, RestoWB).



find_workblocks_R([],_, _, []):-!.
find_workblocks_R([WB | RestoWB], IR, FR, [WB | RestoWB1]):-
    workblock(WB, _, TI, TF),
    ((IR < TF, TF =< FR);( IR =< TI, TI < FR)),!,
    find_workblocks_R(RestoWB, IR, FR, RestoWB1).
find_workblocks_R([_ | RestoWB], IR, FR, WBsN):-
    find_workblocks_R(RestoWB, IR, FR, WBsN).


find_workblocks_HC([],_, _, []):-!.
find_workblocks_HC([WB | RestoWB], TI, TF, [WB | RestoWB1]):-
    workblock(WB, _, TI1, TF1),
    (TI1 >= TI, TF1 =< TF),!,
    find_workblocks_HC(RestoWB, TI, TF, RestoWB1).
find_workblocks_HC([_ | RestoWB], TI, TF, WBsN):-
    find_workblocks_HC(RestoWB, TI, TF, WBsN).


find_workblocks_RH([],_,_,[]):-!.
find_workblocks_RH([WB | RestoWB], M, VD, [WB | RestoWB1]):-
    restricoes_horario(M, VD, TI, TF),
    workblock(WB, _, TI1, TF1),
    (TI1 < TI; TF < TF1),!,
    find_workblocks_RH(RestoWB, M, VD, RestoWB1).
find_workblocks_RH([_ | RestoWB], M, VD, WBsN):-
    find_workblocks_RH(RestoWB, M, VD, WBsN).

find_workblocks_IV([], _,_,[]):-!.
find_workblocks_IV([WB| RestoWB], TI, TF, [WB | RestoWB1]):-
	workblock(WB,_,I,F),
	calcular_intersecao(TI, TF, I, F, _, _), !,
	find_workblocks_IV(RestoWB, TI, TF, RestoWB1).
find_workblocks_IV([_ | RestoWB], TI, TF, WB):-
	find_workblocks_IV(RestoWB, TI, TF, WB).

select_workblocks_R(WBs, M, IR, FR, WB):-
    select_workblocks(WBs, 1, M, WB, Blocos),
    hora_refeicao_SM3(Blocos, M, IR, FR, 0).

select_workblocks_HC(WBs, M, WB):-
    select_workblocks(WBs, 1, M, WB, Blocos),
    validarHorasConcecutivas(Blocos).

select_workblocks_MHD(WBs, M, WB):-
    select_workblocks(WBs, 1, M, WB, Blocos),
    validarMaximoHorasDiarias(Blocos).

select_workblocks_RH(WBs, M, WB):-
    select_workblocks(WBs, 1, M, WB, Blocos),
    validarRestricoes(Blocos).

select_workblocks(WBs, N, M, WBs1, Blocos):-
    get_left(WBs, N, WBs1),
    driverduty(M, WBs2),
    remove_list(WBs2, WBs1, WBsN),
    blocos([(M, WBsN)], Blocos).

select_workblocks(WBs, N, M, WBs1, Blocos):-
    get_rigth(WBs, N, WBs1),
    driverduty(M, WBs2),
    remove_list(WBs2, WBs1, WBsN),
    blocos([(M, WBsN)], Blocos).

select_workblocks(WBs, N, M, WB, Blocos):-
    N1 is N + 1, 
    length(WBs, S),
    N =< S,
    select_workblocks(WBs,N1, M, WB, Blocos).



find_substitute_IV([], _, []):-!.
find_substitute_IV([WB | RestoWB], M, [(NM, WB) | RestoM]):-
    find_substitute(WB, M, NM), !,
    find_substitute_IV(RestoWB, M, RestoM).
find_substitute_IV([_ | RestoWB], M, WBs):-
    find_substitute_IV(RestoWB, M, WBs).

find_substitute(WBs, M, NM):-
    motorista(NM),
    NM \= M,
    valido(NM, WBs).

find_substitute(_, M, NM):-
    motorista(NM),
    NM \= M,
    not(driverduty(M, _)).






substituir(M, NM, WB):-
    retract(driverduty(NM, WB_NM)),
    append(WB_NM, WB, WB_NM1),
    asserta(driverduty(NM, WB_NM1)),
    retract(driverduty(M, WB_M)),
    remove_list(WB_M, WB, WB_M1),
    asserta(driverduty(M, WB_M1)).
substituir(M, NM, WB):-
    asserta(driverduty(NM, WB)),
    retract(driverduty(M, WB_M)),
    remove_list(WB_M, WB, WB_M1),
    asserta(driverduty(M, WB_M1)).







valido(M, WBs):-
    %write('Motorista: '), writeln(M),
    driverduty(M, WBs1),
    append(WBs1, WBs, WBsN),
    blocos([(M, WBsN)], BlocosM),
    validarAlmoco(BlocosM, M),
    %writeln('      Almoco'),
    validarJantar(BlocosM, M),
    %writeln('      Jantar'),
    validarHorasConcecutivas(BlocosM),
    %writeln('      Horas Concecutivas'),
    validarMaximoHorasDiarias(BlocosM),
    %writeln('      Maximo horas diarias'),
    validarRestricoes(BlocosM),
    %writeln('      Restricoes').
    validarIntersecoes(BlocosM).

validarAlmoco(Blocos, M):-
    horario_almoco(IA, FA),
    hora_refeicao_SM3(Blocos, M, IA, FA, 0).

validarJantar(Blocos, M):-
    horario_jantar(IJ, FJ),
    hora_refeicao_SM3(Blocos, M, IJ, FJ, 0).

validarHorasConcecutivas(Blocos):-
    horas_consecutivas_SM1(Blocos, L),
    L = [].

validarMaximoHorasDiarias(Blocos):-
    maximo_horas_diarias_SM1(Blocos, L),
    L = [].

validarRestricoes(Blocos):-
    restricoes_horarios_SM1(Blocos, L),
    L = [].

validarIntersecoes(Blocos):-
    intersecao_vehicleduties1(Blocos, L),
    L = [].




get_left(_, 0, []):-!.
get_left([E | R], Int, [E | RR]):-
    I is Int - 1,
    get_left(R, I, RR).

get_rigth(L, I, R):-
    reverse(L, LL),
    get_left(LL, I, RR),
    reverse(RR, R).

remove_list(L, [], L):-!.
remove_list(L, [E | RE], R):-
    remove_element(L, E, L1),
    remove_list(L1, RE, R).

remove_element([E | RE], E, RE):-!.
remove_element([X|RE], E, [X | Resto]):-remove_element(RE, E, Resto).


erros([(N, Erros) | _], N, Erros):-!.
erros([_ | RestoE], N, Erros):-
    erros(RestoE, N, Erros).
