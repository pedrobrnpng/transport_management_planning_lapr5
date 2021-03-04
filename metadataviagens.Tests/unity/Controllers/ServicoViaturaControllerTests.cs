using NUnit.Framework;
using metadataviagens.Controllers;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Services.ServicosViatura;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace metadataviagens.Tests.unity.Controllers
{
    [TestFixture]
    public class ServicoViaturaControllerTests
    {
        private ServicoViaturaController _servicoViaturaController;
        private Mock<IServicoViaturaService> _servicoViaturaServiceMock;
        private CriarServicoViaturaDto _criarServicoViaturaDto;
        private ServicoViaturaDto _servicoViaturaDto;
        private List<ServicoViaturaDto> _servicoViaturaDtoList;
        
        [SetUp]
        public void Setup()
        {
            this._servicoViaturaServiceMock = new Mock<IServicoViaturaService>();
            this._criarServicoViaturaDto = new CriarServicoViaturaDto("Teste", "RGB(10,10,10)", "isDepot", "123123123", new List<int>());
            this._servicoViaturaDto = new ServicoViaturaDto(new Guid(), "Teste", "RGB(10,10,10)", "isDepot", "123123123", new List<int>());
            this._servicoViaturaDtoList = new List<ServicoViaturaDto>();
            this._servicoViaturaDtoList.Add(this._servicoViaturaDto);

            this._servicoViaturaServiceMock.Setup(t => t.AddAsync(It.IsAny<CriarServicoViaturaDto>()))
            .Returns(Task.FromResult(this._servicoViaturaDto));
            this._servicoViaturaServiceMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>()))
            .Returns(Task.FromResult(this._servicoViaturaDto));

            this._servicoViaturaController = new ServicoViaturaController(this._servicoViaturaServiceMock.Object);
        }

        [Test]
        public void ShouldCreateServicoViatura()
        {
            var result = this._servicoViaturaController.Create(this._criarServicoViaturaDto);
            this._servicoViaturaServiceMock.Verify(t => t.AddAsync(It.IsAny<CriarServicoViaturaDto>()), Times.AtLeastOnce());
            result = this._servicoViaturaController.GetByDomainId("Teste");
            this._servicoViaturaServiceMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._servicoViaturaDto, (result.Result).Value);
        }
    }
}