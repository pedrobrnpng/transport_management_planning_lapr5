using System;

namespace metadataviagens.Domain.BlocosViagens
{
    public class CriarBlocoViagemDto
    {
        public int viagemId { get; set; }

        public CriarBlocoViagemDto(int viagemId)
        {
            this.viagemId = viagemId;
        }
    }
}