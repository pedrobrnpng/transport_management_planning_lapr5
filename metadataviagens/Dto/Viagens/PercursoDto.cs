using System.Collections.Generic;
using System;

namespace metadataviagens.Domain.Viagens
{
    public class PercursoDto
    {
        public string id { get; private set; }

        public List<SegmentoLinhaDto> segmentosRede { get; private set; }
        public string idLinha { get; private set; }

        public PercursoDto(string id, List<SegmentoLinhaDto> segmentosRede, string idLinha)
        {
            this.id = id;
            this.segmentosRede = segmentosRede;
            this.idLinha = idLinha;
        }
    }
}