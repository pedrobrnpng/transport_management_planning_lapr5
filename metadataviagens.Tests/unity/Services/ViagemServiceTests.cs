using NUnit.Framework;
using metadataviagens.Domain.Viagens;
using metadataviagens.Services.Viagens;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using metadataviagens.Infrastructure.Viagens;

namespace metadataviagens.Tests.Services
{
    public class ViagemServiceTests
    {
        private ViagemService _viagemService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IViagemRepository> _viagemRepositoryMock;
        private Mock<IPercursoService> _percursoServiceMock;
        private Mock<ILinhaService> _linhaServiceMock;
        private CriarViagemDto _criarViagemDto;
        private ViagemDto _viagemDto;
        private Viagem _viagem;
        private Viagem _viagemNull;
        private List<Viagem> _list;

        [SetUp]
        public void Setup()
        {
            int codigo = 1;
            DateTime horaInicio = DateTime.Now.AddDays(1);
            PercursoDto percursoId = new PercursoDto("1", new List<SegmentoLinhaDto>(), "1");
            this._criarViagemDto = new CriarViagemDto(codigo, horaInicio, "1", "1");
            this._viagemDto = new ViagemDto(new Guid(), codigo, horaInicio, "1", "1");
            this._viagem = new Viagem(codigo, horaInicio, new LinhaId("1"), new PercursoId("1"));
            this._list = new List<Viagem>();
            _list.Add(this._viagem);
            this._viagemNull = null;

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._viagemRepositoryMock = new Mock<IViagemRepository>();
            this._percursoServiceMock = new Mock<IPercursoService>();
            this._linhaServiceMock = new Mock<ILinhaService>();

            this._viagemRepositoryMock.Setup(t => t.AddAsync(It.IsAny<Viagem>())).Returns(Task.FromResult(this._viagem));
            this._viagemRepositoryMock.Setup(t => t.GetByDomainIdAsync(2)).Returns(Task.FromResult(this._viagem));
            this._viagemRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.Is<int>(x => x!=2))).Returns(Task.FromResult(this._viagemNull));
            this._viagemRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));

            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._percursoServiceMock.Setup(p => p.ifExists(It.IsAny<string>())).Returns(Task.FromResult(percursoId));

            this._linhaServiceMock.Setup(p => p.ifExists(It.IsAny<string>())).Returns(Task.FromResult(true));


            this._viagemService = new ViagemService(this._unitOfWorkMock.Object, this._viagemRepositoryMock.Object, this._percursoServiceMock.Object, this._linhaServiceMock.Object);
        }

        [Test]
        public void ShouldCreateViagem()
        {
            var result = this._viagemService.AddAsync(this._criarViagemDto);

            this._viagemRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            this._viagemRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Viagem>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.AreEqual(this._viagemDto.codigo, result.Result.codigo);
            Assert.AreEqual(this._viagemDto.horaInicio, result.Result.horaInicio);
            Assert.AreEqual(this._viagemDto.idPercurso, result.Result.idPercurso);
            Assert.AreEqual(this._viagemDto.linha, result.Result.linha);
        }

        [Test]
        public void ShouldGetByDomainId()
        {
            var result = this._viagemService.GetByDomainIdAsync(2);

            this._viagemRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            Assert.AreEqual(this._viagemDto.codigo, result.Result.codigo);
            Assert.AreEqual(this._viagemDto.horaInicio, result.Result.horaInicio);
            Assert.AreEqual(this._viagemDto.idPercurso, result.Result.idPercurso);
            Assert.AreEqual(this._viagemDto.linha, result.Result.linha);
        }

    }
}