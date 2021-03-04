using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.BlocosTrabalho
{
    public class Hora
    {
        public int nSec { get; set; }
        
        public Hora(int nSec) {
            // if (nSec<0 || nSec>86400)
            //     throw new BusinessRuleValidationException("Hora inválida");
            this.nSec=nSec;
        }

        public string toString() {
            return this.nSec.ToString();
        }
    }
}