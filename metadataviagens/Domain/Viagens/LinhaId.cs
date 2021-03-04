using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.Viagens
{
    public class LinhaId : IValueObject
    {

        public string id { get; set; }

        public LinhaId()
        {
        }

        public LinhaId(String value)
        {
            this.id = value;
        }
    }
}