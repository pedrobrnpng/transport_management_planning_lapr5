using System;
using System.Collections.Generic;
using System.Text;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Domain.BlocosViagens;
using metadataviagens.Services.BlocosTrabalho;
using metadataviagens.Services.BlocosViagens;
using System.Threading.Tasks;

namespace metadataviagens.Services.ReadData
{
    public class ReadBlocosTrabalho : IReadBlocosTrabalho
    {
        private readonly IBlocoTrabalhoService _BTservice;
        private readonly IBlocoViagemService _BVservice;

        public ReadBlocosTrabalho(IBlocoTrabalhoService service, IBlocoViagemService BVservice) {
            _BTservice = service;
            _BVservice = BVservice;
        }

        public async Task<int> readData(List<string> lines) {
            try {
                int codigo=0;
                int horaInicio=0;
                int horaFim=0;
                string noInicio="";
                string noFim="";
                bool ctt=false;
                bool active=false;

                List<CriarBlocoViagemDto> bvDtos = new List<CriarBlocoViagemDto>();

                int c;
                for (c=0;c<lines.Count;c++) {
                    if (lines[c].StartsWith("<WorkBlock ")) {
                        var linha=lines[c].Split(" ");
                        codigo=Int32.Parse(linha[1].Split('"')[1]);
                        horaInicio=Int32.Parse(linha[2].Split('"')[1]);
                        horaFim=Int32.Parse(linha[3].Split('"')[1]);
                        noInicio=linha[4].Split('"')[1];
                        noFim=linha[5].Split('"')[1];
                        ctt=bool.Parse(linha[6].Split('"')[1]);
                        active=bool.Parse(linha[7].Split('"')[1]);
                    }
                    else if (lines[c].StartsWith("<ref ")) {
                        var linha=lines[c].Split(" ");
                        int codigo_v=Int32.Parse(linha[1].Split('"')[1]);
                        bvDtos.Add(new CriarBlocoViagemDto(codigo_v));
                    }
                }
                var dto = new CriarBlocoTrabalhoDto(codigo, horaInicio, horaFim, noInicio, noFim, ctt);
                var resultado=await this._BTservice.AddAsync(dto);
                if (resultado == null)
                    return 0;

                foreach (var bvDto in bvDtos)
                {
                    var resultadoBV=await this._BVservice.AddAsync(codigo, bvDto);
                    if (resultadoBV == null)
                        return 0;
                }
                return 1;
            } catch (Exception e) {
                Console.WriteLine("Erro na importação dos blocos de trabalho");
                Console.WriteLine(e);
            }
            return 0;
        }
    }
}