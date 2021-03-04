using NUnit.Framework;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Domain.Viaturas;
using System;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Shared;
using System.Collections.Generic;
using metadataviagens.Domain.BlocosTrabalho;


namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class ServicoViaturaTests
    {
        private Viatura _viatura = new Viatura("11-11-AB", new TipoViaturaId("11111111111111111111"), "1G6AB5RX0E0174320", DateTime.Parse("12/12/2012"));
        private string _nome = "sv1";
        private Cor _cor= new Cor("RGB(10,10,10)");
        private List<BlocoTrabalho> _list = new List<BlocoTrabalho>();

        [SetUp]
        public void Setup()
        {
            var blocoTrabalho = new BlocoTrabalho(1,123,126,"1","2",true);
            this._list.Add(blocoTrabalho);
        }

        [Test]
        public void ShouldCreateServicoViatura()
        {
            var servicoViatura = new ServicoViatura(this._nome,this._cor,"teste",this._viatura,this._list);
        }

        [Test]
        public void ShouldNotCreateServicoViaturaWithNullNome()
        {
            Assert.That(() => new ServicoViatura(null,this._cor,"teste",this._viatura,this._list),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateServicoViaturaWithNullViatura()
        {
            Assert.That(() =>  new ServicoViatura(this._nome,this._cor,"teste",null,this._list),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateServicoViaturaWithNullCor()
        {
            Assert.That(() =>  new ServicoViatura(this._nome,null,"teste",this._viatura,this._list),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateServicoViaturaWithBadBlocosTrabalho()
        {
            var l = new List<BlocoTrabalho>();
            var blocoTrabalho = new BlocoTrabalho(1,123,126,"1","2",true);
            l.Add(blocoTrabalho);
            var blocoTrabalho2 = new BlocoTrabalho(1,125,126,"1","2",true);
            l.Add(blocoTrabalho2);
            Assert.That(() =>  new ServicoViatura(this._nome,this._cor,"teste",this._viatura,l),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

    }
}
