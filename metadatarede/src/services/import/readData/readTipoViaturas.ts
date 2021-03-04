import { IReadData } from "./IReadData/IReadData";
import ITipoViaturaService from "../../IServices/ITipoViaturaService"
import ITipoViaturaDTO from "../../../dto/ITipoViaturaDTO"
import { Inject } from 'typedi';

import config from "../../../../config";

export class ReadTipoViaturas implements IReadData {

    constructor(
        @Inject(config.services.tipoViatura.name) private tipoViaturaServiceInstance : ITipoViaturaService
    ) {}

    async readData(lines: string[]) : Promise<number> {
        try {
            var codigo:string='';
            var desc:string='';
            var fuel:string='';
            var autonomy:string='';
            var avgSpeed:string='';
            var cost:string='';
            var curr:string='';
            var consumption:string='';

            var c:number;
            for (c=0;c<lines.length;c++) {
                if (lines[c].startsWith("<VehicleType ")) {
                    var linha=lines[c].split(" ");
                    var key=linha[1].split('"')[1];
                    codigo=linha[2].split('"')[1];
                    desc=linha[3].split('"')[1];
                    fuel=linha[4].split('"')[1];
                    autonomy=linha[5].split('"')[1];
                    avgSpeed=linha[6].split('"')[1];
                    cost=linha[7].split('"')[1];
                    curr=linha[8].split('"')[1];
                    consumption=linha[9].split('"')[1];
                    console.log
                    var emissions=linha[10].split('"')[1];
                }
            }

            let dto = {
                id:codigo,
                descricao:desc,
                combustivel:+fuel,
                autonomia:+autonomy,
                velocidadeMedia:+avgSpeed,
                custoKM:{ "valor": +cost , "moeda": curr },
                consumoMedio:+consumption
            } as ITipoViaturaDTO;

            var resultado = await this.tipoViaturaServiceInstance.criarTipoViatura(dto);
            if (resultado.isSuccess) {
                return 1;
            } else {
                return 0;
            }
        } catch (e) {
            console.log("Erro na importação dos tipos de viatura");
            console.log(e);
        }
        return 0;
    }
}