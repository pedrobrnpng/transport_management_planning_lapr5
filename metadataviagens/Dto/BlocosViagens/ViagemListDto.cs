using System;
using System.Collections.Generic;

namespace metadataviagens.Domain.BlocosViagens
{
    public class ViagemListDto
    {
        public int[] viagens { get; set; }

        public ViagemListDto(List<int> viagensList)
        {
            this.viagens = viagensList.ToArray();
        }
    }
}