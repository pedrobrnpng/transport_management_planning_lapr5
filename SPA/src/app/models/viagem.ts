export interface Viagem {
    codigo?: number;
    horaInicio: Date;
    linha: string;
    idPercurso: string;
}

export interface Viagens {
    horaInicio: Date;
    frequencia: number;
    nViagens: number;
    idPercursoIda: string;
    idPercursoVolta: string;
}
