using System;
using System.Collections.Generic;
using System.Text;
using metadataviagens.Domain.ServicosTripulante;
using metadataviagens.Services.ServicosTripulante;
using System.Threading.Tasks;

namespace metadataviagens.Services.ReadData
{
    public class ReadServicosTripulante : IReadServicosTripulante
    {
        private readonly IServicosTripulanteService _STservice;

        public ReadServicosTripulante(IServicosTripulanteService STservice) {
            _STservice = STservice;
        }

        public async Task<int> readData(List<string> lines) {
            try {
                string nome="";
                string cor="";
                string tripulanteId="";
                List<int> blocos=new List<int>();

                int c;
                for (c=0;c<lines.Count;c++) {
                    if (lines[c].StartsWith("<DriverDuty ")) {
                        var linha=lines[c].Split(" ");
                        nome=linha[1].Split('"')[1];
                        cor=linha[2].Split('"')[1];
                        tripulanteId=linha[3].Split('"')[1];
                    }
                    else if (lines[c].StartsWith("<ref ")) {
                        var linha=lines[c].Split(" ");
                        int codigo_bt=Int32.Parse(linha[1].Split('"')[1]);
                        blocos.Add(codigo_bt);
                    }
                }

                var dto = new CriarServicoTripulanteDto(tripulanteId, nome, cor, blocos);
                var resultado=await this._STservice.AddAsync(dto);
                if (resultado == null)
                    return 0;

                return 1;
            } catch (Exception e) {
                Console.WriteLine("Erro na importação dos servicos de tripulante");
                Console.WriteLine(e);
            }
            return 0;
        }
    }
}