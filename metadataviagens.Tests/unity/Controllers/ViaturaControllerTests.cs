using NUnit.Framework;
using metadataviagens.Controllers;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Services.Viaturas;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace metadataviagens.Tests.unity.Controllers
{
    [TestFixture]
    public class ViaturaControllerTests
    {
        private ViaturasController _viaturaController;
        private Mock<IViaturaService> _viaturaServiceMock;
        private CriarViaturaDto _criarViaturaDto;
        private ViaturaDto _viaturaDtoMock;
        private List<ViaturaDto> _viaturaDtoList;

        [SetUp]
        public void Setup()
        {
            this._viaturaServiceMock = new Mock<IViaturaService>();
            this._criarViaturaDto = new CriarViaturaDto("AA-BF-42", "11111111111111111111", "11111111111111111", DateTime.Parse("12/12/2019"));
            this._viaturaDtoMock = new ViaturaDto(new Guid(), "AA-BF-42", "11111111111111111111", "11111111111111111", DateTime.Parse("12/12/2019"));
            this._viaturaServiceMock.Setup(t => t.AddAsync(It.IsAny<CriarViaturaDto>()))
                .Returns(Task.FromResult(this._viaturaDtoMock));
            this._viaturaServiceMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>()))
                .Returns(Task.FromResult(this._viaturaDtoMock));
            this._viaturaServiceMock.Setup(t => t.GetByVINAsync(It.IsAny<string>()))
                .Returns(Task.FromResult(this._viaturaDtoMock));
            this._viaturaDtoList = new List<ViaturaDto>();
            this._viaturaDtoList.Add(this._viaturaDtoMock);
            this._viaturaServiceMock.Setup(t => t.GetAllAsync())
                .Returns(Task.FromResult(this._viaturaDtoList));
            this._viaturaController = new ViaturasController(this._viaturaServiceMock.Object);
        }

        [Test]
        public void ShouldCreateViatura()
        {
            var result = this._viaturaController.Create(this._criarViaturaDto);
            this._viaturaServiceMock.Verify(t => t.AddAsync(It.IsAny<CriarViaturaDto>()), Times.AtLeastOnce());
            result = this._viaturaController.GetById("AA-BF-42");
            this._viaturaServiceMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._viaturaDtoMock, (result.Result).Value);
        }

        [Test]
        public void ShouldGetViaturaByVin()
        {
            var result = this._viaturaController.getByVin("11111111111111111");
            this._viaturaServiceMock.Verify(t => t.GetByVINAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._viaturaDtoMock, (result.Result).Value);
        }

        [Test]
        public void ShouldGetAll()
        {
            var result = this._viaturaController.GetAll();
            this._viaturaServiceMock.Verify(t => t.GetAllAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._viaturaDtoList, (result.Result).Value);
        }
    }
}