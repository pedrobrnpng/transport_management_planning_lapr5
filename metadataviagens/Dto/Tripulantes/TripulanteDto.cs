using System;

namespace metadataviagens.Domain.Tripulantes
{
    public class TripulanteDto
    {
        public Guid Id { get; set; }
        public int numeroMecanografico { get; set; }
        public string nome { get; set; }
        public DateTime dataNascimento { get; set; }
        public int numeroCartaoCidadao { get; set; }
        public int nif { get; set; }
        public string turno { get; set; }
        public string tipoTripulanteId { get; set; }
        public DateTime dataEntrada { get; set; }
        public DateTime dataSaida { get; set; }

        public TripulanteDto(Guid Id,int numeroMecanografico,string nome, DateTime dataNascimento,
        int numeroCartaoCidadao,int nif,string turno, string tipoTripulanteId,
        DateTime dataEntrada, DateTime dataSaida)
        {
            this.Id = Id;
            this.numeroMecanografico=numeroMecanografico;
            this.nome = nome;
            this.dataNascimento = dataNascimento;
            this.numeroCartaoCidadao=numeroCartaoCidadao;
            this.nif=nif;
            this.turno=turno;
            this.tipoTripulanteId= tipoTripulanteId;
            this.dataEntrada=dataEntrada;
            this.dataSaida=dataSaida;
        }
    }
}