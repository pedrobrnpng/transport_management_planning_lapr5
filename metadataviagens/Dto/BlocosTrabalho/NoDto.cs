using System.Collections.Generic;
using System;

namespace metadataviagens.Domain.BlocosTrabalho
{
    public class NoDto
    {
        public string id_abreviature { get; private set; }
        public string name { get; private set; }
        public string type { get; private set; }
        public string xCoordinate { get; private set; }
        public string yCoordinate { get; private set; }

        public NoDto(string id_abreviature, string name, string type, string xCoordinate, string yCoordinate)
        {
            this.id_abreviature = id_abreviature;
            this.name = name;
            this.type = type;
            this.xCoordinate = xCoordinate;
            this.yCoordinate = yCoordinate;
        }
    }
}