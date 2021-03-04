import { IReadData } from "./IReadData/IReadData";
import IPercursoService from "../../IServices/IPercursoService"
import ISegmentoRedeDTO from "../../../dto/ISegmentoRedeDTO"
import IPercursoDTO from "../../../dto/IPercursoDTO"
import IDistanciaDTO from "../../../dto/IDistanciaDTO"
import ITempoViagemDTO from "../../../dto/ITempoViagemDTO"
import { Inject } from 'typedi';

import config from "../../../../config";

export class ReadPercursos implements IReadData {

    constructor(@Inject(config.services.percurso.name) private percursoServiceInstance : IPercursoService) {}

    async readData(lines: string[]) : Promise<number> {
        try {
            var key:string='';
            var id:string='';
            var idLine:string='';
            var dir:string='';
            var pathkey:string='';
            var idPath:string='';
            var idINode:string='';
            var idFNode:string='';
            var duration:string='';
            var distance:string='';
            var seq:number=0;

            var segmentos:ISegmentoRedeDTO[] = [];
            let tempoDTO:ITempoViagemDTO;
            let distanciaDTO:IDistanciaDTO;
            let sgDTO:ISegmentoRedeDTO;

            var c:number;
            for (c=0;c<lines.length;c++) {
                if (lines[c].startsWith("<Path ")) {
                    var linha=lines[c].split(" ");
                    key=linha[1].split('"')[1];
                    id=linha[2].split('"')[1];
                    idLine=linha[3].split('"')[1];
                    dir=linha[4].split('"')[1];
                }
                else if (lines[c].startsWith("<PathNode ")) {
                    seq++;
                    var linha=lines[c].split(" ");
                    pathkey=linha[1].split('"')[1];
                    idPath=linha[2].split('"')[1];
                    idINode=linha[3].split('"')[1];
                    idFNode=linha[4].split('"')[1];
                    duration=linha[5].split('"')[1];
                    distance=linha[6].split('"')[1];
                    distanciaDTO = {
                        value:+distance,
                        unidadeDistancia:"m"
                    } as IDistanciaDTO;
                    tempoDTO = {
                        value:+duration,
                        unidadeTempo:"s"
                    } as ITempoViagemDTO;
                    sgDTO = {
                        id:idPath,
                        idNoInicio: idINode,
                        idNoFim: idFNode,
                        distancia: distanciaDTO,
                        tempoViagem: tempoDTO,
                        sequencia:seq
                    } as ISegmentoRedeDTO;
                    segmentos.push(sgDTO);
                }
            }
            let percursoDTO = {
                id: id,
                segmentosRede: segmentos,
                idLinha: idLine,
                direcao: dir
            } as IPercursoDTO;
            var resultado=await this.percursoServiceInstance.criarPercurso(percursoDTO);
            if (resultado.isSuccess) {
                return 1;
            } else {
                return 0;
            }
        } catch (e) {
            console.log("Erro na importação dos percursos");
            console.log(e);
        }
        return 0;
    }
}