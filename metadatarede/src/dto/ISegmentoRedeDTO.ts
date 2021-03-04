import IDistanciaDTO from "./IDistanciaDTO";
import ITempoViagemDTO from "./ITempoViagemDTO";

export default interface ISegmentoRedeDTO {
    id:string;
    idNoInicio: string;
    idNoFim: string;
    distancia: IDistanciaDTO;
    tempoViagem: ITempoViagemDTO;
    sequencia: number;
  }
  