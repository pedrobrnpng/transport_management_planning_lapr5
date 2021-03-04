using System;

namespace metadataviagens.Domain.Viaturas
{
    public class TipoViaturaId
    {
        public String id { get; private set; }

        public TipoViaturaId(String id)
        {
            this.id = id;
        }

        public String toString()
        {
            return this.id;
        }
    }
}
