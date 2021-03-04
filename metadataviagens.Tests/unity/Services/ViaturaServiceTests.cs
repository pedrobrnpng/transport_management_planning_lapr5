using NUnit.Framework;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Services.Viaturas;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using metadataviagens.Services.TiposViatura;
using metadataviagens.Infrastructure.Viaturas;

namespace metadataviagens.Tests.Services
{
    public class ViaturaServiceTests
    {
        private ViaturaService _viaturaService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IViaturaRepository> _viaturaRepositoryMock;
        private Mock<ITipoViaturaService> _tipoViaturaServiceMock;
        private CriarViaturaDto _criarViaturaDto;
        private ViaturaDto _viaturaDto;
        private Viatura _viatura;
        private List<Viatura> _list;

        [SetUp]
        public void Setup()
        {
            this._criarViaturaDto = new CriarViaturaDto("AA-BF-42", "11111111111111111111", "11111111111111111", DateTime.Parse("12/12/2019"));
            this._viaturaDto = new ViaturaDto(new Guid(), "AA-BF-42", "11111111111111111111", "11111111111111111", DateTime.Parse("12/12/2019"));
            this._viatura = new Viatura("AA-BF-42", new TipoViaturaId("11111111111111111111"), "11111111111111111", DateTime.Parse("12/12/2019"));
            this._list = new List<Viatura>();
            _list.Add(this._viatura);

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._viaturaRepositoryMock = new Mock<IViaturaRepository>();
            this._tipoViaturaServiceMock = new Mock<ITipoViaturaService>();

            this._tipoViaturaServiceMock.Setup(tp => tp.ifExists(It.IsAny<string>())).Returns(Task.FromResult(true));

            this._viaturaRepositoryMock.Setup(t => t.AddAsync(It.IsAny<Viatura>()));
            this._viaturaRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>())).Returns(Task.FromResult(this._viatura));
            this._viaturaRepositoryMock.Setup(t => t.GetByVINAsync(It.IsAny<string>())).Returns(Task.FromResult(this._viatura));
            this._viaturaRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));

            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._viaturaService = new ViaturaService(this._unitOfWorkMock.Object, this._viaturaRepositoryMock.Object, this._tipoViaturaServiceMock.Object);
        }

        [Test]
        public void ShouldCreateViatura()
        {
            var result = this._viaturaService.AddAsync(this._criarViaturaDto);

            this._viaturaRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Viatura>()), Times.AtLeastOnce());
            this._tipoViaturaServiceMock.Verify(tp => tp.ifExists(It.IsAny<string>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._viaturaDto.matricula, result.Result.matricula);
            Assert.AreEqual(this._viaturaDto.vin, result.Result.vin);
            Assert.AreEqual(this._viaturaDto.tipoViaturaId, result.Result.tipoViaturaId);
            Assert.AreEqual(this._viaturaDto.dataEntrada, result.Result.dataEntrada);
        }

        [Test]
        public void ShouldGetByDomainId()
        {
            var result = this._viaturaService.GetByDomainIdAsync("AA-BF-42");

            this._viaturaRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._viaturaDto.matricula, result.Result.matricula);
            Assert.AreEqual(this._viaturaDto.vin, result.Result.vin);
            Assert.AreEqual(this._viaturaDto.tipoViaturaId, result.Result.tipoViaturaId);
            Assert.AreEqual(this._viaturaDto.dataEntrada, result.Result.dataEntrada);
        }

        [Test]
        public void ShouldGetByVin()
        {
            var result = this._viaturaService.GetByDomainIdAsync("11111111111111111");

            this._viaturaRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._viaturaDto.matricula, result.Result.matricula);
            Assert.AreEqual(this._viaturaDto.vin, result.Result.vin);
            Assert.AreEqual(this._viaturaDto.tipoViaturaId, result.Result.tipoViaturaId);
            Assert.AreEqual(this._viaturaDto.dataEntrada, result.Result.dataEntrada);
        }

        [Test]
        public void ShouldGetAll()
        {
            var result = this._viaturaService.GetAllAsync();

            this._viaturaRepositoryMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._viaturaDto.matricula, result.Result[0].matricula);
            Assert.AreEqual(this._viaturaDto.vin, result.Result[0].vin);
            Assert.AreEqual(this._viaturaDto.tipoViaturaId, result.Result[0].tipoViaturaId);
            Assert.AreEqual(this._viaturaDto.dataEntrada, result.Result[0].dataEntrada);
        }

    }
}