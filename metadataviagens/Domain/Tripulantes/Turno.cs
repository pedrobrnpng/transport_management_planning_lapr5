using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.Tripulantes
{
    enum Turnos 
    {
        diurno,
        noturno
    }

    public class Turno: IValueObject
    {
        public string turno {get; set; }

        public Turno(string turno) {
            if(!Enum.IsDefined(typeof(Turnos),turno.ToLower())) 
                throw new BusinessRuleValidationException("Turno só pode ser diurno ou noturno");
            this.turno=turno;
        }

        public String toString() {
            return this.turno;
        }
    }
}