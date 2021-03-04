using System.Threading.Tasks;
using metadataviagens.Domain.Tripulantes;
using System.Collections.Generic;


namespace metadataviagens.Services.Tripulantes
{
    public interface ITripulanteService
    {
        Task<TripulanteDto> AddAsync(CriarTripulanteDto dto);
        Task<TripulanteDto> GetByDomainIdAsync(int id);
        Task<TripulanteDto> GetByNumeroCartaoCidadaoAsync(int id);
        Task<TripulanteDto> GetByNifAsync(int id);
        Task<List<TripulanteDto>> GetAllAsync();
    }
}