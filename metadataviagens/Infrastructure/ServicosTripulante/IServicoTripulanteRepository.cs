using DDDSample1.Domain.Shared;
using metadataviagens.Domain.ServicosTripulante;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Infrastructure.ServicosTripulante
{
    public interface IServicoTripulanteRepository : IRepository<ServicoTripulante,ServicoTripulanteId>
    {
        Task<ServicoTripulante> GetByDomainIdAsync(string nome);

        Task<List<ServicoTripulante>> GetAllOrderedAsync();
    }
}