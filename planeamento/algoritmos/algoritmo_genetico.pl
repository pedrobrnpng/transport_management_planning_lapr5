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

% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).
tarefa(t1,2,5,1).
tarefa(t2,4,7,6).
tarefa(t3,1,11,2).
tarefa(t4,3,9,3).
tarefa(t5,3,8,2).

% tarefas(NTarefas).
tarefas(5).

% parameteriza��o
inicializa:-write('Numero de novas Geracoes: '),read(NG), 			
    (retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Percentagem de individuos melhores que passa (%):'), read(P3),
	PP is P3/100,
	(retract(perc_passa(_));true), asserta(perc_passa(PP)),
	write('Tempo absoluto para condição de paragem (s):'), read(P4),
	(retract(tempo_absouluto(_));true), asserta(tempo_absouluto(P4)),
	write('Avaliação para término :'), read(P5),
	(retract(avaliacao_termino(_));true), asserta(avaliacao_termino(P5)),
	(retract(cond_paragem(_));true), asserta(cond_paragem(0)).


gera:-
	inicializa,
	get_time(Ti),
	(retract(tempo_inicial(_));true), asserta(tempo_inicial(Ti)),
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	(retract(populacao_atual(_));true), asserta(populacao_atual(PopOrd)),
	write('PopOrd='),write(PopOrd),nl,
	geracoes(NG),
	gera_geracao(0,0,0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
%o porque desta regra
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,Dur,Prazo,Pen),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	(
		(InstFim =< Prazo,!, VT is 0)
  ;
		(VT is (InstFim-Prazo)*Pen)
	),
	V is VT+VResto.

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


gera_geracao(1,_,G,_,Pop):-!,
	write('Geracao '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(_,E,N,G,Pop):-
	write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
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
	(testa_condicao_estabilidade(G,E1,NPopOrd,E2);true),
	(testa_condicao_geracao(N1,G);true),
	(testa_condicao_tempo;true),
	(teste_condicao_avaliacao(V);true),
	cond_paragem(C),
	gera_geracao(C,E2,N1,G,NPopOrd).

testa_condicao_estabilidade(G,E,NovaPop,E2):-% Testa a estabelização de gerações
	populacao_atual(Pop),
	(
		(same(NovaPop,Pop),!,(
							(E>=G,E2 is 0, (retract(cond_paragem(_));true),asserta(cond_paragem(1)),fail)
							;
							(E2 is E +1)
						))
		;
		(E2 is 0,(retract(populacao_atual(_));true), asserta(populacao_atual(NovaPop)))
	).

testa_condicao_geracao(N,G):-
		% Testa o número de gerações
		(N >= G,!,(retract(cond_paragem(_));true),asserta(cond_paragem(1)),fail).
		
		
testa_condicao_tempo:-
		% Testa o tempo
		(tempo_inicial(Ti),
		get_time(Tf),
		TT is Tf - Ti, 
		tempo_absouluto(TA),
		TT>TA,!,(retract(cond_paragem(_));true),asserta(cond_paragem(1)),fail).
		
teste_condicao_avaliacao(V):-		
		% Testa a avaliação
		(avaliacao_termino(VT),
		V=<VT,!,(retract(cond_paragem(_));true),asserta(cond_paragem(1)),fail).

same([], []).

same([H1|R1], [H2|R2]):-
    H1 == H2,
    same(R1, R2).
	


gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
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
	tarefas(N),
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

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


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
removerIguais([E|L], R):- member(E, L), !, removerIguais(L, R).
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



