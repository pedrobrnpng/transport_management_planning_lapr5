using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.Shared
{
    public class Cor
    {
        public String cor { get; set; }
        private Regex regexRGB = new Regex(@"^RGB\(([1-9]\d{0,2}|0)\,([1-9]\d{0,2}|0)\,([1-9]\d{0,2}|0)\)$");
        public Cor() {}
        
        public Cor(string cor) {
            if(!regexRGB.IsMatch(cor)) 
                throw new BusinessRuleValidationException("Cor tem formato inválido");
            this.cor=cor;
        }

        public String toString() {
            return this.cor;
        }

        public String ToHex() {
            string numbers=this.cor.Substring(4,this.cor.Length-5);
            string[] splits=numbers.Split(',');
            string hex="#"+splits[0]+splits[2]+splits[1];
            return hex;
        }
    }
}