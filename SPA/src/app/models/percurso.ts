import segmentoRede from "./segmentoRede";

export default interface Percurso {
    id?: string;
    segmentosRede?: Array<segmentoRede>;
    idLinha?: string;
    direcao?: string;
}
