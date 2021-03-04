using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace metadataviagens.Domain.ServicosTripulante
{
    public class ServicoTripulanteId : EntityId
    {
        [JsonConstructor]
        public ServicoTripulanteId(Guid value) : base(value)
        {
        }

        public ServicoTripulanteId(String value) : base(value)
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