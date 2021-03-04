using System;
using System.Collections.Generic;
using System.Text;
using metadataviagens.Domain.Viagens;
using metadataviagens.Services.Viagens;
using System.Threading.Tasks;
using System.Globalization;

namespace metadataviagens.Services.ReadData
{
    public class ReadViagens : IReadViagens
    {
        private readonly IViagemService _Vservice;

        public ReadViagens(IViagemService Vservice) {
            _Vservice = Vservice;
        }

        public async Task<int> readData(List<string> lines) {
            try {
                int codigo=0;
                DateTime horaInicio=new DateTime();
                string linhaid="";
                string idPercurso="";

                int c;
                for (c=0;c<lines.Count;c++) {
                    if (lines[c].StartsWith("<Trip ")) {
                        var linha=lines[c].Split(" ");
                        var linha_data=lines[c].Split('"');
                        codigo=Int32.Parse(linha[1].Split('"')[1]);
                        horaInicio=DateTime.Parse(linha_data[3]);
                        linhaid=linha[4].Split('"')[1];
                        idPercurso=linha[5].Split('"')[1];
                    }
                }
                var dto = new CriarViagemDto(codigo, horaInicio, linhaid, idPercurso);
                
                var resultado=await this._Vservice.AddAsync(dto);
                if (resultado != null) {
                    return 1;
                }
            } catch (Exception e) {
                Console.WriteLine("Erro na importação das viagens");
                Console.WriteLine(e);
            }
            return 0;
        }
    }
}