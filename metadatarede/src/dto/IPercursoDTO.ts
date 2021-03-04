import ISegmentoRedeDTO from "./ISegmentoRedeDTO";

export default interface IPercursoDTO {
    id: string;
    segmentosRede: Array<ISegmentoRedeDTO>;
    idLinha: string;
    direcao: string;
}
  