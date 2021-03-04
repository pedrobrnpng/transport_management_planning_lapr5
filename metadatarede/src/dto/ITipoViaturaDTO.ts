import { CustoKM } from "../domain/custokm";

export default interface ITipoViaturaDTO {
    id: string;
    descricao: string;
    combustivel: number;
    autonomia: number;
    velocidadeMedia: number;
    custoKM: CustoKM;
    consumoMedio: number;
}