using System;

namespace metadataviagens.Domain.Viagens
{
    public class ViagemDto
    {
        public Guid Id { get; set; }
        public int codigo { get; private set; }
        public DateTime horaInicio { get; private set; }
        public string linha { get; private set; }
        public string idPercurso { get; private set; }

        public ViagemDto(Guid Id, DateTime horaInicio, string linha, string idPercurso)
        {
            this.Id = Id;
            this.horaInicio = horaInicio;
            this.linha = linha;
            this.idPercurso = idPercurso;
        }
        public ViagemDto(Guid Id, int codigo, DateTime horaInicio, string linha, string idPercurso)
        {
            this.Id = Id;
            this.codigo = codigo;
            this.horaInicio = horaInicio;
            this.linha = linha;
            this.idPercurso = idPercurso;
        }
    }
}