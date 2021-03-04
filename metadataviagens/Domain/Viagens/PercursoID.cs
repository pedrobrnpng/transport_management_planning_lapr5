using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.Viagens
{
    public class PercursoId: IValueObject
    {

        public string id {get; set; }

        public PercursoId()
        {
        }

        public PercursoId(String value)
        {
            this.id = value;
        }
    }
}