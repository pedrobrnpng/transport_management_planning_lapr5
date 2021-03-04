using NUnit.Framework;
using metadataviagens.Controllers;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Services.BlocosTrabalho;
using metadataviagens.Services.BlocosViagens;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace metadataviagens.Tests.unity.Controllers
{
    [TestFixture]
    public class BlocoTrabalhoControllerTests
    {
        private BlocoTrabalhoController _blocoTrabalhoController;
        private Mock<IBlocoTrabalhoService> _blocoTrabalhoServiceMock;
        private CriarBlocoTrabalhoDto _criarBlocoTrabalhoDto;
        private BlocoTrabalhoDto _blocoTrabalhoDtoMock;
        private List<BlocoTrabalhoDto> _blocoTrabalhoDtoMockList;
        private Mock<IBlocoViagemService> _blocoViagemServiceMock;
        
        [SetUp]
        public void Setup()
        {
            this._blocoTrabalhoServiceMock = new Mock<IBlocoTrabalhoService>();
            this._blocoViagemServiceMock = new Mock<IBlocoViagemService>();
            this._criarBlocoTrabalhoDto = new CriarBlocoTrabalhoDto(1, 126, 129, "1", "3", true);
            this._blocoTrabalhoDtoMock = new BlocoTrabalhoDto(new Guid(), 1, 126, 129, "1", "3", true);
            this._blocoTrabalhoServiceMock.Setup(t => t.AddAsync(It.IsAny<CriarBlocoTrabalhoDto>()))
            .Returns(Task.FromResult(this._blocoTrabalhoDtoMock));
            this._blocoTrabalhoServiceMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>()))
            .Returns(Task.FromResult(this._blocoTrabalhoDtoMock));
            this._blocoTrabalhoDtoMockList = new List<BlocoTrabalhoDto>();
            this._blocoTrabalhoDtoMockList.Add(this._blocoTrabalhoDtoMock);
            this._blocoTrabalhoServiceMock.Setup(t => t.GetAllAsync())
            .Returns(Task.FromResult(this._blocoTrabalhoDtoMockList));
            this._blocoTrabalhoController = new BlocoTrabalhoController(this._blocoTrabalhoServiceMock.Object, this._blocoViagemServiceMock.Object);
        }

        [Test]
        public void ShouldCreateBlocoTrabalho()
        {
            var result = this._blocoTrabalhoController.Create(this._criarBlocoTrabalhoDto);
            this._blocoTrabalhoServiceMock.Verify(t => t.AddAsync(It.IsAny<CriarBlocoTrabalhoDto>()), Times.AtLeastOnce());
            result = this._blocoTrabalhoController.GetByDomainId(1);
            this._blocoTrabalhoServiceMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._blocoTrabalhoDtoMock, (result.Result).Value);
        }

        [Test]
        public void ShouldGetBlocoTrabalhoByCodigo()
        {
            var result = this._blocoTrabalhoController.GetByDomainId(1);
            this._blocoTrabalhoServiceMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._blocoTrabalhoDtoMock, (result.Result).Value);
        }

        [Test]
        public void ShouldGetAll()
        {
            var result = this._blocoTrabalhoController.GetAll();
            this._blocoTrabalhoServiceMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._blocoTrabalhoDtoMockList, (result.Result).Value);
        }
    }
}