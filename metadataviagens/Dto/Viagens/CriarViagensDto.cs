using System;

namespace metadataviagens.Domain.Viagens
{
    public class CriarViagensDto
    {
        public DateTime horaInicio { get; private set; }
        public int frequencia { get; private set; }
        public int nViagens { get; private set; }
        public string idPercursoIda { get; private set; }
        public string idPercursoVolta { get; private set; }



        public CriarViagensDto(DateTime horaInicio, int frequencia, int nViagens, string idPercursoIda, string idPercursoVolta)
        {
            this.horaInicio = horaInicio;
            this.frequencia = frequencia;
            this.nViagens = nViagens;
            this.idPercursoIda = idPercursoIda;
            this.idPercursoVolta = idPercursoVolta;
        }
    }
}