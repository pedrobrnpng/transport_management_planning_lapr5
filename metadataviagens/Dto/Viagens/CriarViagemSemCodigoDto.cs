using System;

namespace metadataviagens.Domain.Viagens
{
    public class CriarViagemSemCodigoDto
    {
        public DateTime horaInicio { get; private set; }
        public string linha { get; private set; }
        public string idPercurso { get; private set; }

        public CriarViagemSemCodigoDto(DateTime horaInicio, string linha, string idPercurso)
        {
            this.horaInicio = horaInicio;
            this.linha = linha;
            this.idPercurso = idPercurso;
        }
    }
}