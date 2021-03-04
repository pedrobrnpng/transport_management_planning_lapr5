import CustoKM from './custoKM';
export default interface TipoViatura {
    id: string;
    descricao: string;
    combustivel: number;
    autonomia: number;
    velocidadeMedia: number;
    custoKM: CustoKM;
    consumoMedio: number; 
}