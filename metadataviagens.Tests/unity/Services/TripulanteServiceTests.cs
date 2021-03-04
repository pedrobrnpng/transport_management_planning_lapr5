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

namespace metadataviagens.Tests.Services
{
    public class TripulanteServiceTests
    {

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
            this._list= new List<Tripulante>();
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
        }

        [Test]
        public void ShouldCreateTripulante()
        {
            var result = this._tripulanteService.AddAsync(this._criarTripulanteDto);

            this._tripulanteRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Tripulante>()), Times.AtLeastOnce());
            this._tipoTripulanteServiceMock.Verify(tp => tp.ifExists(It.IsAny<string>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDto.numeroMecanografico, result.Result.numeroMecanografico);
            Assert.AreEqual(this._tripulanteDto.nif, result.Result.nif);
            Assert.AreEqual(this._tripulanteDto.numeroCartaoCidadao, result.Result.numeroCartaoCidadao);
            Assert.AreEqual(this._tripulanteDto.nome, result.Result.nome);
            Assert.AreEqual(this._tripulanteDto.tipoTripulanteId, result.Result.tipoTripulanteId);
            Assert.AreEqual(this._tripulanteDto.dataNascimento, result.Result.dataNascimento);
            Assert.AreEqual(this._tripulanteDto.dataEntrada, result.Result.dataEntrada);
            Assert.AreEqual(this._tripulanteDto.dataSaida, result.Result.dataSaida);
            Assert.AreEqual(this._tripulanteDto.turno, result.Result.turno);
        }

        [Test]
        public void ShouldGetByDomainId()
        {
            var result = this._tripulanteService.GetByDomainIdAsync(1);

            this._tripulanteRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDto.numeroMecanografico, result.Result.numeroMecanografico);
            Assert.AreEqual(this._tripulanteDto.nif, result.Result.nif);
            Assert.AreEqual(this._tripulanteDto.numeroCartaoCidadao, result.Result.numeroCartaoCidadao);
            Assert.AreEqual(this._tripulanteDto.nome, result.Result.nome);
            Assert.AreEqual(this._tripulanteDto.tipoTripulanteId, result.Result.tipoTripulanteId);
            Assert.AreEqual(this._tripulanteDto.dataNascimento, result.Result.dataNascimento);
            Assert.AreEqual(this._tripulanteDto.dataEntrada, result.Result.dataEntrada);
            Assert.AreEqual(this._tripulanteDto.dataSaida, result.Result.dataSaida);
            Assert.AreEqual(this._tripulanteDto.turno, result.Result.turno);
        }

        [Test]
        public void ShouldGetByNif()
        {
            var result = this._tripulanteService.GetByNifAsync(1);

            this._tripulanteRepositoryMock.Verify(t => t.GetByNif(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDto.numeroMecanografico, result.Result.numeroMecanografico);
            Assert.AreEqual(this._tripulanteDto.nif, result.Result.nif);
            Assert.AreEqual(this._tripulanteDto.numeroCartaoCidadao, result.Result.numeroCartaoCidadao);
            Assert.AreEqual(this._tripulanteDto.nome, result.Result.nome);
            Assert.AreEqual(this._tripulanteDto.tipoTripulanteId, result.Result.tipoTripulanteId);
            Assert.AreEqual(this._tripulanteDto.dataNascimento, result.Result.dataNascimento);
            Assert.AreEqual(this._tripulanteDto.dataEntrada, result.Result.dataEntrada);
            Assert.AreEqual(this._tripulanteDto.dataSaida, result.Result.dataSaida);
            Assert.AreEqual(this._tripulanteDto.turno, result.Result.turno);
        }

        [Test]
        public void ShouldGetByNumeroCartaoCidadao()
        {
            var result = this._tripulanteService.GetByNumeroCartaoCidadaoAsync(1);

            this._tripulanteRepositoryMock.Verify(t => t.GetByNumeroCartaoCidadaoAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDto.numeroMecanografico, result.Result.numeroMecanografico);
            Assert.AreEqual(this._tripulanteDto.nif, result.Result.nif);
            Assert.AreEqual(this._tripulanteDto.numeroCartaoCidadao, result.Result.numeroCartaoCidadao);
            Assert.AreEqual(this._tripulanteDto.nome, result.Result.nome);
            Assert.AreEqual(this._tripulanteDto.tipoTripulanteId, result.Result.tipoTripulanteId);
            Assert.AreEqual(this._tripulanteDto.dataNascimento, result.Result.dataNascimento);
            Assert.AreEqual(this._tripulanteDto.dataEntrada, result.Result.dataEntrada);
            Assert.AreEqual(this._tripulanteDto.dataSaida, result.Result.dataSaida);
            Assert.AreEqual(this._tripulanteDto.turno, result.Result.turno);
        }

        [Test]
        public void ShouldGetAll()
        {
            var result = this._tripulanteService.GetAllAsync();

            this._tripulanteRepositoryMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._tripulanteDto.numeroMecanografico, result.Result[0].numeroMecanografico);
            Assert.AreEqual(this._tripulanteDto.nif, result.Result[0].nif);
            Assert.AreEqual(this._tripulanteDto.numeroCartaoCidadao, result.Result[0].numeroCartaoCidadao);
            Assert.AreEqual(this._tripulanteDto.nome, result.Result[0].nome);
            Assert.AreEqual(this._tripulanteDto.tipoTripulanteId, result.Result[0].tipoTripulanteId);
            Assert.AreEqual(this._tripulanteDto.dataNascimento, result.Result[0].dataNascimento);
            Assert.AreEqual(this._tripulanteDto.dataEntrada, result.Result[0].dataEntrada);
            Assert.AreEqual(this._tripulanteDto.dataSaida, result.Result[0].dataSaida);
            Assert.AreEqual(this._tripulanteDto.turno, result.Result[0].turno);
        }

    }
}