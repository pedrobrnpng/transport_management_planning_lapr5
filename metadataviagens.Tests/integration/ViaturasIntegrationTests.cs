using metadataviagens.Controllers;
using metadataviagens.Services.Viaturas;
using metadataviagens.Services.TiposViatura;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Moq;
using DDDSample1.Domain.Shared;

using Microsoft.AspNetCore.Mvc;
using metadataviagens.Domain.Viaturas;

namespace metadataviagens.Tests.integration
{
    public class ViaturasIntegrationTests
    {
        private ViaturasController _viaturasController;
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

            this._tipoViaturaServiceMock.Setup(tv => tv.ifExists(It.IsAny<string>())).Returns(Task.FromResult(true));

            this._viaturaRepositoryMock.Setup(t => t.AddAsync(It.IsAny<Viatura>()));
            this._viaturaRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>())).Returns(Task.FromResult(this._viatura));
            this._viaturaRepositoryMock.Setup(t => t.GetByVINAsync(It.IsAny<string>())).Returns(Task.FromResult(this._viatura));
            this._viaturaRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));

            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._viaturaService = new ViaturaService(this._unitOfWorkMock.Object,
                this._viaturaRepositoryMock.Object, this._tipoViaturaServiceMock.Object);
            this._viaturasController = new ViaturasController(this._viaturaService);
        }

        [Test]
        public void ShouldCreateViatura(){
            var result = this._viaturasController.Create(this._criarViaturaDto);
            this._viaturaRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Viatura>()), Times.AtLeastOnce());
            this._tipoViaturaServiceMock.Verify(tv => tv.ifExists(It.IsAny<string>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<ViaturaDto>>>(result);
        }

        [Test]
        public void ShouldGetByDomainId()
        {
            var result = this._viaturasController.GetById("AA-BF-42");
            this._viaturaRepositoryMock.Verify(v => v.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<ViaturaDto>>>(result);
        }

        [Test]
        public void ShouldGetByVin()
        {
            var result = this._viaturasController.getByVin("11111111111111111");
            this._viaturaRepositoryMock.Verify(v => v.GetByVINAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<ViaturaDto>>>(result);
        }

        [Test]
        public void ShouldGetAll()
        {
            var result = this._viaturasController.GetAll();
            this._viaturaRepositoryMock.Verify(v => v.GetAllAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<List<ViaturaDto>>>>(result);
        }
    }
}
