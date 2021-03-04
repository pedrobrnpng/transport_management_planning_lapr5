%:-consult('../baseconhecimento/files/driverduty_teste').
:-consult('../baseconhecimento/files/vehicleduty_teste').
:-consult('../baseconhecimento/files/workblock_teste').
:-consult('../baseconhecimento/files/restricoes_horarios_teste').
:-consult('../baseconhecimento/files/configuracoes').
:-consult('../baseconhecimento/files/percursos_teste').
:-consult('../baseconhecimento/files/erros_teste').
:-consult('../baseconhecimento/files/motoristas_teste').
:-consult('a_star_SprintD').
:-consult('algoritmo_detecao').
:-consult('algoritmo_correcao').
:-consult('alertas').


:-dynamic driverduty/2.
:-dynamic detetar_erros/2.
:-dynamic corrigir_erros/2.
:-dynamic alertas/2.

processar_driverduties(Alertas):-
    driverduties(ServicosMotorista),
    detetar_erros(ServicosMotorista, Erros),
    corrigir_erros(Erros, Falhas),
    alertas(Falhas, Alertas).

driverduties(ServicosMotorista):-
    findall((M, WB), driverduty(M, WB), ServicosMotorista).


