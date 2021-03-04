using System;

namespace metadataviagens.Domain.BlocosTrabalho
{
    public class BlocoTrabalhoDto
    {
        public Guid Id { get; set; }
        public int codigo { get; set; }
        public int horaInicio { get; set; }
        public int horaFim { get; set; }
        public string noInicio { get; set; }
        public string noFim { get; set; }
        public bool ctt{ get; private set; }
        public bool active{ get; private set; }

        public BlocoTrabalhoDto(Guid Id, int codigo, int horaInicio, int horaFim, string noInicio, 
        string noFim, bool ctt)
        {
            this.Id = Id;
            this.codigo = codigo;
            this.horaInicio = horaInicio;
            this.horaFim = horaFim;
            this.noInicio = noInicio;
            this.noFim = noFim;
            this.ctt = ctt;
            this.active = true;
        }

        public BlocoTrabalhoDto(Guid Id, int horaInicio, int horaFim, string noInicio, 
        string noFim, bool ctt)
        {
            this.Id = Id;
            this.horaInicio = horaInicio;
            this.horaFim = horaFim;
            this.noInicio = noInicio;
            this.noFim = noFim;
            this.ctt = ctt;
            this.active = true;
        }
    }
}