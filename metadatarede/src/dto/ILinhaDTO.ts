export default interface ILinhaDTO {
    id: string;
    noInicial: string;
    noFinal: string;
    codigo: string;
    nome: string;
    idTiposTripulante: Array<string>;
    idTiposViatura: Array<string>;
    cor: string;
}