import { IReadData } from "./IReadData/IReadData";
import ITipoTripulanteService from "../../IServices/ITipoTripulanteService"
import ITipoTripulanteDTO from "../../../dto/ITipoTripulanteDTO"
import { Inject } from 'typedi';
import { Result } from "../../../core/logic/Result";

import config from "../../../../config";

export class ReadTipoTripulantes implements IReadData {

    constructor(@Inject(config.services.tipoTripulante.name) private tipoTripulanteServiceInstance : ITipoTripulanteService) {}

    async readData(lines: string[]) : Promise<number> {
        try {
            var id:string='';
            var desc:string='';

            var c:number;
            for (c=0;c<lines.length;c++) {
                if (lines[c].startsWith("<DriverDutyType ")) {
                    var linha=lines[c].split('"');
                    var key=linha[1];
                    id=linha[3];
                    desc=linha[5];
                }
            }
            let dto = {
                id:id,
                description:desc
            } as ITipoTripulanteDTO;
            var resultado=await this.tipoTripulanteServiceInstance.criarTipoTripulante(dto);
            if (resultado.isSuccess) {
                return 1;
            } else {
                return 0;
            }
        } catch (e) {
            console.log("Erro na importação dos tipos de tripulante");
            console.log(e);
        }
        return 0;
    }
}