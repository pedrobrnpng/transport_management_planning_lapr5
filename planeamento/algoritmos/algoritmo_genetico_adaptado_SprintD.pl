%:-consult('../baseconhecimento/files/motoristas_workblock_teste').
:-consult('../baseconhecimento/files/vehicleduty_teste').
:-consult('../baseconhecimento/files/workblock_teste').
:-consult('../baseconhecimento/files/configuracoes').
:-consult('../baseconhecimento/files/preferencia_horarios_teste').
:-consult('../baseconhecimento/files/restricoes_horarios_teste').

:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic perc_passa/1.
:-dynamic tempo_absouluto/1.
:-dynamic tempo_inicial/1.
:-dynamic avaliacao_termino/1.
:-dynamic populacao_atual/1.
:-dynamic cond_paragem/1.
:-dynamic vehicleduty/1.
:-dynamic vehicleduty/2.
:-dynamic workblock/4.
:-dynamic lista_motoristas_nworkblocks/2.
:-dynamic n_max_horas_concecutivas/1.
:-dynamic horario_almoco/2.
:-dynamic horario_jantar/2.
:-dynamic tempo_refeicao/1.
:-dynamic n_max_horas_concecutivas/1.
:-dynamic intervalo_minimo/1.
:-dynamic n_max_horas_diarias/1.
:-dynamic preferencia_horario/3.
:-dynamic restricoes_horario/4.
:-dynamic estabelidade/1.
:-dynamic populacao_final/1.
:-dynamic lista_motoristas_nworkblocks/2.

% parameteriza��o
inicializa(NSV):-
	(retract(vehicleduty(_));true), asserta(vehicleduty(NSV)),	
	(retract(geracoes(_));true), asserta(geracoes(40)),		
	(retract(estabelidade(_));true), asserta(estabelidade(5)),
	(retract(populacao(_));true), asserta(populacao(20)),
	(retract(prob_cruzamento(_));true), asserta(prob_cruzamento(0.7)),
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(0.05)),
	(retract(perc_passa(_));true), asserta(perc_passa(0.7)),
	(retract(tempo_absouluto(_));true), asserta(tempo_absouluto(1)),
	(retract(avaliacao_termino(_));true), asserta(avaliacao_termino(10000)),
	(retractall(cond_paragem(_));true), asserta(cond_paragem(0)),!.

gera:-
	%read(_),
	get_time(Ti),
	(retract(tempo_inicial(_));true), asserta(tempo_inicial(Ti)),
	gera_populacao(Pop),
	%write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	%write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	(retract(populacao_atual(_));true), asserta(populacao_atual(PopOrd)),
	%write('PopOrd='),write(PopOrd),nl,!,
	geracoes(NG),
	gera_geracao(0,0,0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	vehicleduty(VD),
	lista_motoristas_nworkblocks(VD,Lista),
	motoristas(Lista, ListaMotoristas),
	motoristas2(Lista,ListaMotoristas2),
	workblocks(NumWB),
	gera_populacao(TamPop,ListaMotoristas,ListaMotoristas2,NumWB,Pop).

gera_populacao(0,_,_,_,[]):-!.

%gera_populacao(2,_,ListaMotoristas2,_,[Ind, Ind2]):-!,
%	vehicleduty(VD),vehicleduty(VD,ListaBlocos),
%	selecionarMenor(ListaMotoristas2,_,N,_),
%	gera_individuo2(ListaMotoristas2,N,0,Ind2,ListaBlocos,0),
%	gera_individuo3(ListaMotoristas2,N,Ind,ListaBlocos,0).

gera_populacao(TamPop,ListaMotoristas,ListaMotoristas2,NumWB,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaMotoristas,ListaMotoristas2,NumWB,Resto),
	gera_individuo(ListaMotoristas,NumWB,Ind).
	%not(member(Ind,Resto)).

%o porque desta regra
gera_populacao(TamPop,ListaMotoristas,ListaMotoristas2,NumWB,L):-
	gera_populacao(TamPop,ListaMotoristas,ListaMotoristas2,NumWB,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaMotoristas,NumWB,[G|Resto]):-
	NumWBTemp is NumWB + 1, % To use with random
	random(1,NumWBTemp,N),
	retira(N,ListaMotoristas,G,NovaLista),
	NumWB1 is NumWB-1,
	gera_individuo(NovaLista,NumWB1,Resto).

gera_individuo2(_,_,_,[],[],_):-!.

gera_individuo2(ListaMotoristas,NumWB,Calc,[G|Resto],[H|L],Cont):-
	workblock(H,_,ST,ET),vehicleduty(VD),lista_motoristas_nworkblocks(VD,MWB),limite_motorista(MWB,NumWB,Limite),
	Calc1 is Calc + (ET-ST),
	(
		(Calc1 < 14401, Cont <Limite,!,N is NumWB,Calc2 is Calc1, ListaMotoristas = NovaLista , Cont1 is Cont +1 )
		;
		(ListaMotoristas= [_|NovaLista],selecionarMenor(NovaLista,_,N,NumWB),Calc2 is (ET-ST),Cont1 is 1) 
	),
	G is N,
	gera_individuo2(NovaLista,N,Calc2,Resto,L,Cont1).

gera_individuo3(_,_,[],[],_):-!.

gera_individuo3(ListaMotoristas,NumWB,[G|Resto],[_|L],Cont):-
	vehicleduty(VD),lista_motoristas_nworkblocks(VD,MWB),limite_motorista(MWB,NumWB,Limite),
	(
		(Cont <Limite,!,N is NumWB, ListaMotoristas = NovaLista , Cont1 is Cont +1 )
		;
		(ListaMotoristas= [_|NovaLista],selecionarMenor(NovaLista,_,N,NumWB),Cont1 is 1) 
	),
	G is N,
	gera_individuo3(NovaLista,N,Resto,L,Cont1).

selecionarMenor([],_,N,N):-!.

selecionarMenor([G],Menor,G,_):-!,
	preferencia_horario(G,_,Menor).

selecionarMenor([G|ListaMotoristas],Menor,MotoristaMenor,_):-	
	selecionarMenor(ListaMotoristas,Menor2,MotoristaMenor1,_),
	preferencia_horario(G,_,M),
	(
		(Menor2 < M,!,Menor is Menor2,MotoristaMenor is MotoristaMenor1)
		;
		(Menor is M,MotoristaMenor is G)
	).

limite_motorista([(Motorista,Limite)|_],Motorista,Limite):-!.
limite_motorista([_|Resto],Motorista,Limite):-limite_motorista(Resto,Motorista,Limite).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	transformar(Seq, NovaSeq),
	condensar(NovaSeq, SeqCondensada),
	sort(SeqCondensada, SeqOrdenada),
	avalia1(SeqOrdenada,V).

avalia1([],0).
avalia1(Seq,V):-
	hard_constraints(Seq, VH),
	soft_constraints(Seq, VS),
	V is VH + VS.

hard_constraints(Seq, V):-
	hora_almoco(Seq, VHA),
	hora_jantar(Seq, VHJ),
	horas_consecutivas(Seq, VHC),
	maximo_horas_diarias(Seq, VMHD),
	restricoes_horarios(Seq, VRH),
	V is VHA*8 + VHJ*8 + VHC*10 + VMHD*10 + VRH*10.

soft_constraints(Seq, V):-
	preferencia_horarios(Seq, VP),
	V is VP.

restricoes_horarios([], 0):-!.
restricoes_horarios([(Motorista,TempoInicial,TempoFinal) | Resto], VP):-
	restricoes_horarios(Resto, VP1),
	vehicleduty(VD),
	((restricoes_horario(Motorista, VD, RestricaoInicial, RestricaoFinal),!,
	intersecao_horarios_avaliar((Motorista,TempoInicial,TempoFinal), RestricaoInicial, RestricaoFinal, VP2));
	VP2 is 0),
	VP is VP1 + VP2.

preferencia_horarios([], 0):-!.
preferencia_horarios([(Motorista,TempoInicial,TempoFinal) | Resto], VP):-
	preferencia_horarios(Resto, VP1),
	((preferencia_horario(Motorista, PreferenciaInicial, PreferenciaFinal),!,
	intersecao_horarios_avaliar((Motorista,TempoInicial,TempoFinal), PreferenciaInicial, PreferenciaFinal, VP2));
	VP2 is 0),
	VP is VP1 + VP2.

intersecao_horarios_avaliar((_, TempoInicial, TempoFinal), PreferenciaInicial, PreferenciaFinal, VP2):-
	((TempoInicial >= PreferenciaInicial, TempoFinal =< PreferenciaFinal, !, VP2 is 0);
	(TempoInicial < PreferenciaInicial, TempoFinal > PreferenciaFinal, !, VP2 is PreferenciaInicial - TempoInicial + TempoFinal - PreferenciaFinal);
	(((TempoInicial < PreferenciaInicial, TempoFinal =< PreferenciaInicial);(TempoInicial >= PreferenciaFinal, TempoFinal > PreferenciaFinal)),!, VP2 is TempoFinal - TempoInicial);
	(TempoInicial < PreferenciaInicial, TempoFinal > PreferenciaInicial, TempoFinal =< PreferenciaFinal, !, VP2 is PreferenciaInicial - TempoInicial);
	(TempoInicial >= PreferenciaInicial, TempoInicial < PreferenciaFinal, TempoFinal > PreferenciaFinal, !, VP2 is TempoFinal - PreferenciaFinal)).


hora_almoco(Motoristas, VHA):-
	motoristas(LM),
	horario_almoco(InicioAlmoco, FimAlmoco),
	tempo_refeicao(TempoAlmoco),
	hora_refeicao(Motoristas, LM, InicioAlmoco, FimAlmoco, TempoAlmoco, VHA).

hora_jantar(Motoristas, VHJ):-
	motoristas(LM),
	horario_jantar(InicioJantar, FimJantar),
	tempo_refeicao(TempoJantar),
	hora_refeicao(Motoristas, LM, InicioJantar, FimJantar, TempoJantar, VHJ).

hora_refeicao(_, [],_, _, _, 0):-!.
hora_refeicao(Motoristas, [M|Resto],InicioRefeicao, FimRefeicao, TempoRefeicao , VHA):-
	hora_refeicao(Motoristas, Resto,InicioRefeicao, FimRefeicao, TempoRefeicao , VHA1),
	motoristas(Motoristas, M, MotoristasM),
	horarios_inseridos_na_refeicao(MotoristasM, InicioRefeicao, FimRefeicao, Horarios),
	hora_refeicao_avaliar(Horarios, InicioRefeicao, FimRefeicao, TempoRefeicao, VHA2),
	%write(M), write(" --> "), writeln(VHA2),
	VHA is VHA1 + VHA2.

horarios_inseridos_na_refeicao([], _, _, []):-!.

horarios_inseridos_na_refeicao([(M, TempoInicio, TempoFinal)|Resto], InicioRefeicao, FimRefeicao, [(M, TempoInicio, TempoFinal)|Horarios]):-
	((TempoInicio =< InicioRefeicao, TempoFinal >= FimRefeicao);
	(TempoInicio >= InicioRefeicao, TempoInicio < FimRefeicao);
	(TempoFinal =< FimRefeicao, TempoFinal > InicioRefeicao)), !,
	horarios_inseridos_na_refeicao(Resto, InicioRefeicao, FimRefeicao, Horarios).

horarios_inseridos_na_refeicao([_|Resto], InicioRefeicao, FimRefeicao, Horarios):-
	horarios_inseridos_na_refeicao(Resto, InicioRefeicao, FimRefeicao, Horarios).

hora_refeicao_avaliar([], InicioRefeicao, FimRefeicao, TempoRefeicao, VHA):-
	Refeicao is FimRefeicao - InicioRefeicao,
	((TempoRefeicao > Refeicao, !, VHA is TempoRefeicao - Refeicao); VHA is 0).

hora_refeicao_avaliar([(_, TempoInicial, TempoFinal)|Resto], InicioRefeicao, FimRefeicao, TempoRefeicao, VHA):-
	((TempoInicial =< InicioRefeicao, TempoFinal >= FimRefeicao, !, VHA is FimRefeicao - InicioRefeicao);
	(TempoInicial =< InicioRefeicao, TempoFinal =< FimRefeicao, TempoFinal > InicioRefeicao, !,  hora_refeicao_avaliar(Resto, TempoFinal, FimRefeicao, TempoRefeicao, VHA));
	(TempoInicial < FimRefeicao, TempoInicial > InicioRefeicao, TempoFinal >= FimRefeicao, !, NovoFimRefeicao is TempoInicial, hora_refeicao_avaliar(Resto, InicioRefeicao, NovoFimRefeicao, TempoRefeicao, VHA));
	(TempoInicial > InicioRefeicao, TempoFinal < FimRefeicao, !,hora_refeicao_avaliar([], InicioRefeicao, TempoInicial, TempoRefeicao, VHA1), hora_refeicao_avaliar(Resto, TempoFinal, FimRefeicao, TempoRefeicao, VHA2), comparar_avaliacoes(VHA1, VHA2, VHA))).


horas_consecutivas([], 0):-!.
horas_consecutivas([(_, TempoInicial, TempoFinal)|Resto], VHC):-
	horas_consecutivas(Resto, VHC1),
	n_max_horas_concecutivas(Max),
	Tempo is TempoFinal - TempoInicial,
	((Tempo > Max, !, VHC is VHC1 + Tempo - Max); VHC is VHC1).

maximo_horas_diarias(Motoristas, VMHD):-
	motoristas(LM),
	maximo_horas_diarias(Motoristas, LM, VMHD).

maximo_horas_diarias(_,[],0):-!.
maximo_horas_diarias(Motoristas, [M|Resto], VMHD):-
	maximo_horas_diarias(Motoristas, Resto, VMHD1),
	motoristas(Motoristas, M, MotoristasM),
	maximo_horas_diarias_avaliar(MotoristasM, 0, VMHD2),
	VMHD is VMHD1 + VMHD2.

maximo_horas_diarias_avaliar([], Somatorio, VHA):-
	n_max_horas_diarias(Max),
	Somatorio > Max, !, VHA is Somatorio - Max.
maximo_horas_diarias_avaliar([], _, 0).
maximo_horas_diarias_avaliar([(_, TempoInicial, TempoFinal)| Motoristas], Somatorio, VHA2):-
	Tempo is TempoFinal - TempoInicial,
	SomatorioTemp is Somatorio + Tempo,
	maximo_horas_diarias_avaliar(Motoristas, SomatorioTemp, VHA2).

transformar(Motoristas, Tripletos):-
	vehicleduty(VD),
	vehicleduty(VD, WorkBlocks),
	transformar(Motoristas, WorkBlocks, Tripletos).

transformar([], [], []):-!.
transformar([Motorista | Motoristas], [WorkBlock | WorkBlocks], [(Motorista, TempInicial, TempFinal)|Tripletos]):-
	workblock(WorkBlock, _, TempInicial, TempFinal),
	transformar(Motoristas, WorkBlocks, Tripletos).

condensar([Elem|Tripletos], NovosTripletos):-
	condensar(Tripletos, Elem, NovosTripletos).

condensar([], E, [E]):-!.

condensar([(Motorista, TempInicial, TempFinal)|Tripletos], (MotoristaAnterior, TempInicialAnterior, TempFinalAnterior), NovosTripletos):-
	MotoristaAnterior = Motorista, TempFinalAnterior = TempInicial, !, condensar(Tripletos, (Motorista, TempInicialAnterior, TempFinal), NovosTripletos).

condensar([(Motorista, TempInicial, TempFinal)|Tripletos], Elem, [Elem | NovosTripletos]):-
	condensar(Tripletos, (Motorista, TempInicial, TempFinal), NovosTripletos).





ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(1,_,_,_,[Ind|_]):-!,
	%write('Geracao '), write(G), write(':'), nl, write(Ind), nl,
	(retract(populacao_final(_));true), asserta(populacao_final(Ind)).

gera_geracao(_,E,N,G,Pop):-
	%write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	%Permite que os cruzamentos não seja sempre entre o 1º e o 2º, 3º e 4º ...
	random_permutation(Pop,PopPermut),
	cruzamento(PopPermut,NPop1),
	mutacao(NPop1,NPop),
	%Seleciona o melhor da pulação atual, da população após o cruzamento e da população após a mutação e coloca numa lista
	elite3(Pop, NPop1, NPop, Elite),
	%Gera uma população T em que T contém a pulação atual, a população após o cruzamento e a população após a mutação sem repetições
	avalia_populacao(NPop1,NPop1Aval),
	avalia_populacao(NPop,NPopAval),
	append(Pop,NPop1Aval,APop1),append(APop1,NPopAval,APop2),
	removerIguais(APop2,APop),
	%Ordena a população T
	ordena_populacao(APop,APopOrd),
	populacao(TamPop),
	perc_passa(PercPassa),
	NPassa is round(PercPassa * (TamPop-3)),
	%Coloca na nova Geração a população de elite e a percentagem PercPass dos melhores da população T
	preencher(Elite, NPassa, APopOrd, NovaGeracao1,Rest),
	%Atribui avaliações aleatorios com base na formula V*Random,0.0<Random<1.0 à restante população que não foi selecioando
	random_avalia_populacao(Rest,RestAval),
	ordena_populacao(RestAval,RestAvalOrd),
	%Depois da ordenação pelas avaliações random as avaliações antigas são repostas
	restora_avaliacoes(Rest,RestAvalOrd,RestAvalOrig),
	length(NovaGeracao1, Size),
	NPassa2 is TamPop - Size,
	%Acaba de preencher a nova geração com a parte da população que foi selecionada depois de atribuidos as avaliações aleatorias
	preencher(NovaGeracao1,NPassa2,RestAvalOrig,NovaGeracao,_),
	ordena_populacao(NovaGeracao,NPopOrd),
	N1 is N+1,
	E1 is E+1,
	NPopOrd=[_*V|_],
	(testa_condicao_estabilidade(E1,NPopOrd,E2);true),
	(testa_condicao_geracao(N1,G);true),
	(testa_condicao_tempo;true),
	(teste_condicao_avaliacao(V);true),
	cond_paragem(C),
	gera_geracao(C,E2,N1,G,NPopOrd).

testa_condicao_estabilidade(E,NovaPop,E2):-% Testa a estabelização de gerações
	populacao_atual(Pop),estabelidade(G),
	(
		(same(NovaPop,Pop),!,(
							(E>=G,E2 is 0, (retractall(cond_paragem(_));true),asserta(cond_paragem(1)),fail)
							;
							(E2 is E +1)
						))
		;
		(E2 is 0,(retract(populacao_atual(_));true), asserta(populacao_atual(NovaPop)))
	).

testa_condicao_geracao(N,G):-
		% Testa o número de gerações
		(N >= G,!,(retractall(cond_paragem(_));true),asserta(cond_paragem(1)),fail).
		
		
testa_condicao_tempo:-
		% Testa o tempo
		(tempo_inicial(Ti),
		get_time(Tf),
		TT is Tf - Ti, 
		tempo_absouluto(TA),
		TT>TA,!,(retractall(cond_paragem(_));true),asserta(cond_paragem(1)),fail).
		
teste_condicao_avaliacao(V):-		
		% Testa a avaliação
		(avaliacao_termino(VT),
		V=<VT,!,(retractall(cond_paragem(_));true),asserta(cond_paragem(1)),fail).

same([], []).

same([H1|R1], [H2|R2]):-
    H1 == H2,
    same(R1, R2).
	


gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	workblocks(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	workblocks(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere(Ind1, Ind2, P, NInd):- 
	vehicleduty(VD),
	lista_motoristas_nworkblocks(VD, L_M_WB),
	insere1(Ind1, Ind2, P, L_M_WB, NInd).

insere1([M|Resto], Ind2, N, L_M_WB, [M|NInd]):- 
	N > 0, !, N1 is N - 1, decrementar(L_M_WB,M, NL), insere1(Resto, Ind2, N1, NL, NInd).
insere1(Ind1, Ind2, 0, L_M_WB, NInd):-
	insere2(Ind1, Ind2, L_M_WB, NInd).

insere2([], _, _, []):-!.
insere2([_|Resto], [M|Resto1], L_M_WB, [M|NInd]):-
	decrementar(L_M_WB, M, NL_M_WB), !, insere2(Resto,Resto1, NL_M_WB, NInd).
insere2(Ind1, [_|Resto1], L_M_WB, NInd):-
	insere2(Ind1,Resto1, L_M_WB, NInd).

decrementar([(M, N)|Resto], M, [(M, N1)|Resto]):-N > 0,!,N1 is N - 1.
decrementar([E | Resto], M, [E | Resto1]):-decrementar(Resto, M, Resto1). 


cruzar(Ind1,Ind2,P1,P2,NInd):-
	sublista(Ind1,P1,P2,Sub1),
	workblocks(NumWB),
	R is NumWB-P1+1,
	rotate_right(Sub1,R,Sub2),
	P3 is P2 - P1 + 1,
	insere(Sub2,Ind2,P3,NInd1),
	P11 is P1 - 1,
	rotate_right(NInd1,P11,NInd).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).


elite3(Pop, Cruzados, Mutantes, L):-
	avalia_populacao(Cruzados, CruzAv),
	avalia_populacao(Mutantes, MutAv),
	melhor(Pop, E1),
	melhor(CruzAv, E2),
	melhor(MutAv, E3),
	removerIguais([E1,E2,E3], L).

removerIguais([], []):-!.
%removerIguais([E|L], R):- member(E, L), !, removerIguais(L, R).
removerIguais([E|L], [E|R]):- removerIguais(L, R).

melhor([Ind*Av|Resto], Melhor):-
	melhor1(Resto, Ind*Av, Melhor).

melhor1([], M, M):-!.
melhor1([Ind*Av|Resto], MelhorAtual*MelhorAvaliacaoAtual, Melhor):-
	((Av < MelhorAvaliacaoAtual, !, M = Ind, A is Av); 
	(M = MelhorAtual, A is MelhorAvaliacaoAtual)),
	melhor1(Resto, M*A, Melhor).

preencher(Elite,NPassa,Pop,NovaGeracao1,Rest):-preencher1(NPassa,Pop,NovaGeracao2,Rest), append(Elite,NovaGeracao2,NovaGeracao1).

preencher1(0,Rest,[],Rest):-!.
preencher1(NPassa, [Ind|RestPop], [Ind|NovaGeracao1],Rest):-
	NPassa1 is NPassa - 1,preencher1(NPassa1,RestPop,NovaGeracao1,Rest).

random_avalia_populacao([],[]):-!.
random_avalia_populacao([Ind*V|Rest],[Ind*NV|RestAval]):-
	random(0.0,1.0,Var),
	NV is round(V*Var),
	random_avalia_populacao(Rest,RestAval).

restora_avaliacoes(_,[],[]):-!.
restora_avaliacoes(Rest,[Ind*VF|RestAvalOrd],[Ind*V|RestAvalOrig]):-
	restora_avaliacoes1(Rest,Ind*VF,V),restora_avaliacoes(Rest,RestAvalOrd,RestAvalOrig).

restora_avaliacoes1([Ind*V|_],Ind*_,V):-!.
restora_avaliacoes1([_|Rest],Ind,V):-restora_avaliacoes1(Rest,Ind,V).

workblocks(WB):- vehicleduty(N), lista_motoristas_nworkblocks(N, L), workblocks1(L, WB).
workblocks1([(_,N)], N):-!.
workblocks1([(_, N) | Resto], WB):- workblocks1(Resto, WB1), WB is N + WB1.

motoristas([], []):-!.
motoristas([(Motorista, N)|Resto], L):-
	motoristas(Resto, L1),
	preencher2(Motorista, N, L2),
	append(L2,L1,L).

motoristas2([], []):-!.
motoristas2([(Motorista, _)|Resto], [Motorista|Resto2]):- motoristas2(Resto,Resto2).
	

preencher2(E,1,[E]):-!.
preencher2(E, N, [E|L]):-
	N1 is N - 1,preencher2(E,N1,L).

motoristas(L):-
	vehicleduty(VD),
	lista_motoristas_nworkblocks(VD,Lista),
	motoristas(Lista, ListaMotoristas),
	sort(ListaMotoristas, L).

motoristas([], _, []).
motoristas([(Motorista, X,Y)|Resto], Motorista, [(Motorista, X,Y)|Resto1]):-!,
	motoristas(Resto, Motorista, Resto1).
motoristas([_|Resto], Motorista, NovoMotoristas):-
	motoristas(Resto, Motorista, NovoMotoristas).

comparar_avaliacoes(0, _ , 0):-!.
comparar_avaliacoes(_, 0, 0):-!.

comparar_avaliacoes(A, B, A):-
	A > B, !. 

comparar_avaliacoes(_, B, B).