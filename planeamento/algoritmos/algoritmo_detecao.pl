:-dynamic driverduty/2.
:-dynamic workblock/4.
:-dynamic n_max_horas_concecutivas/1.
:-dynamic n_max_horas_diarias/1.
:-dynamic horario_almoco/2.
:-dynamic horario_jantar/2.
:-dynamic tempo_refeicao/1.
:-dynamic restricoes_horario/4.
:-dynamic vehicleduty/2.
:-dynamic astar/4.
:-dynamic horario/3.
:-dynamic no_percurso/5.
:-dynamic remove_element/3.

detetar_erros(ServicosMotorista, Erros):-
    blocos(ServicosMotorista, Blocos),
    hard_constraints_SM(Blocos, Erros).

blocos(ServicosMotorista, Blocos):-
	transformar_SM(ServicosMotorista, Lista_Transformada),
	sort(Lista_Transformada, Lista_Ordenada),
	condensar_SM(Lista_Ordenada, Blocos).
    
transformar_SM([], []):-!.
transformar_SM([(_, [])| Resto], Resto2):-!,
    transformar_SM(Resto, Resto2).
transformar_SM([(M, [WB | Resto1])| Resto], [(M, TempoInicial, TempoFinal) | Resto2]):-
    workblock(WB, _, TempoInicial, TempoFinal),
    transformar_SM([(M, Resto1)| Resto], Resto2).

condensar_SM([], []):-!.
condensar_SM([(M, TI, TF) | Resto], LC):-
    condensar_SM(Resto, M, TI, TF, LC).

condensar_SM([], MA, TIA, TFA, [(MA, TIA, TFA)]):-!.
condensar_SM([(M, TFA, TF) | Resto], M, TIA, TFA, LC):-!,
    condensar_SM(Resto, M, TIA, TF, LC).
condensar_SM([(M, TI, TF) | Resto], M, TIA, TFA, [(M, TIA, TFA) | Resto2]):-!,
    condensar_SM(Resto, M, TI, TF, Resto2).
condensar_SM([(M, TI, TF) | Resto], MA, TIA, TFA, [(MA, TIA, TFA) | Resto2]):-
    condensar_SM(Resto, M, TI, TF, Resto2).

hard_constraints_SM(Blocos, [EA, EJ, EHC, EMHD, ERH, EIV]):-
	hora_almoco_SM(Blocos, EA),
	hora_jantar_SM(Blocos, EJ),
	horas_consecutivas_SM(Blocos, EHC),
	maximo_horas_diarias_SM(Blocos, EMHD),
	restricoes_horarios_SM(Blocos, ERH),
	intersecao_vehicleduties(Blocos, EIV).

hora_almoco_SM(Blocos, (1, Erros)):-
	horario_almoco(IA, FA),
	hora_refeicao_SM1(Blocos, IA, FA, Erros).

hora_jantar_SM(Blocos, (2, Erros)):-
	horario_jantar(IJ, FJ),
	hora_refeicao_SM1(Blocos, IJ, FJ, Erros).

horas_consecutivas_SM(Blocos, (3, Erros)):-
	horas_consecutivas_SM1(Blocos, Erros).

maximo_horas_diarias_SM(Blocos, (4, Erros)):-
	maximo_horas_diarias_SM1(Blocos, Erros).

restricoes_horarios_SM(Blocos, (5, Erros)):-
	restricoes_horarios_SM1(Blocos, Erros).

intersecao_vehicleduties(Blocos, (6, Erros)):-
	intersecao_vehicleduties1(Blocos, Erros).



horas_consecutivas_SM1([], []):-!.
horas_consecutivas_SM1([(M, TempoInicial, TempoFinal) | RestoM], [(M, TempoInicial, TempoFinal) | RestoE]):-
	Tempo is TempoFinal - TempoInicial,
	n_max_horas_concecutivas(Max),
	Tempo > Max, !, horas_consecutivas_SM1(RestoM, RestoE).

horas_consecutivas_SM1([_ | RestoM], Erros):-
	horas_consecutivas_SM1(RestoM, Erros).

maximo_horas_diarias_SM1([], []):-!.
maximo_horas_diarias_SM1([(M, Ti, Tf) | RestoB], Erros):-
	T is Tf - Ti,
	maximo_horas_diarias_SM2(RestoB, M, T, Erros).

maximo_horas_diarias_SM2([], M, T, [(M,T)]):- 
	n_max_horas_diarias(Max),
	T > Max, !.
maximo_horas_diarias_SM2([], _, _, []):-!.
maximo_horas_diarias_SM2([(M, Ti, Tf) | RestoB], M, T, Erros):-!,
	Temp is T + Tf - Ti,
	maximo_horas_diarias_SM2(RestoB, M, Temp, Erros).
maximo_horas_diarias_SM2([(M, Ti, Tf) | RestoB], Ma, T, [Ma | RestoE]):-
	n_max_horas_diarias(Max),
	T > Max, !,
	Temp is Tf - Ti,
	maximo_horas_diarias_SM2(RestoB, M, Temp, RestoE).
maximo_horas_diarias_SM2([(M, Ti, Tf) | RestoB], _, _, Erros):-
	Temp is Tf - Ti,
	maximo_horas_diarias_SM2(RestoB, M, Temp, Erros).

hora_refeicao_SM1([], _, _, []):-!.
hora_refeicao_SM1(Blocos, IR, FR, Erros):-
	motoristas_SM(Blocos, LM),
	hora_refeicao_SM2(Blocos, LM, IR, FR, Erros).

hora_refeicao_SM2(_, [], _, _, []):-!.
hora_refeicao_SM2(Blocos, [M | RestoM], IR, FR, [M | RestoE]):-
	blocos_do_motorista(Blocos, M, BlocosM),
	hora_refeicao_SM3(BlocosM, M, IR, FR, 1),!,
	hora_refeicao_SM2(Blocos, RestoM, IR, FR, RestoE).
hora_refeicao_SM2(Blocos, [_ | RestoM], IR, FR, Erros):-
	hora_refeicao_SM2(Blocos, RestoM, IR, FR, Erros).

hora_refeicao_SM3([], M, IR, FR, Erro):-!,
	hora_refeicao_avaliar_SM(M, IR, FR, Erro).
hora_refeicao_SM3([(_, TI, TF) | _], _, IR, FR, 1):-
	TI =< IR, FR =< TF, !.
hora_refeicao_SM3([(_, TI, TF) | RestoB], M, IR, FR, Erro):-
	TI =< IR, IR < TF, TF < FR, !, hora_refeicao_SM3(RestoB, M, TF, FR, Erro).
hora_refeicao_SM3([(_, TI, TF) | RestoB], M, IR, FR, Erro):-
	IR < TI, TF < FR, hora_refeicao_avaliar_SM(M, IR, TI, 1), !, hora_refeicao_SM3(RestoB, M, TF, FR, Erro).
hora_refeicao_SM3([(_, TI, TF) | _], _, IR, FR, 0):-
	IR < TI, TF < FR, !.
hora_refeicao_SM3([(_, TI, TF) | _], M, IR, FR, 1):-
	IR < TI, FR =< TF, hora_refeicao_avaliar_SM(M, IR, TI, 1), !.
hora_refeicao_SM3([(_, TI, TF) | _], _, IR, FR, 0):-
	IR < TI, FR =< TF, !.
hora_refeicao_SM3([_| RestoB], M, IR, FR, Erro):-
	hora_refeicao_SM3(RestoB, M, IR, FR, Erro).

hora_refeicao_avaliar_SM(M, IR, FR, E):-
	tempo_refeicao(TR),
	tempo_deslocacao(M, IR, FR, TD),
	R is FR - IR - TD,
	((R < TR, !, E is 1);E is 0).

tempo_deslocacao(M, TI, TF, TD):-
	driverduty(M, WBs),
	find_no_inicial(WBs, TI, NoI),
	find_no_final(WBs, TF, NoF),!,
	calcular_tempo_deslocacao(NoI, NoF, TI, TD).
tempo_deslocacao(_, _, _, 0).

find_no_inicial([WB | _], TI, NoI):-
	workblock(WB, LT, _, TI),
	last_list(LT, Trip),
	horario(Path, Trip, _),
	last_no_percurso(Path, NoI),!.
find_no_inicial([_ | RestoWB], TI, NoI):-
	find_no_inicial(RestoWB, TI, NoI).

last_no_percurso(Path, NoI):-
	no_percurso(Path, _, N2, _, _),!,
	last_no_percurso1(Path, N2, NoI).

last_no_percurso1(Path, N2, NoI):-
	no_percurso(Path, N2, N3, _, _), !,
	last_no_percurso1(Path, N3, NoI).
last_no_percurso1(_, NoI, NoI).

find_no_final(WBs, TF, NoF):-
	find_no_final1(WBs, TF, NoF),!.
find_no_final(WBs, TF, NoF):-
	find_no_final2(WBs, TF, NoF).


find_no_final1([WB | _], TF, NoF):-
	workblock(WB, [Trip | _], TF, _),
	horario(Path, Trip, _),
	no_percurso(Path, NoF, _, _, _),!.
find_no_final1([_ | RestoWB], TF, NoF):-
	find_no_final1(RestoWB, TF, NoF).

find_no_final2(WBs, TF, NoF):-
	findall((TempF, WB, Trip), (workblock(WB, [Trip | _], TempF, _), member(WB, WBs), TempF > TF), Resultado),
	sort(Resultado, [(_,_, T) | _]),
	horario(Path, T, _),
	no_percurso(Path, NoF, _, _, _).


last_list([], _):-fail.
last_list([H], H):-!.
last_list([_ | T], E):- last_list(T, E).

calcular_tempo_deslocacao(N, N, _, 0):-!.
calcular_tempo_deslocacao(NoI, NoF, TI, TD):-
	astar(NoI, NoF, TI, TD),!.
calcular_tempo_deslocacao(_, _, _, 99999).

blocos_do_motorista([], _, []):-!.
blocos_do_motorista([(M, X, Y)| RestoB], M, [(M, X, Y) | RestoBN]):-!,
	blocos_do_motorista(RestoB, M, RestoBN).
blocos_do_motorista([_| RestoB], M, Blocos):-
	blocos_do_motorista(RestoB, M, Blocos).

motoristas_SM([], []):-!.
motoristas_SM([(M, _, _) | RestoB], [M | L]):-
	motoristas_SM1(RestoB, M, L).

motoristas_SM1([], _, []):-!.
motoristas_SM1([(M, _, _)| RestoB], M, Lista):-!,
	motoristas_SM1(RestoB, M, Lista).
motoristas_SM1([(M, _, _)| RestoB], _, [M | RestoL]):-
	motoristas_SM1(RestoB, M, RestoL).

restricoes_horarios_SM1([], []):-!.
restricoes_horarios_SM1([(M, TI, TF) | RestoB], [(M, VD, Erros) | RestoE]):-
	driverduty(M, WBs),
	find_workblock(WBs, TI, TF, WB),
	find_vehicleduty(WB, VD),
	restricoes_horario(M, VD, RI, RF), 
	(TI < RI; RF < TF),!,
	calcular_intervalo(TI, TF, RI, RF, Erros),	
	restricoes_horarios_SM1(RestoB, RestoE).
restricoes_horarios_SM1([_ | RestoB], Erros):-
	restricoes_horarios_SM1(RestoB, Erros).

calcular_intervalo(TI, TF, RI, RF, [ (TI, RI) | Resto]):-
	TI < RI, !, 
	calcular_intervalo_F(TF, RF, Resto).
calcular_intervalo(_, TF, _, RF, EF):-
	calcular_intervalo_F(TF, RF, EF).


calcular_intervalo_F(TF, RF, [(RF, TF)]):-
	RF < TF, !.
calcular_intervalo_F(_, _, []).



find_workblock([WB|_], TI, TF, WB):-
	workblock(WB,_,I,F),
	TI =< I, F =< TF, !.
find_workblock([_ | RestoWB], TI, TF, WB):-
	find_workblock(RestoWB, TI, TF, WB).


find_vehicleduties([], []):-!.
find_vehicleduties([WB | RestoWB], [VD | RestoVD]):-
	find_vehicleduty(WB, VD),
	find_vehicleduties(RestoWB, RestoVD).

find_vehicleduty(WB, VD):-
	vehicleduty(VD, WBs),
	find_vehicleduty1(WB, WBs), !.

find_vehicleduty1(WB, [WB|_]):-!.
find_vehicleduty1(WB, [_|RestoWB]):- find_vehicleduty1(WB, RestoWB).

intersecao_vehicleduties1(Blocos, Erros):-
	motoristas_SM(Blocos, LM),
	intersecao_vehicleduties2(Blocos, LM, Erros).

intersecao_vehicleduties2(_, [], []):-!.
intersecao_vehicleduties2(Blocos, [M | RestoM], [(M, Erros2) | RestoE]):-
	blocos_do_motorista(Blocos, M, BlocosM),
	intersecao_vehicleduties3(BlocosM, Erros), not(Erros = []), !,
	flatten(Erros, Erros1), sort(Erros1, Erros2),
	intersecao_vehicleduties2(Blocos, RestoM, RestoE).
intersecao_vehicleduties2(Blocos, [_ | RestoM], Erros):-
	intersecao_vehicleduties2(Blocos, RestoM, Erros).

intersecao_vehicleduties3([], []):-!.
intersecao_vehicleduties3([E | RestoB], [Erro | RestoE]):-
	intersecao_vehicleduties4(E, RestoB, Erro), not(Erro = []), !,
	intersecao_vehicleduties3(RestoB, RestoE).
intersecao_vehicleduties3([_ | RestoB], Erros):-
	intersecao_vehicleduties3(RestoB, Erros).

intersecao_vehicleduties4(_, [], []):-!.
intersecao_vehicleduties4((_, TI, TF), [(_, TI1, TF1) | RestoB], [(Ti, Tf) | RestoE]):-
	calcular_intersecao(TI, TF, TI1, TF1, Ti, Tf), !, 
	intersecao_vehicleduties4((_, TI, TF), RestoB, RestoE).
intersecao_vehicleduties4(E, [_ | RestoB], Erros):-
	intersecao_vehicleduties4(E, RestoB, Erros).

calcular_intersecao(TI1, TF1, TI2, TF2, TI, TF):-
	(calcular_intersecao1(TI1, TF1, TI2, TF2, TI, TF),!);
	calcular_intersecao1(TI2, TF2, TI1, TF1, TI, TF).
calcular_intersecao1(TI1, TF1, TI2, TF2, TI2, TF2):-
	TI1 =< TI2, TF2 =< TF1, !.
calcular_intersecao1(TI1, TF1, TI2, _, TI2, TF1):-
	TI1 =< TI2, TI2 < TF1, !.
