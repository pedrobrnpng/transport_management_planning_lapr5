using NUnit.Framework;
using metadataviagens.Domain.ServicosTripulante;
using metadataviagens.Services.ServicosTripulante;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using metadataviagens.Infrastructure.ServicosTripulante;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosViagens;
using metadataviagens.Domain.BlocosViagens;
using metadataviagens.Domain.Viagens;
using metadataviagens.Infrastructure.Tripulantes;
using metadataviagens.Domain.Tripulantes;
using metadataviagens.Domain.Shared;
using metadataviagens.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace metadataviagens.Tests.integration
{
    public class ServicosTripulanteIntegrationTests
    {
        private ServicosTripulanteController _servicosTripulanteController;
        private ServicoTripulanteService _servicoTripulanteService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IServicoTripulanteRepository> _servicoTripulanteRepositoryMock;
        private Mock<IBlocoTrabalhoRepository> _blocoTrabalhoRepository;
        private Mock<IBlocoViagemRepository> _blocoViagemRepository;
        private Mock<ITripulanteRepository> _tripulanteRepository;
        private CriarServicoTripulanteDto _criarServicoTripulanteDto;
        private ServicoTripulanteDto _servicoTripulanteDto;
        private ServicoTripulante _servicoTripulante;
        private ServicoTripulante _servicoTripulanteNull;
        private List<ServicoTripulante> _list;
        private List<BlocoTrabalho> _listBlocos;
        private List<BlocoViagem> _listBlocosViagens;

        [SetUp]
        public void Setup()
        {
            var listBloc = new List<int>(); listBloc.Add(1);
            this._listBlocos = new List<BlocoTrabalho>();
            this._listBlocosViagens = new List<BlocoViagem>();
            var blocoTrabalho = new BlocoTrabalho(1, 126, 129, "1", "3", true);
            var blocoViagem = new BlocoViagem(blocoTrabalho, new Viagem(1, new DateTime(2030,10,10), new LinhaId("1"), new PercursoId("1")));
            this._listBlocos.Add(blocoTrabalho);
            this._listBlocosViagens.Add(blocoViagem);
            this._criarServicoTripulanteDto = new CriarServicoTripulanteDto("123123123", "Teste", "RGB(10,10,10)", listBloc);
            this._servicoTripulanteDto = new ServicoTripulanteDto(new Guid(), "123123123", "Teste", "RGB(10,10,10)", listBloc);
            var trip = new Tripulante(123123123, "Teste", DateTime.Parse("12/12/1975"), 12312312, 123123123,
            new Turno("diurno"), new TipoTripulanteId("1"), DateTime.Parse("12/12/2005"), DateTime.Parse("12/12/2010"));
            this._servicoTripulante = new ServicoTripulante(trip, "Teste", new Cor("RGB(10,10,10)"), this._listBlocos);
            this._list = new List<ServicoTripulante>();
            _list.Add(this._servicoTripulante);
            this._servicoTripulanteNull = null;

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._servicoTripulanteRepositoryMock = new Mock<IServicoTripulanteRepository>();
            this._tripulanteRepository = new Mock<ITripulanteRepository>();
            this._blocoTrabalhoRepository = new Mock<IBlocoTrabalhoRepository>();
            this._blocoViagemRepository = new Mock<IBlocoViagemRepository>();

            this._servicoTripulanteRepositoryMock.Setup(t => t.AddAsync(It.IsAny<ServicoTripulante>()));
            this._servicoTripulanteRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>())).Returns(Task.FromResult(this._servicoTripulanteNull));
            this._servicoTripulanteRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));
            this._tripulanteRepository.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>())).Returns(Task.FromResult(trip));
            this._blocoTrabalhoRepository.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>())).Returns(Task.FromResult(blocoTrabalho));
            this._blocoViagemRepository.Setup(t => t.GetViagensOfBlocoAsync(It.IsAny<int>())).Returns(Task.FromResult(this._listBlocosViagens));
            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._servicoTripulanteService = new ServicoTripulanteService(this._unitOfWorkMock.Object,
                this._servicoTripulanteRepositoryMock.Object, _tripulanteRepository.Object, _blocoTrabalhoRepository.Object,
                _blocoViagemRepository.Object);
            this._servicosTripulanteController = new ServicosTripulanteController(this._servicoTripulanteService);
        }

        [Test]
        public void ShouldCreateServicoTripulante()
        {
            var result = this._servicosTripulanteController.Create(this._criarServicoTripulanteDto);

            this._servicoTripulanteRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            this._servicoTripulanteRepositoryMock.Verify(t => t.AddAsync(It.IsAny<ServicoTripulante>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
              Assert.IsInstanceOf<Task<ActionResult<ServicoTripulanteDto>>>(result);
        }

    }
}