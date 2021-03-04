using NUnit.Framework;
using metadataviagens.Controllers;
using metadataviagens.Domain.ServicosTripulante;
using metadataviagens.Services.ServicosTripulante;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;



namespace metadataviagens.Tests.Controllers
{
    [TestFixture]
    public class ServicosServicoTripulanteControllerTests
    {
        private ServicosTripulanteController _servicoTripulantesController;
        private Mock<IServicosTripulanteService> _servicoTripulanteServiceMock;
        private CriarServicoTripulanteDto _criarServicoTripulanteDto;
        private ServicoTripulanteDto _servicoTripulanteDto;
        private List<ServicoTripulanteDto> _servicoTripulanteDtoList;
        [SetUp]
        public void Setup()
        {
            this._servicoTripulanteServiceMock = new Mock<IServicosTripulanteService>();
            this._criarServicoTripulanteDto = new CriarServicoTripulanteDto("1", "Teste", "RGB(10,10,10)", new List<int>());
            this._servicoTripulanteDto = new ServicoTripulanteDto(new Guid(), "1", "Teste", "RGB(10,10,10)", new List<int>());
            this._servicoTripulanteDtoList = new List<ServicoTripulanteDto>();
            this._servicoTripulanteDtoList.Add(this._servicoTripulanteDto);

            this._servicoTripulanteServiceMock.Setup(t => t.AddAsync(It.IsAny<CriarServicoTripulanteDto>()))
            .Returns(Task.FromResult(this._servicoTripulanteDto));
            this._servicoTripulanteServiceMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>()))
            .Returns(Task.FromResult(this._servicoTripulanteDto));

            this._servicoTripulantesController = new ServicosTripulanteController(this._servicoTripulanteServiceMock.Object);
        }

        [Test]
        public void ShouldCreateServicoTripulante()
        {
            var result = this._servicoTripulantesController.Create(this._criarServicoTripulanteDto);
            this._servicoTripulanteServiceMock.Verify(t => t.AddAsync(It.IsAny<CriarServicoTripulanteDto>()), Times.AtLeastOnce());
            result = this._servicoTripulantesController.GetGetByDomainId("1");
            this._servicoTripulanteServiceMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._servicoTripulanteDto, (result.Result).Value);
        }

    }
}
