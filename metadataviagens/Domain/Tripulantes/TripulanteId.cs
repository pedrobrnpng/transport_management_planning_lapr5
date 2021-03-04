using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace metadataviagens.Domain.Tripulantes
{
    public class TripulanteId : EntityId
    {
        [JsonConstructor]
        public TripulanteId(Guid value) : base(value)
        {
        }

        public TripulanteId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }
        
        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}