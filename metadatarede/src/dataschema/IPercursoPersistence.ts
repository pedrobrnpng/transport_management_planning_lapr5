import { SegmentoRede } from "../domain/segmentoRede";

export interface IPercursoPersistence {
    domainId: string;
    segmentosRede: SegmentoRede[];
    idLinha: string;
    direcao: string;
  }