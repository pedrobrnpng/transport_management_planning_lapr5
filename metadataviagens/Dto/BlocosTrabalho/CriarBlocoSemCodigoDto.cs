using System;

namespace metadataviagens.Domain.BlocosTrabalho
{
    public class CriarBlocoSemCodigoDto
    {
        public int horaInicio { get; set; }
        public int horaFim { get; set; }
        public string noInicio { get; set; }
        public string noFim { get; set; }
        public bool ctt{ get; private set; }
        public bool active{ get; private set; }

        public CriarBlocoSemCodigoDto(int horaInicio, int horaFim, string noInicio, 
        string noFim, bool ctt)
        {
            this.horaInicio = horaInicio;
            this.horaFim = horaFim;
            this.noInicio = noInicio;
            this.noFim = noFim;
            this.ctt= ctt;
            this.active = true;
        }
    }
}