import IDistanciaDTO from "./distancia";
import ITempoViagemDTO from "./tempoViagem";

export default interface SegmentoRede {
    id:string;
    idNoInicio: string;
    idNoFim: string;
    distancia: IDistanciaDTO;
    tempoViagem: ITempoViagemDTO;
    sequencia: number;
  }
  