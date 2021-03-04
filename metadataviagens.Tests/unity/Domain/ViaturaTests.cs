using NUnit.Framework;
using metadataviagens.Domain.Viaturas;
using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class ViaturaTest
    {
        private string _matricula = "AB-CD-12";
        private string _vin = "11111111111111111";
        private TipoViaturaId _tipoViaturaId = new TipoViaturaId("12345123451234512345");
        private DateTime _dataEntrada = DateTime.Parse("29/12/2020");

        [Test]
        public void ShouldCreateViatura()
        {
            var viatura = new Viatura(this._matricula, this._tipoViaturaId, this._vin, this._dataEntrada);
        }

        [Test]
        public void ShouldNotCreateViaturaWithInvalidMatricula()
        {
            Assert.That(() => new Viatura("AA-AA-AAA", this._tipoViaturaId, this._vin, this._dataEntrada),
                Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateViaturaWithInvalidVIN()
        {
            Assert.That(() => new Viatura(this._matricula, this._tipoViaturaId, "11111111111112321", this._dataEntrada),
                Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateViaturaWithInvalidTipoViaturaId()
        {
            Assert.That(() => new Viatura(this._matricula, null, "11111111111111111", this._dataEntrada),
                Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateViaturaWithInvalidDated()
        {
            Assert.That(() => new Viatura(this._matricula, this._tipoViaturaId, "11111111111111111", DateTime.Parse("29/12/2040")),
                Throws.TypeOf<BusinessRuleValidationException>());
        }
    }
}