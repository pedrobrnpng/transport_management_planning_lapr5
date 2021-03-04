import { IReadData } from "./IReadData/IReadData";
import INoService from "../../IServices/INoService"
import INoDTO from "../../../dto/INoDTO"
import { Inject } from 'typedi';

import config from "../../../../config";

export class ReadNos implements IReadData {

    constructor(@Inject(config.services.no.name) private noServiceInstance : INoService) {}

    async readData(lines: string[]) : Promise<number> {
        try{
            var key:string='';
            var shortName:string='';
            var name:string='';
            var latitude:string='';
            var longitude:string='';
            var type:string='';

            var c:number;
            for (c=0;c<lines.length;c++) {
                if (lines[c].startsWith("<Node ")) {
                    var linha=lines[c].split('"');
                    key=linha[1];
                    shortName=linha[3];
                    name=linha[5];
                    latitude=linha[7];
                    longitude=linha[9];
                    type=linha[11];
                }
            }
            let dto = {
                name: name,
                id_abreviature: shortName,
                xCoordinate: +latitude,
                yCoordinate: +longitude,
                type: type
            } as INoDTO;
            var resultado=await this.noServiceInstance.criarNo(dto);
            if (resultado.isSuccess) {
                return 1;
            } else {
                return 0;
            }
        } catch (e) {
            console.log("Erro na importação dos nós");
            console.log(e);
        }
        return 0;
    }
}