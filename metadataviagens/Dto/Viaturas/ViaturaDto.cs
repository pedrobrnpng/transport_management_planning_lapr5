using System;

namespace metadataviagens.Domain.Viaturas
{
    public class ViaturaDto
    {
        public Guid Id { get; set; }
        public string matricula { get; set; }
        public string tipoViaturaId { get; set; }
        public string vin { get; set; }
        public DateTime dataEntrada { get; set; }

        public ViaturaDto(Guid Id, string matricula, string tipoViaturaId,
                            string vin, DateTime dataEntrada)
        {
            this.Id = Id;
            this.matricula = matricula;
            this.tipoViaturaId = tipoViaturaId;
            this.vin = vin;
            this.dataEntrada = dataEntrada;
        }
    }
}