using NUnit.Framework;
using metadataviagens.Domain.ServicosTripulante;
using metadataviagens.Domain.Tripulantes;
using System;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Shared;
using System.Collections.Generic;
using metadataviagens.Domain.BlocosTrabalho;


namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class ServicoTripulanteTests
    {
        private Tripulante _tripulante = new Tripulante(123123123,"José Silva", DateTime.Parse("12/12/1998"),
           12312312, 123123123, new Turno("diurno"), new TipoTripulanteId("12"),DateTime.Parse("12/12/2005"), 
           DateTime.Parse("12/12/2012"));
        private string _nome = "ct1";
        private Cor _cor= new Cor("RGB(10,10,10)");
        private List<BlocoTrabalho> _list = new List<BlocoTrabalho>();

        [SetUp]
        public void Setup()
        {
            var blocoTrabalho = new BlocoTrabalho(1,123,126,"1","2",true);
            this._list.Add(blocoTrabalho);
        }

        [Test]
        public void ShouldCreateServicoTripulante()
        {
            var tripulante = new ServicoTripulante(this._tripulante, this._nome,this._cor,this._list);
        }

        [Test]
        public void ShouldNotCreateServicoTripulanteWithNullNome()
        {
            Assert.That(() => new ServicoTripulante(this._tripulante, null,this._cor,this._list),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithNullTripulante()
        {
            Assert.That(() =>  new ServicoTripulante(null, this._nome,this._cor,this._list),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithNullCor()
        {
            Assert.That(() =>  new ServicoTripulante(this._tripulante, this._nome,null,this._list),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateTripulanteWithBadBlocosTrabalho()
        {
            var l = new List<BlocoTrabalho>();
            var blocoTrabalho = new BlocoTrabalho(1,123,126,"1","2",true);
            l.Add(blocoTrabalho);
            var blocoTrabalho2 = new BlocoTrabalho(1,125,126,"1","2",true);
            l.Add(blocoTrabalho2);
            Assert.That(() =>  new ServicoTripulante(this._tripulante, this._nome,this._cor,l),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

    }
}
