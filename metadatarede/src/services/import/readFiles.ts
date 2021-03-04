import * as fs from 'fs';
import { ReadTipoViaturas } from "./readData/readTipoViaturas";
import { ReadNos } from "./readData/readNos";
import { ReadPercursos } from "./readData/readPercursos";
import { ReadLinhas } from "./readData/readLinhas";
import { ReadTipoTripulantes } from "./readData/readTipoTripulantes";
import { Container } from 'typedi';
import { Result } from "../../../src/core/logic/Result";
import config from "../../../config";

//const glx_file = "./src/services/import/import.glx";

export default class ReadFile {

    private tipos_v;
    private nos;
    private percs;
    private linhas;
    private tipos_t;
    private erros:Array<String>;
    private nerros;
    private out_str;

    removePlural(str:string) {
        var tmp=[str.slice(0,str.length-2),str.charAt(str.length-1)].join('');
        return tmp;
    }
    
    async readData(lines:string[],line:number,data_r,num:number,end:string) {
        var data_lines:string[]=[];
        var c:number=0;
        var first:boolean=true;
        for (line=line;true;line++) {
            var linha=lines[line].trim();
            if (linha==end) {
                break;
            }
            if (linha==this.removePlural(end)) {
                var numr:number = await data_r.readData(data_lines);
                if (numr==1) {
                    num+=numr;
                } else {
                    if (first) this.erros.push("Linha do documento .glx: "+(line-data_lines.length+1));
                    else this.erros.push("Linha do documento .glx: "+(line-data_lines.length+2));
                    this.nerros++;
                    break;
                } 
                data_lines=[];
                c=0;
                first=false;
            }
            data_lines[c++]=linha;
        }
        return num;
    }

    async importarDados(filename:string) : Promise<Result<string>> {
        try {
            var data=fs.readFileSync(filename);
                
            this.tipos_v=0;
            this.nos=0;
            this.percs=0;
            this.linhas=0;
            this.tipos_t=0;
            this.erros=new Array;
            this.nerros=0;
            this.out_str="";
            var lines=data.toString().split('\n');
            
            for (var line=3;line<lines.length;line++) {
                var data_h=lines[line].trim();
                switch(data_h) {
                    case ("<VehicleTypes>"):
                        line++;
                        let tv_r = new ReadTipoViaturas(Container.get(config.services.tipoViatura.name));
                        this.tipos_v=await this.readData(lines,line,tv_r,this.tipos_v,"</VehicleTypes>");
                        break;
                    case ("<Nodes>"):
                        line++;
                        let nos_r = new ReadNos(Container.get(config.services.no.name));
                        this.nos=await this.readData(lines,line,nos_r,this.nos,"</Nodes>");
                        break;
                    case ("<Paths>"):
                        line++;
                        let percs_r = new ReadPercursos(Container.get(config.services.percurso.name));
                        this.percs=await this.readData(lines,line,percs_r,this.percs,"</Paths>");
                        break;
                    case ("<Lines>"):
                        line++;
                        let linhas_r = new ReadLinhas(Container.get(config.services.linha.name));
                        this.linhas=await this.readData(lines,line,linhas_r,this.linhas,"</Lines>");
                        break;
                    case ("<DriverDutyTypes>"):
                        line++;
                        let tt_r = new ReadTipoTripulantes(Container.get(config.services.tipoTripulante.name));
                        this.tipos_t=await this.readData(lines,line,tt_r,this.tipos_t,"</DriverDutyTypes>");
                        break;
                    default:
                        break;
                }
            }
            
            this.out_str="Adicionados/atualizados: - "+this.tipos_v+" Tipo(s) de Viatura; - "+
                        this.nos+" Nó(s); - "+this.percs+" Percurso(s); - "+
                        this.linhas+" Linha(s); - "+this.tipos_t+" Tipo(s) de Tripulante; Erros: "+this.nerros;
            this.erros.forEach(erro => {
                this.out_str+=" "+erro;
            });
            fs.unlinkSync(filename);
        } catch (e) {
            Result.fail<string>("Erro na importação.");
        }
        return Result.ok<string>(this.out_str);
    }
}