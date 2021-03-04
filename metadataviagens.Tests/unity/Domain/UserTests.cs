using NUnit.Framework;
using metadataviagens.Domain.Users;
using System;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Shared;
using System.Collections.Generic;

namespace metadataviagens.Tests.Domain
{
    [TestFixture]
    public class UsersTests
    {
        private string _nome = "Teste";
        private string _email = "teste@teste.teste";
        private string _password = "password123";
        private int _func = 1;

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void ShouldCreateUser()
        {
            var user = new User(this._nome,this._email,this._password,this._func);
        }

        [Test]
        public void ShouldNotCreateUserWithNullNome()
        {
            Assert.That(() => new User(null,this._email,this._password,this._func),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateUserWithNullEmail()
        {
            Assert.That(() =>  new User(this._nome,null,this._password,this._func),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateUserWithNullPassword()
        {
            Assert.That(() =>  new User(this._nome,this._email,null,this._func),
            Throws.TypeOf<BusinessRuleValidationException>());
        }

        [Test]
        public void ShouldNotCreateUserWithInvalidFunction()
        {
            Assert.That(() =>  new User(this._nome,this._email,this._password,4),
            Throws.TypeOf<BusinessRuleValidationException>());
            Assert.That(() =>  new User(this._nome,this._email,this._password,0),
            Throws.TypeOf<BusinessRuleValidationException>());
        }
    }
}
