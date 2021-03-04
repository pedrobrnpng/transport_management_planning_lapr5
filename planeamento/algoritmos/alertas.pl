:-consult('algoritmo_correcao').
:-consult('../baseconhecimento/files/erros_teste').

:-dynamic erros/3.

alertas(Falhas, Alertas1):-
    alerta_almoco(Falhas, A),
    alerta_jantar(Falhas, B),
    alerta_horas_concecutivas(Falhas, C),
    alerta_maximo_horas_diarias(Falhas, D),
    alerta_restricoes_horario(Falhas, E),
    alerta_intersecoes(Falhas, F),
    Alertas = [A, B, C, D, E, F],
    flatten(Alertas, Alertas1).

alerta_almoco(Falhas, A):-
    erros(Falhas, 1, FA),
    alerta_almoco1(FA, A).

alerta_jantar(Falhas, A):-
    erros(Falhas, 2, FA),
    alerta_jantar1(FA, A).

alerta_horas_concecutivas(Falhas, A):-
    erros(Falhas, 3, FA),
    alerta_horas_concecutivas1(FA, A).

alerta_maximo_horas_diarias(Falhas, A):-
    erros(Falhas, 4, FA),
    alerta_maximo_horas_diarias1(FA, A).

alerta_restricoes_horario(Falhas, A):-
    erros(Falhas, 5, FA),
    alerta_restricoes_horario1(FA, A).

alerta_intersecoes(Falhas, A):-
    erros(Falhas, 6, FA),
    alerta_intersecoes1(FA, A).

alerta_almoco1([],[]):-!.
alerta_almoco1([M | RestoM], [A | RestoA]):-
    to_string(['O motorista ', M, ' nao tem tempo para almoçar'], A),
    alerta_almoco1(RestoM, RestoA).

alerta_jantar1([],[]):-!.
alerta_jantar1([M | RestoM], [A | RestoA]):-
    to_string(['O motorista ', M, ' nao tem tempo para jantar'], A),
    alerta_jantar1(RestoM, RestoA).

alerta_horas_concecutivas1([],[]):-!.
alerta_horas_concecutivas1([(M,TI, TF) | RestoM], [A | RestoA]):-
    to_string(['O motorista ', M, ' ultrapassou o numero de horas concecutivas no intervalo [', TI, ', ', TF, ']'], A),
    alerta_horas_concecutivas1(RestoM, RestoA).

alerta_maximo_horas_diarias1([],[]):-!.
alerta_maximo_horas_diarias1([M | RestoM], [A | RestoA]):-
    to_string(['O motorista ', M, ' ultrapassou o numero de horas maximas diarias'], A),
    alerta_maximo_horas_diarias1(RestoM, RestoA).

alerta_restricoes_horario1([],[]):-!.
alerta_restricoes_horario1([(M, VD, F) | RestoM], [A | RestoA]):-
    to_string(['O motorista ', M, ' ultrapassou os limites de restricao de horario no servico de viatura ', VD, ' no/s intervalo/s '], A1),
    alerta_restricoes_horario2(A1, F, A),
    alerta_restricoes_horario1(RestoM, RestoA).

alerta_intersecoes1([], []):-!.
alerta_intersecoes1([(_, []) | Resto], A):-!,
    alerta_intersecoes1(Resto, A).
alerta_intersecoes1([(M, [(Ti, Tf) | RestoT]) | Resto], [A | RestoA]):-
    to_string(['O motorista ', M, ' tem serviços a ocorrer ao mesmo tempo no intervalo de [', Ti, ', ', Tf, ']'], A),
    alerta_intersecoes1([(M, RestoT) | Resto], RestoA).

%alerta_restricoes_horario2(_, [], []):-!.
alerta_restricoes_horario2(A1, [(TI, TF) , (TI1, TF1)], A):-
    to_string([A1, '[', TI, ', ', TF, '] e ','[', TI1, ', ', TF1, ']'], A).
alerta_restricoes_horario2(A1, [(TI, TF)], A):-
    to_string([A1, '[', TI, ', ', TF, ']'], A).




to_string([], _):-!.
to_string([E | L], R):-
    atom_string(E, Es),
    to_string1(L, Es, R).

to_string1([], R, R):-!.
to_string1([E | RestoE], Ea, R):-
    atom_string(E, Es),
    string_concat(Ea, Es, En),
    to_string1(RestoE, En, R).


segundo_hora(S, H, M):-
    H is S // 3600,
    M is (S / 3600 - H) * 60.


