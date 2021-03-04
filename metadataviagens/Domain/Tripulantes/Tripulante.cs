using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.Tripulantes
{
    public class Tripulante : Entity<TripulanteId>, IAggregateRoot
    {

        public int numeroMecanografico { get; set; }
        public string nome { get; set; }
        public DateTime dataNascimento { get; set; }
        public int numeroCartaoCidadao { get; set; }
        public int nif { get; set; }
        public bool Active { get; private set; }
        public TipoTripulanteId tipoTripulanteId { get; private set; }
        public Turno turno { get; set; }
        public DateTime dataEntrada { get; set; }
        public DateTime dataSaida { get; set; }

        private Tripulante()
        {
            this.Active = true;
        }

        private Boolean validaTripulante(string nome, int numeroMecanografico,int numeroCartaoCidadao,int nif, 
        DateTime dataNascimento,Turno turno,TipoTripulanteId tripulanteId)
        {
            return nome.Trim().Length > 0 && turno !=null && tripulanteId !=null &&
            ((Math.Floor(Math.Log10(numeroMecanografico)) + 1) == 9) &&
            ((DateTime.Today - dataNascimento).TotalDays > 6570) &&
            ((Math.Floor(Math.Log10(nif)) + 1) == 9) &&
            (((Math.Floor(Math.Log10(numeroCartaoCidadao)) + 1) == 8));
        }

        public Tripulante(int numeroMecanografico, string nome, DateTime dataNascimento,
        int numeroCartaoCidadao, int nif, Turno turno, TipoTripulanteId tipoTripulanteId,
        DateTime dataEntrada, DateTime dataSaida)
        {
            if (!validaTripulante(nome,numeroMecanografico,numeroCartaoCidadao,nif, dataNascimento,turno,tipoTripulanteId))
            {
                throw new BusinessRuleValidationException("Tripulante mal definido");
            }
            this.Id = new TripulanteId(Guid.NewGuid());
            this.nome = nome;
            this.numeroMecanografico = numeroMecanografico;
            this.dataNascimento = dataNascimento;
            this.numeroCartaoCidadao = numeroCartaoCidadao;
            this.nif = nif;
            this.turno = turno;
            this.tipoTripulanteId = tipoTripulanteId;
            this.dataEntrada = dataEntrada;
            this.dataSaida = dataSaida;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}