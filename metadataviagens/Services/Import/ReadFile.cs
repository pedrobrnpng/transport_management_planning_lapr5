using System.Security.AccessControl;
using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace metadataviagens.Services.ReadData
{
    public class ReadFile : IReadFile
    {
        private IReadViagens viagens_r;
        private IReadBlocosTrabalho blocos_r;
        private IReadServicosViatura serv_v_r;
        private IReadServicosTripulante serv_t_r;

        private int viagens;
        private int blocos;
        private int serv_v;
        private int serv_t;
        private int nerros;
        private string out_str;
        private List<string> erros;

        public ReadFile(IReadBlocosTrabalho blocos_r, IReadViagens viagens_r, IReadServicosViatura serv_v_r, IReadServicosTripulante serv_t_r) {
            this.blocos_r=blocos_r;
            this.viagens_r=viagens_r;
            this.serv_v_r=serv_v_r;
            this.serv_t_r=serv_t_r;
        }

        public async Task<string> importarDados(string input) {
            try {
                this.viagens=0;
                this.blocos=0;
                this.serv_v=0;
                this.serv_t=0;
                this.erros=new List<string>();
                this.nerros=0;
                this.out_str="";
                var lines_a=input.Split('\n');
                //var lines=input.Split('\n', StringSplitOptions.RemoveEmptyEntries);
                var lines=new List<string>();
                lines.AddRange(lines_a);

                for (var line=0;line<lines.Count;line++) {
                    var data_h=lines[line].Trim();
                    switch(data_h) {
                        case ("<Trips>"):
                            line++;
                            this.viagens = await this.readData(lines,line,this.viagens_r,this.viagens,"</Trips>");
                            if (this.viagens < 0)
                                throw new Exception("Formato de documento inválido (Viagens)");
                            break;
                        case ("<WorkBlocks>"):
                            line++;
                            this.blocos = await this.readData(lines,line,this.blocos_r,this.blocos,"</WorkBlocks>");
                            if (this.blocos < 0)
                                throw new Exception("Formato de documento inválido (Blocos de trabalho)");
                            break;
                        case ("<VehicleDuties>"):
                            line++;
                            this.serv_v = await this.readData(lines,line,this.serv_v_r,this.serv_v,"</VehicleDuties>");
                            if (this.serv_v < 0)
                                throw new Exception("Formato de documento inválido (Serviços de viatura)");
                            break;
                        case ("<DriverDuties>"):
                            line++;
                            this.serv_t = await this.readData(lines,line,this.serv_t_r,this.serv_t,"</DriverDuties>");
                            if (this.serv_t < 0)
                                throw new Exception("Formato de documento inválido (Serviços de tripulante)");
                            break;
                        default:
                            break;
                    }
                }
                this.out_str= "Adicionados/atualizados: - "+this.viagens+" Viagem(ns); - "+
                        this.blocos+" Bloco(s) de trabalho; - "+this.serv_v+" Serviço(s) de viatura; - "+
                        this.serv_t+" Serviço(s) de tripulante; Erros: "+this.nerros;

                foreach (var erro in erros)
                {
                    this.out_str+="; "+erro;
                }
                return out_str;
            } catch (Exception e) {
                return e.ToString();
            }
        }

        private async Task<int> readData(List<string> lines, int linen, IReadData data_r, int num, string end) {
            List<string> data_lines=new List<string>();
            var first=true;
            int line;
            for (line=linen;line<linen+500;line++) {
                var linha=lines[line].Trim();
                if (linha==end) {
                    break;
                }
                if (linha==this.removePlural(end)) {
                    int numr = await data_r.readData(data_lines);
                    if (numr==1) {
                        num+=numr;
                    } else {
                        if (first) this.erros.Add("Linha do documento .glx: "+(line-data_lines.Count+1));
                        else this.erros.Add("Linha do documento .glx: "+(line-data_lines.Count+2));
                        this.nerros++;
                        break;
                    } 
                    data_lines.Clear();
                    first=false;
                }
                data_lines.Add(linha);
            }
            if (line<linen+500)
                return num;
            else
                return -1;
        }

        private string removePlural(string str) {
            if (str.EndsWith("Duties>"))
                return str.Replace("Duties", "Duty");

            return str.Remove(str.Length-2,1);
        }
    }
}