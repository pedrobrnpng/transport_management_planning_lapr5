using System;

namespace metadataviagens.Domain.Tripulantes
{
    public class TipoTripulanteId
    {
        public String id{get; private set; }

        public TipoTripulanteId(String id)
        {
            this.id=id;
        }
        
        public String toString(){
           return this.id;
        }
    }
}