using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Mappers.Tripulantes;
using System;
using metadataviagens.Services.TiposTripulante;
using System.Collections.Generic;
using metadataviagens.Domain.Tripulantes;
using metadataviagens.Infrastructure.Tripulantes;

namespace metadataviagens.Services.Tripulantes
{
    public class TripulanteService: ITripulanteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITripulanteRepository _repo;
        private readonly ITipoTripulanteService _tpServ;

        public TripulanteService(IUnitOfWork unitOfWork, ITripulanteRepository repo, ITipoTripulanteService tipoTripulanteService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._tpServ = tipoTripulanteService;
        }

        public async Task<TripulanteDto> AddAsync(CriarTripulanteDto dto)
        {
            if (!await this._tpServ.ifExists(dto.tipoTripulanteId))
            {
                throw new BusinessRuleValidationException("Tipo de tripulante não existe");
            }
            var tripulante = TripulanteMapper.toDomain(dto);

            await this._repo.AddAsync(tripulante);

            await this._unitOfWork.CommitAsync();

            return TripulanteMapper.toDTO(tripulante);
        }

        public async Task<TripulanteDto> GetByDomainIdAsync(int id)
        {
            var tripulante = await this._repo.GetByDomainIdAsync(id);

            if (tripulante == null)
                return null;

            return TripulanteMapper.toDTO(tripulante);
        }

        public async Task<TripulanteDto> GetByNumeroCartaoCidadaoAsync(int id)
        {
            var tripulante = await this._repo.GetByNumeroCartaoCidadaoAsync(id);

            if (tripulante == null)
                return null;

            return TripulanteMapper.toDTO(tripulante);
        }

        public async Task<TripulanteDto> GetByNifAsync(int id)
        {
            var tripulante = await this._repo.GetByNif(id);

            if (tripulante == null)
                return null;

            return TripulanteMapper.toDTO(tripulante);
        }

        public async Task<List<TripulanteDto>> GetAllAsync()
        {
            var tripulantes = await this._repo.GetAllAsync();
            var tripulantesDto= new List<TripulanteDto>();

            if (tripulantes == null)
                return null;

            foreach(var trip in tripulantes) {
                tripulantesDto.Add(TripulanteMapper.toDTO(trip));
            }
            return tripulantesDto;
        }

    }
}