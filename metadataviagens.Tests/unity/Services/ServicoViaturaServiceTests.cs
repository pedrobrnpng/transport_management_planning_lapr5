using NUnit.Framework;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Services.ServicosViatura;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using metadataviagens.Infrastructure.ServicosViatura;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Services.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosViagens;
using metadataviagens.Infrastructure.Viaturas;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Domain.Shared;
using metadataviagens.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace metadataviagens.Tests.Services
{
    public class ServicosViaturaIntegrationTests
    {
        private ServicoViaturaController _servicosViaturaController;
        private ServicoViaturaService _servicoViaturaService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IServicoViaturaRepository> _servicoViaturaRepositoryMock;
        private Mock<IBlocoTrabalhoRepository> _blocoTrabalhoRepository;
        private Mock<IViaturaRepository> _viaturaRepository;
        private Mock<IBlocoTrabalhoService> _blocoTrabalhoService;
        private Mock<IBlocoViagemRepository> _blocoViagemRepository;
        private CriarServicoViaturaDto _criarServicoViaturaDto;
        private ServicoViaturaDto _servicoViaturaDto;
        private ServicoViatura _servicoViatura;
        private ServicoViatura _servicoViaturaNull;
        private List<ServicoViatura> _list;
        private List<BlocoTrabalho> _listBlocos;

        [SetUp]
        public void Setup()
        {
            var listBloc = new List<int>(); listBloc.Add(1);
            this._listBlocos = new List<BlocoTrabalho>();
            var blocoTrabalho = new BlocoTrabalho(1,126, 129, "1", "3", true);
            blocoTrabalho.codigo=1;
            this._listBlocos.Add(blocoTrabalho);
            this._criarServicoViaturaDto = new CriarServicoViaturaDto("Teste", "RGB(10,10,10)", "isDepot", "12-13-GX", listBloc);
            this._servicoViaturaDto = new ServicoViaturaDto(new Guid(), "Teste", "RGB(10,10,10)", "isDepot", "12-13-GX", listBloc);
            var viat = new Viatura("12-13-GX", new TipoViaturaId("Teste"), "JH4DA9460P2008002", DateTime.Parse("12/12/2010"));
            this._servicoViatura = new ServicoViatura("Teste", new Cor("RGB(10,10,10)"), "isDepot", viat, this._listBlocos);
            this._list = new List<ServicoViatura>();
            _list.Add(this._servicoViatura);
            this._servicoViaturaNull = null;

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._servicoViaturaRepositoryMock = new Mock<IServicoViaturaRepository>();
            this._viaturaRepository = new Mock<IViaturaRepository>();
            this._blocoTrabalhoRepository = new Mock<IBlocoTrabalhoRepository>();
            this._blocoViagemRepository = new Mock<IBlocoViagemRepository>();
            this._blocoTrabalhoService = new Mock<IBlocoTrabalhoService>();

            this._servicoViaturaRepositoryMock.Setup(t => t.AddAsync(It.IsAny<ServicoViatura>()));
            this._servicoViaturaRepositoryMock.Setup(t => t.GetByDomainIdAsync("1")).Returns(Task.FromResult(this._servicoViatura));
            this._servicoViaturaRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.Is<string>(x => !x.Equals("1")))).Returns(Task.FromResult(this._servicoViaturaNull));
            this._servicoViaturaRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));
            this._viaturaRepository.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>())).Returns(Task.FromResult(viat));
            this._blocoTrabalhoRepository.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>())).Returns(Task.FromResult(blocoTrabalho));
            this._blocoTrabalhoService.Setup(t => t.EndsInPontoRendicao(It.IsAny<BlocoTrabalho>())).Returns(Task.FromResult(false));
            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._servicoViaturaService = new ServicoViaturaService(this._unitOfWorkMock.Object,
            this._servicoViaturaRepositoryMock.Object, this._viaturaRepository.Object, this._blocoTrabalhoRepository.Object, this._blocoViagemRepository.Object, this._blocoTrabalhoService.Object);
        }

        [Test]
        public void ShouldCreateServicoViatura()
        {
            var result = this._servicoViaturaService.AddAsync(this._criarServicoViaturaDto);

            this._servicoViaturaRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            this._servicoViaturaRepositoryMock.Verify(t => t.AddAsync(It.IsAny<ServicoViatura>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._servicoViaturaDto.nome, result.Result.nome);
            Assert.AreEqual(this._servicoViaturaDto.cor, result.Result.cor);
            Assert.AreEqual(this._servicoViaturaDto.depots, result.Result.depots);
            Assert.AreEqual(this._servicoViaturaDto.viatura, result.Result.viatura);
            Assert.AreEqual(this._servicoViaturaDto.blocos, result.Result.blocos);
        }

        [Test]
        public void ShouldGetByDomainId()
        {
            var result = this._servicoViaturaService.GetByDomainIdAsync("1");

            this._servicoViaturaRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._servicoViaturaDto.nome, result.Result.nome);
            Assert.AreEqual(this._servicoViaturaDto.cor, result.Result.cor);
            Assert.AreEqual(this._servicoViaturaDto.depots, result.Result.depots);
            Assert.AreEqual(this._servicoViaturaDto.viatura, result.Result.viatura);
            Assert.AreEqual(this._servicoViaturaDto.blocos, result.Result.blocos);
        }
    }
}