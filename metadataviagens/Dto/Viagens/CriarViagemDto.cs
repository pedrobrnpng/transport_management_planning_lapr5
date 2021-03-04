using System;

namespace metadataviagens.Domain.Viagens
{
    public class CriarViagemDto
    {
        public int codigo { get; private set; }
        public DateTime horaInicio { get; private set; }
        public string linha { get; private set; }
        public string idPercurso { get; private set; }

        public CriarViagemDto(int codigo, DateTime horaInicio, string linha, string idPercurso)
        {
            this.codigo = codigo;
            this.horaInicio = horaInicio;
            this.linha = linha;
            this.idPercurso = idPercurso;
        }
    }
}