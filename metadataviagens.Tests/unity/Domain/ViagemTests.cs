using NUnit.Framework;
using metadataviagens.Domain.Viagens;
using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class ViagemTest
    {
        private int _codigo = 1;
        private LinhaId _linha = new LinhaId("1");
        private PercursoId _percursoId = new PercursoId("1");
        private DateTime _horaInicio = DateTime.Now.AddDays(1);

        [Test]
        public void ShouldCreateViagem()
        {
            var viagem = new Viagem(this._codigo, this._horaInicio, this._linha, this._percursoId);
        }

        [Test]
        public void ShouldNotCreateViagemWithInvalidHorario()
        {
            Assert.That(() => new Viagem(this._codigo, DateTime.MinValue, this._linha, this._percursoId),
                Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateViagemWithInvalidLinha()
        {
            Assert.That(() => new Viagem(this._codigo, this._horaInicio, null, this._percursoId),
                Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateViagemWithInvalidPercurso()
        {
            Assert.That(() => new Viagem(this._codigo, this._horaInicio, this._linha, null),
                Throws.TypeOf<BusinessRuleValidationException>());
        }
    }
}