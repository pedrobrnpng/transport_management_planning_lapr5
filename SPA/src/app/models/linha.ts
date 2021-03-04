export default interface Linha {
    id?: string;
    noInicial?: string;
    noFinal?: string;
    nome?: string;
    idTiposTripulante?: Array<String>;
    idTiposViatura?: Array<String>;
    cor?: string;
}