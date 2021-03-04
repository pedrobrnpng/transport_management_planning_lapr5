using System;


namespace metadataviagens.Domain.Viaturas
{
    public class CriarViaturaDto
    {
        public string matricula { get; set; }
        public string vin { get; set; }
        public DateTime dataEntrada { get; set; }
        public TipoViaturaId tipoViaturaId { get; set; }


        public CriarViaturaDto(string matricula, string tipoViaturaId, string vin, DateTime dataEntrada)
        {
            this.matricula = matricula;
            this.tipoViaturaId = new TipoViaturaId(tipoViaturaId);
            this.vin = vin;
            this.dataEntrada = dataEntrada;
        }
    }
}
