using NUnit.Framework;
using metadataviagens.Domain.BlocosTrabalho;
using System;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Shared;
using System.Collections.Generic;

namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class BlocosTrabalhoTests
    {
        private int _codigo = 1;
        private int _horaInicio = 1;
        private int _horaFim = 2;
        private string _noInicio = "No1";
        private string _noFim = "No2";
        private bool _ctt = true; 

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void ShouldCreateBlocoTrabalho()
        {
            var blocoTrabalho = new BlocoTrabalho(this._codigo, this._horaInicio,this._horaFim,this._noInicio,this._noFim,this._ctt);
        }

        [Test]
        public void ShouldNotCreateBlocoTrabalhoWithNullNos()
        {
            Assert.That(() =>  new BlocoTrabalho(this._codigo, this._horaInicio,this._horaFim,null,this._noFim,this._ctt),
            Throws.TypeOf<BusinessRuleValidationException>());
            Assert.That(() =>  new BlocoTrabalho(this._codigo, this._horaInicio,this._horaFim,this._noInicio,null,this._ctt),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateBlocoTrabalhoWithInvalidHoras()
        {
            Assert.That(() =>  new BlocoTrabalho(this._codigo,-1,this._horaFim,this._noInicio,this._noFim,this._ctt),
            Throws.TypeOf<BusinessRuleValidationException>());
            Assert.That(() =>  new BlocoTrabalho(this._codigo,this._horaInicio,-1,this._noInicio,this._noFim,this._ctt),
            Throws.TypeOf<BusinessRuleValidationException>());
            Assert.That(() =>  new BlocoTrabalho(this._codigo,this._horaInicio,86400,this._noInicio,this._noFim,this._ctt),
            Throws.TypeOf<BusinessRuleValidationException>());
            Assert.That(() =>  new BlocoTrabalho(this._codigo,this._horaFim,this._horaInicio,this._noInicio,this._noFim,this._ctt),
            Throws.TypeOf<BusinessRuleValidationException>());
        }
    }
}
