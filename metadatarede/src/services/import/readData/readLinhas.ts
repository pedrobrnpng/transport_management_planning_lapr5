import { IReadData } from "./IReadData/IReadData";
import ILinhaService from "../../IServices/ILinhaService"
import ILinhaDTO from "../../../dto/ILinhaDTO"
import ITipoTripulanteDTO from "../../../dto/ITipoTripulanteDTO"
import ITipoViaturaDTO from "../../../dto/ITipoViaturaDTO"
import { Inject } from 'typedi';

import config from "../../../../config";

export class ReadLinhas implements IReadData {

    constructor(@Inject(config.services.linha.name) private linhaServiceInstance : ILinhaService) {}

    async readData(lines: string[]) : Promise<number> {
        try {
            var name:string='';
            var codigo:string='';
            var noI:string='';
            var noF:string='';
            var cor:string='';

            let ttDtos:string[]=[];
            let tvDtos:string[]=[];

            var c:number;
            for (c=0;c<lines.length;c++) {
                if (lines[c].startsWith("<Line ")) {
                    var linha=lines[c].split(" ");
                    var key=linha[1].split('"')[1];
                    codigo=linha[3].split('"')[1];
                    name=linha[4].split('"')[1];
                    noI=linha[5].split('"')[1];
                    noF=linha[6].split('"')[1];
                    cor=linha[7].split('"')[1];
                }
                else if (lines[c].startsWith("<LinePath ")) {
                    var linha=lines[c].split(" ");
                    var pathkey=linha[1].split('"')[1];
                    var path=linha[2].split('"')[1];
                    var orientation=linha[3].split('"')[1];
                }
            }
            let dto = {
                id: codigo,
                nome: name,
                idTiposTripulante:ttDtos,
                idTiposViatura:tvDtos,
                noInicial: noI,
                noFinal: noF,
                cor: cor
            } as ILinhaDTO;
            var resultado=await this.linhaServiceInstance.criarLinha(dto);
            if (resultado.isSuccess) {
                return 1;
            } else {
                return 0;
            }
        } catch (e) {
            console.log("Erro na importação das linhas");
            console.log(e);
        }
        return 0;
    }
}