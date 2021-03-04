using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.BlocosTrabalho
{
    public class BlocoTrabalho : Entity<BlocoTrabalhoId>, IAggregateRoot
    {

        public int codigo { get; set; }
        public int horaInicio { get; set; }
        public int horaFim { get; set; }
        public string noInicio { get; set; }
        public string noFim { get; set; }
        public bool ctt{ get; private set; }
        public bool active{ get; private set; }

        public BlocoTrabalho()
        {
        }

        private Boolean verificaBlocoTrabalho(int codigo, int horaInicio, int horaFim, string noInicio, string noFim)
        {
            if (codigo < 1)
                return false;

            if(noInicio == null || noFim == null) {
                return false;
            }
            if (horaInicio < 0 || horaFim < 0 || horaFim > 86399)
                return false;
            
            return horaFim-horaInicio>0;
        }

        public BlocoTrabalho(int codigo, int horaInicio, int horaFim, string noInicio, 
        string noFim, bool ctt)
        {
            if(!verificaBlocoTrabalho(codigo, horaInicio, horaFim, noInicio, noFim)) {
                throw new BusinessRuleValidationException("Bloco de trabalho inválido");
            }
            this.Id = new BlocoTrabalhoId(Guid.NewGuid());
            this.codigo = codigo;
            this.horaInicio = horaInicio;
            this.horaFim = horaFim;
            this.noInicio = noInicio;
            this.noFim = noFim;
            this.ctt= ctt;
            this.active = true;
        }

        public String toString() {
            return this.Id.AsString();
        }

        public void MarkAsInative()
        {
            this.active = false;
        }
    }
}