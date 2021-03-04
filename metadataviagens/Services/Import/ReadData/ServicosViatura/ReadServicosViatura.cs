using System;
using System.Collections.Generic;
using System.Text;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Services.ServicosViatura;
using System.Threading.Tasks;

namespace metadataviagens.Services.ReadData
{
    public class ReadServicosViatura : IReadServicosViatura
    {
        private readonly IServicoViaturaService _SVservice;

        public ReadServicosViatura(IServicoViaturaService SVservice) {
            _SVservice = SVservice;
        }

        public async Task<int> readData(List<string> lines) {
            try {
                string nome="";
                string cor="";
                string depots="";
                string viatura="";
                List<int> blocos=new List<int>();

                int c;
                for (c=0;c<lines.Count;c++) {
                    if (lines[c].StartsWith("<VehicleDuty ")) {
                        var linha=lines[c].Split(" ");
                        nome=linha[1].Split('"')[1];
                        cor=linha[2].Split('"')[1];
                        depots=linha[3].Split('"')[1];
                        viatura=linha[4].Split('"')[1];
                    }
                    else if (lines[c].StartsWith("<ref ")) {
                        var linha=lines[c].Split(" ");
                        int codigo_bt=Int32.Parse(linha[1].Split('"')[1]);
                        blocos.Add(codigo_bt);
                    }
                }

                var dto = new CriarServicoViaturaDto(nome, cor, depots, viatura, blocos);
                var resultado=await this._SVservice.AddAsync(dto);
                if (resultado == null)
                    return 0;

                return 1;
            } catch (Exception e) {
                Console.WriteLine("Erro na importação dos servicos de viatura");
                Console.WriteLine(e);
            }
            return 0;
        }
    }
}