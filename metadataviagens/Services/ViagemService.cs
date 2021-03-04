using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Viagens;
using metadataviagens.Mappers.Viagens;
using metadataviagens.Infrastructure.Viagens;
using metadataviagens.Shared;

namespace metadataviagens.Services.Viagens
{
    public class ViagemService : IViagemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IViagemRepository _repo;

        private readonly IPercursoService _percursoService;

        private readonly ILinhaService _linhaService;

        public ViagemService(IUnitOfWork unitOfWork, IViagemRepository repo, IPercursoService percursoService, ILinhaService linhaService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._percursoService = percursoService;
            this._linhaService = linhaService;
        }

        public async Task<ViagemDto> AddAsync(CriarViagemDto dto)
        {
            if (await _percursoService.ifExists(dto.idPercurso) is null)
            {
                return null;
            }
            if (!await _linhaService.ifExists(dto.linha)){
                return null;
            }

            var viagem_cod = await this._repo.GetByDomainIdAsync(dto.codigo);
            if (viagem_cod != null)
                return null;

            var viagem = ViagemMapper.toDomain(dto);

            viagem = await this._repo.AddAsync(viagem);
            
            await this._unitOfWork.CommitAsync();

            return ViagemMapper.toDTO(viagem);
        }

        public async Task<ViagemDto> AddAsync(CriarViagemSemCodigoDto dto)
        {
            int codigo = await this._repo.GetLastAsync();

            if (await _percursoService.ifExists(dto.idPercurso) is null)
            {
                return null;
            }
            if (!await _linhaService.ifExists(dto.linha)){
                return null;
            }

            var viagemDto = new CriarViagemDto(codigo+1, dto.horaInicio, dto.linha, dto.idPercurso);

            var viagem = ViagemMapper.toDomain(viagemDto);

            viagem = await this._repo.AddAsync(viagem);

            await this._unitOfWork.CommitAsync();

            return ViagemMapper.toDTO(viagem);
        }

        public async Task<ViagemDto[]> AddAsync(CriarViagensDto dto)
        {
            PercursoDto percursoIda = await _percursoService.ifExists(dto.idPercursoIda);
            PercursoDto percursoVolta = await _percursoService.ifExists(dto.idPercursoVolta);
            DateTime horaInicio = dto.horaInicio;
            Viagem[] viagens = new Viagem[dto.nViagens];
            ViagemDto[] viagensDto = new ViagemDto[dto.nViagens];
            int tempoViagem = 0;

            foreach (SegmentoLinhaDto segmento in percursoIda.segmentosRede)
            {
                tempoViagem += Tempo.convertToMinutes(segmento.tempoViagem.value, segmento.tempoViagem.unidadeTempo);
            }

            if (percursoIda is null)
            {
                throw new System.Exception("percurso de ida inválido");
            }
            if (percursoVolta is null)
            {
                throw new System.Exception("percurso de volta inválido");
            }

            int codigo = await this._repo.GetLastAsync();
            
            for (var i = 0; i < dto.nViagens; i++)
            {
                Viagem viagemIda = new Viagem(++codigo, horaInicio, new LinhaId(percursoIda.idLinha), new PercursoId(percursoIda.id));
                viagemIda = await this._repo.AddAsync(viagemIda);
                viagens[i] = viagemIda;
                
                DateTime horaFim = horaInicio.AddMinutes(tempoViagem + 5);
                Viagem viagemVolta = new Viagem(++codigo, horaFim, new LinhaId(percursoVolta.idLinha), new PercursoId(percursoVolta.id));
                viagemVolta = await this._repo.AddAsync(viagemVolta);
                viagens[i] = viagemVolta;

                horaInicio = horaInicio.AddMinutes(dto.frequencia);
            }

            await this._unitOfWork.CommitAsync();

            for (var i = 0; i < viagens.Length; i++)
            {
                viagensDto[i] = ViagemMapper.toDTO(viagens[i]);
            }

            return viagensDto;
        }

        public async Task<ViagemDto> GetByDomainIdAsync(int id)
        {
            var viagem = await this._repo.GetByDomainIdAsync(id);

            if (viagem == null)
                return null;

            return ViagemMapper.toDTO(viagem);
        }

        public async Task<List<ViagemDto>> GetAllAsync()
        {
            var viagens = await this._repo.GetAllAsync();
            var viagensDto = new List<ViagemDto>();

            if (viagens == null)
                return null;

            foreach (var viag in viagens)
            {
                viagensDto.Add(ViagemMapper.toDTO(viag));
            }

            return viagensDto;
        }

    }
}