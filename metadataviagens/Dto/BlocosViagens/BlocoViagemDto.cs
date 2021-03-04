using System;

namespace metadataviagens.Domain.BlocosViagens
{
    public class BlocoViagemDto
    {
        public Guid Id { get; set; }
        public int blocoCodigo { get; set; }
        public int viagemId { get; set; }

        public BlocoViagemDto(Guid Id, int blocoCodigo, int viagemId)
        {
            this.Id = Id;
            this.blocoCodigo = blocoCodigo;
            this.viagemId = viagemId;
        }
    }
}