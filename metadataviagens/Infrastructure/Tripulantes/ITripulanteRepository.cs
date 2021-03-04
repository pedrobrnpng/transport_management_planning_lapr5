using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using metadataviagens.Domain.Tripulantes;

namespace metadataviagens.Infrastructure.Tripulantes
{
    public interface ITripulanteRepository: IRepository<Tripulante,TripulanteId>
    {
        Task<Tripulante> GetByDomainIdAsync(int numeroMecanografico);
        Task<Tripulante> GetByNumeroCartaoCidadaoAsync(int numeroCartaoCidadao);
        Task<Tripulante> GetByNif(int nif);
    }
}