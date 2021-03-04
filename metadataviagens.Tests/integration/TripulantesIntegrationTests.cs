using NUnit.Framework;
using metadataviagens.Domain.Tripulantes;
using metadataviagens.Services.Tripulantes;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using metadataviagens.Services.TiposTripulante;
using metadataviagens.Infrastructure.Tripulantes;
using metadataviagens.Controllers;
using Microsoft.AspNetCore.Mvc;


namespace metadataviagens.Tests.integration
{
    public class TripulantesIntegrationTests
    {
        private TripulantesController _tripulantesController;
        private TripulanteService _tripulanteService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<ITripulanteRepository> _tripulanteRepositoryMock;
        private Mock<ITipoTripulanteService> _tipoTripulanteServiceMock;
        private CriarTripulanteDto _criarTripulanteDto;
        private TripulanteDto _tripulanteDto;
        private Tripulante _tripulante;
        private List<Tripulante> _list;

        [SetUp]
        public void Setup()
        {
            this._criarTripulanteDto = new CriarTripulanteDto(123123123, "Teste", DateTime.Parse("12/12/1975"), 12312312, 123123123,
           "diurno", "1", DateTime.Parse("12/12/2005"), DateTime.Parse("12/12/2010"));
            this._tripulanteDto = new TripulanteDto(new Guid(), 123123123, "Teste", DateTime.Parse("12/12/1975"), 12312312, 123123123,
            "diurno", "1", DateTime.Parse("12/12/2005"), DateTime.Parse("12/12/2010"));
            this._tripulante = new Tripulante(123123123, "Teste", DateTime.Parse("12/12/1975"), 12312312, 123123123,
            new Turno("diurno"), new TipoTripulanteId("1"), DateTime.Parse("12/12/2005"), DateTime.Parse("12/12/2010"));
            this._list = new List<Tripulante>();
            _list.Add(this._tripulante);


            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._tripulanteRepositoryMock = new Mock<ITripulanteRepository>();
            this._tipoTripulanteServiceMock = new Mock<ITipoTripulanteService>();

            this._tipoTripulanteServiceMock.Setup(tp => tp.ifExists(It.IsAny<string>())).Returns(Task.FromResult(true));

            this._tripulanteRepositoryMock.Setup(t => t.AddAsync(It.IsAny<Tripulante>()));
            this._tripulanteRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>())).Returns(Task.FromResult(this._tripulante));
            this._tripulanteRepositoryMock.Setup(t => t.GetByNif(It.IsAny<int>())).Returns(Task.FromResult(this._tripulante));
            this._tripulanteRepositoryMock.Setup(t => t.GetByNumeroCartaoCidadaoAsync(It.IsAny<int>())).Returns(Task.FromResult(this._tripulante));
            this._tripulanteRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));

            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._tripulanteService = new TripulanteService(this._unitOfWorkMock.Object,
                this._tripulanteRepositoryMock.Object, this._tipoTripulanteServiceMock.Object);
            this._tripulantesController = new TripulantesController(this._tripulanteService);
        }

        [Test]
        public void ShouldCreateTripulante()
        {
            var result = this._tripulantesController.Create(this._criarTripulanteDto);
            this._tripulanteRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Tripulante>()), Times.AtLeastOnce());
            this._tipoTripulanteServiceMock.Verify(tp => tp.ifExists(It.IsAny<string>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<TripulanteDto>>>(result);
        }

        [Test]
        public void ShouldGetByDomainId()
        {
            var result = this._tripulantesController.GetGetByDomainId(1);
            this._tripulanteRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<TripulanteDto>>>(result);
        }

        [Test]
        public void ShouldGetByNif()
        {
            var result = this._tripulantesController.GetGetByNif(1);
            this._tripulanteRepositoryMock.Verify(t => t.GetByNif(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<TripulanteDto>>>(result);
        }

        [Test]
        public void ShouldGetByNumeroCartaoCidadao()
        {
            var result = this._tripulantesController.GetGetByNumeroCartaoCidadao(1);
            this._tripulanteRepositoryMock.Verify(t => t.GetByNumeroCartaoCidadaoAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<TripulanteDto>>>(result);
        }

        [Test]
        public void ShouldGetAll()
        {
            var result = this._tripulantesController.GetGetAll(1);
            this._tripulanteRepositoryMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<List<TripulanteDto>>>>(result);
        }
    }
}