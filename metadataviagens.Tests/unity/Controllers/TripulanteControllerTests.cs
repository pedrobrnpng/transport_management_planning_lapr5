using NUnit.Framework;
using metadataviagens.Controllers;
using metadataviagens.Domain.Tripulantes;
using metadataviagens.Services.Tripulantes;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;



namespace metadataviagens.Tests.Controllers
{
    [TestFixture]
    public class TripulanteControllerTests
    {
        private TripulantesController _tripulantesController;
        private Mock<ITripulanteService> _tripulanteServiceMock;
        private CriarTripulanteDto _criarTripulanteDto;
        private TripulanteDto _tripulanteDtoMock;
        private List<TripulanteDto> _tripulanteDtoMockList;
        [SetUp]
        public void Setup()
        {
            this._tripulanteServiceMock = new Mock<ITripulanteService>();
            this._criarTripulanteDto = new CriarTripulanteDto(123123123, "Teste", DateTime.Parse("12/12/1975"), 12312312, 123123123,
            "diurno", "1", DateTime.Parse("12/12/2005"), DateTime.Parse("12/12/2010"));
            this._tripulanteDtoMock = new TripulanteDto(new Guid(), 123123123, "Teste", DateTime.Parse("12/12/1975"), 12312312, 123123123,
            "diurno", "1", DateTime.Parse("12/12/2005"), DateTime.Parse("12/12/2010"));
            this._tripulanteServiceMock.Setup(t => t.AddAsync(It.IsAny<CriarTripulanteDto>()))
            .Returns(Task.FromResult(this._tripulanteDtoMock));
            this._tripulanteServiceMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>()))
            .Returns(Task.FromResult(this._tripulanteDtoMock));
            this._tripulanteServiceMock.Setup(t => t.GetByNifAsync(It.IsAny<int>()))
            .Returns(Task.FromResult(this._tripulanteDtoMock));
            this._tripulanteServiceMock.Setup(t => t.GetByNumeroCartaoCidadaoAsync(It.IsAny<int>()))
            .Returns(Task.FromResult(this._tripulanteDtoMock));
            this._tripulanteDtoMockList = new List<TripulanteDto>();
            this._tripulanteDtoMockList.Add(this._tripulanteDtoMock);
            this._tripulanteServiceMock.Setup(t => t.GetAllAsync())
            .Returns(Task.FromResult(this._tripulanteDtoMockList));
            this._tripulantesController = new TripulantesController(this._tripulanteServiceMock.Object);
        }

        [Test]
        public void ShouldCreateTripulante()
        {
            var result = this._tripulantesController.Create(this._criarTripulanteDto);
            this._tripulanteServiceMock.Verify(t => t.AddAsync(It.IsAny<CriarTripulanteDto>()), Times.AtLeastOnce());
            result = this._tripulantesController.GetGetByDomainId(1);
            this._tripulanteServiceMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDtoMock, (result.Result).Value);
        }

        [Test]
        public void ShouldGetTripulanteByNif()
        {
            var result = this._tripulantesController.GetGetByNif(1);
            this._tripulanteServiceMock.Verify(t => t.GetByNifAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDtoMock, (result.Result).Value);
        }

        [Test]
        public void ShouldGettripulanteByNumeroCartaoCidadao()
        {
            var result = this._tripulantesController.GetGetByNumeroCartaoCidadao(1);
            this._tripulanteServiceMock.Verify(t => t.GetByNumeroCartaoCidadaoAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDtoMock, (result.Result).Value);
        }

        [Test]
        public void ShouldGetAll()
        {
            var result = this._tripulantesController.GetGetAll(1);
            this._tripulanteServiceMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDtoMockList, (result.Result).Value);
        }
    }
}
