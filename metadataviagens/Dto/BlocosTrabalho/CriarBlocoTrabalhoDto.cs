using System;

namespace metadataviagens.Domain.BlocosTrabalho
{
    public class CriarBlocoTrabalhoDto
    {
        public int codigo { get; set; }
        public int horaInicio { get; set; }
        public int horaFim { get; set; }
        public string noInicio { get; set; }
        public string noFim { get; set; }
        public bool ctt{ get; private set; }
        public bool active{ get; private set; }

        public CriarBlocoTrabalhoDto(int codigo, int horaInicio, int horaFim, string noInicio, 
        string noFim, bool ctt)
        {
            this.codigo = codigo;
            this.horaInicio = horaInicio;
            this.horaFim = horaFim;
            this.noInicio = noInicio;
            this.noFim = noFim;
            this.ctt= ctt;
            this.active = true;
        }
    }
}