using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace metadataviagens.Domain.BlocosViagens
{
    public class BlocoViagemId : EntityId
    {
        [JsonConstructor]
        public BlocoViagemId(Guid value) : base(value)
        {
        }

        public BlocoViagemId(String value) : base(value)
        {
        }

        override
        protected Object createFromString(String text){
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