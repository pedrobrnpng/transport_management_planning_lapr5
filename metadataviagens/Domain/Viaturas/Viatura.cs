using System;
using System.ComponentModel.DataAnnotations;
using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace metadataviagens.Domain.Viaturas {

    public class Viatura : Entity<ViaturaId>, IAggregateRoot {

        public string matricula { get; set; }
        public string vin { get; set; }
        public TipoViaturaId tipoViaturaId { get; private set; }
        public DateTime dataEntrada {get; set; }

        private Viatura()
        {
        }

        public Viatura(string matricula, TipoViaturaId tipo,
            string vin, DateTime dataEntrada)
        {
            Id = new ViaturaId(Guid.NewGuid());
            if(ValidateVin(vin))
                this.vin = vin;
            else throw new BusinessRuleValidationException("VIN invalido");

            if (validateMatricula(matricula))
                this.matricula = matricula;
            else throw new BusinessRuleValidationException("Matricula invalido");

            if (validateDataEntrada(dataEntrada))
                this.dataEntrada = dataEntrada;
            else throw new BusinessRuleValidationException("Data entrada nao pode ser superior a de hoje.");  

            if(tipo != null)
                this.tipoViaturaId = tipo;
            else throw new BusinessRuleValidationException("Tem de definir um tipo de viatura");

        }

        public Boolean validateDataEntrada(DateTime dataEntrada)
        {
            var now = DateTime.Now;
            if (dataEntrada > now)
                return false;
            return true;
        }

        public Boolean validateMatricula(string matricula)
        {
            if (!(Regex.Match(matricula, "^[A-Z]{2}-[0-9]{2}-[0-9]{2}$").Success || Regex.Match(matricula, "^[0-9]{2}-[0-9]{2}-[A-Z]{2}$").Success
                ||Regex.Match(matricula, "^[0-9]{2}-[A-Z]{2}-[0-9]{2}$").Success || Regex.Match(matricula, "^[A-Z]{2}-[A-Z]{2}-[0-9]{2}$").Success
                ||Regex.Match(matricula, "^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$").Success || Regex.Match(matricula, "^[0-9]{2}-[A-Z]{2}-[A-Z]{2}$").Success))
            {
                return false;
            }
            return true;
        }

        static bool ValidateVin(string vin)
        {
            if (vin.Length != 17)
                return false;
            var result = 0;
            var index = 0;
            var checkDigit = 0;
            var checkSum = 0;
            var weight = 0;
            foreach (var c in vin.ToCharArray())
            {
                index++;
                var character = c.ToString().ToLower();
                if (char.IsNumber(c))
                    result = int.Parse(character);
                else
                {
                    switch (character)
                    {
                        case "a":
                        case "j":
                            result = 1;
                            break;
                        case "b":
                        case "k":
                        case "s":
                            result = 2;
                            break;
                        case "c":
                        case "l":
                        case "t":
                            result = 3;
                            break;
                        case "d":
                        case "m":
                        case "u":
                            result = 4;
                            break;
                        case "e":
                        case "n":
                        case "v":
                            result = 5;
                            break;
                        case "f":
                        case "w":
                            result = 6;
                            break;
                        case "g":
                        case "p":
                        case "x":
                            result = 7;
                            break;
                        case "h":
                        case "y":
                            result = 8;
                            break;
                        case "r":
                        case "z":
                            result = 9;
                            break;
                    }
                }

                if (index >= 1 && index <= 7 || index == 9)
                    weight = 9 - index;
                else if (index == 8)
                    weight = 10;
                else if (index >= 10 && index <= 17)
                    weight = 19 - index;
                if (index == 9)
                    checkDigit = character == "x" ? 10 : result;
                checkSum += (result * weight);
            }

            return checkSum % 11 == checkDigit;
        }

    }
}