using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Domain.Viagens;
using metadataviagens.Infrastructure.Viagens;
using metadataviagens.Infrastructure.BlocosViagens;
using metadataviagens.Domain.BlocosViagens;
using metadataviagens.Mappers;
using metadataviagens.Mappers.BlocosTrabalho;
using System;
using System.Collections.Generic;

namespace metadataviagens.Services.BlocosViagens
{
    public class BlocoViagemService: IBlocoViagemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBlocoViagemRepository _repo;
        private readonly IBlocoTrabalhoRepository _blocRepo;
        private readonly IViagemRepository _viagRepo;

        public BlocoViagemService(IUnitOfWork unitOfWork, IBlocoViagemRepository repo, IBlocoTrabalhoRepository blocRepo, IViagemRepository viagRepo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._blocRepo = blocRepo;
            this._viagRepo = viagRepo;
        }

        public async Task<BlocoViagemDto> AddAsync(int codigo, CriarBlocoViagemDto dto)
        {
            var bloco = await this._blocRepo.GetByDomainIdAsync(codigo);
            var viagem = await this._viagRepo.GetByDomainIdAsync(dto.viagemId);

            var viagHoraInicio = viagem.horaInicioAsInt();

            if (!(bloco.horaInicio <= viagHoraInicio && bloco.horaFim > viagHoraInicio))
                return null;

            var blocoViagem = BlocoViagemMapper.toDomain(bloco,viagem);

            await this._repo.AddAsync(blocoViagem);

            await this._unitOfWork.CommitAsync();

            return BlocoViagemMapper.toDTO(blocoViagem);
        }

        public async Task<BlocoViagemDto> GetByIdAsync(BlocoViagemId id)
        {
            var blocoViagem = await this._repo.GetById1Async(id);

            if (blocoViagem == null)
                return null;

            return BlocoViagemMapper.toDTO(blocoViagem);
        }

        public async Task<ViagemListDto> GetViagensOfBlocoByIdAsync(int blocoId)
        {
            var blocosViagens = await this._repo.GetViagensOfBlocoAsync(blocoId);

            if (blocosViagens.Count==0) {
                return null;
            }

            var viagens = new List<int>();
            var i=0;
            for (i=0;i<blocosViagens.Count;i++) {
                var dto = BlocoViagemMapper.toDTO(blocosViagens[i]);
                viagens.Add(dto.viagemId);
            }

            return new ViagemListDto(viagens);
        }

        public async Task<ViagemListDto> GetPossibleViagensOfBlocoByIdAsync(int blocoId)
        {
            var blocoT = await this._blocRepo.GetByDomainIdAsync(blocoId);

            if (blocoT == null)
                return null;

            var blocoDto = BlocoTrabalhoMapper.toDTO(blocoT);
            var blocoHoraInicio = blocoDto.horaInicio;
            var blocoHoraFim = blocoDto.horaFim;

            var viagensList = await this._viagRepo.GetAllOrderedAsync();

            if (viagensList.Count==0) {
                return null;
            }

            var viagens = new List<int>();
            var i=0;
            for (i=0;i<viagensList.Count;i++) {
                var viagemHoraInicio = viagensList[i].horaInicioAsInt();
                if (viagemHoraInicio >= blocoHoraInicio && viagemHoraInicio < blocoHoraFim)
                    viagens.Add(viagensList[i].codigo);
            }

            return new ViagemListDto(viagens);
        }
    }
}