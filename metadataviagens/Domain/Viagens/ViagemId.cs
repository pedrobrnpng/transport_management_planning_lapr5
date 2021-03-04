using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace metadataviagens.Domain.Viagens
{
    public class ViagemId : EntityId
    {
        [JsonConstructor]
        public ViagemId(Guid value) : base(value)
        {
        }
        public ViagemId(String value) : base(value)
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