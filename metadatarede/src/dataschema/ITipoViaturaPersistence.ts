import { CustoKM } from "../domain/custokm";

export interface ITipoViaturaPersistence {
    domainId: string;
    descricao: string;
    combustivel: number;
    autonomia: number;
    velocidadeMedia: number;
    custoKM: CustoKM;
    consumoMedio: number;
  }