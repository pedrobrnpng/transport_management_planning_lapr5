using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Viagens;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Infrastructure.Viagens
{
    public interface IViagemRepository: IRepository<Viagem,ViagemId>
    {
        Task<Viagem> GetByDomainIdAsync(int codigo);
        Task<Viagem> GetByIdAsync(string id);
        Task<List<Viagem>> GetAllOrderedAsync();
        Task<int> GetLastAsync();
    }
}