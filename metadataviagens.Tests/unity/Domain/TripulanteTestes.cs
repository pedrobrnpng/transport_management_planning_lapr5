using NUnit.Framework;
using metadataviagens.Domain.Tripulantes;
using System;
using DDDSample1.Domain.Shared;


namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class TripulanteTests
    {
        private int _numeroMecanografico = 123123123;
        private string _nome = "José Silva";
        private int _numeroCartaoCidadao = 12312312;
        private int _nif = 123123123;
        private DateTime _dataNascimento = DateTime.Parse("12/12/1998");
        private Turno _turno = new Turno("diurno");
        private TipoTripulanteId _tripulanteId = new TipoTripulanteId("12");
        private DateTime _dataEntrada = DateTime.Parse("12/12/2005");
        private DateTime _dataSaida = DateTime.Parse("12/12/2012");

        [Test]
        public void ShouldCreateTripulante()
        {
            var tripulante = new Tripulante(this._numeroMecanografico, this._nome, this._dataNascimento,
            this._numeroCartaoCidadao, this._nif, this._turno, this._tripulanteId, this._dataEntrada, this._dataSaida);
        }

        [Test]
        public void ShouldNotCreateTripulanteWithNullNome()
        {
            Assert.That(() => new Tripulante(this._numeroMecanografico, null, this._dataNascimento,
            this._numeroCartaoCidadao, this._nif, this._turno, this._tripulanteId, this._dataEntrada, this._dataSaida),
            Throws.TypeOf<NullReferenceException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithNullTurno()
        {
            Assert.That(() => new Tripulante(this._numeroMecanografico, this._nome, this._dataNascimento,
            this._numeroCartaoCidadao, this._nif, null, this._tripulanteId, this._dataEntrada, this._dataSaida),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithNullTripulanteId()
        {
            Assert.That(() => new Tripulante(this._numeroMecanografico, this._nome, this._dataNascimento,
            this._numeroCartaoCidadao, this._nif, this._turno, null, this._dataEntrada, this._dataSaida),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithBadNumeroMecanografico()
        {
            Assert.That(() => new Tripulante(1, this._nome, this._dataNascimento,
            this._numeroCartaoCidadao, this._nif, this._turno, this._tripulanteId, this._dataEntrada, this._dataSaida),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithBadNumeroCartaoCidadao()
        {
            Assert.That(() => new Tripulante(this._numeroMecanografico, this._nome, this._dataNascimento,
            1, this._nif, this._turno, this._tripulanteId, this._dataEntrada, this._dataSaida),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithBadNif()
        {
            Assert.That(() => new Tripulante(this._numeroMecanografico, this._nome, this._dataNascimento,
            this._numeroCartaoCidadao, 1, this._turno, this._tripulanteId, this._dataEntrada, this._dataSaida),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithBadDataNascimento()
        {
            Assert.That(() => new Tripulante(this._numeroMecanografico, this._nome, DateTime.Parse("12/12/2020"),
            this._numeroCartaoCidadao, this._nif, this._turno, this._tripulanteId, this._dataEntrada, this._dataSaida),
            Throws.TypeOf<BusinessRuleValidationException>());
        }




    }
}
