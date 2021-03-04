using DDDSample1.Domain.Shared;
using metadataviagens.Domain.BlocosViagens;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace metadataviagens.Infrastructure.BlocosViagens
{
    public interface IBlocoViagemRepository : IRepository<BlocoViagem,BlocoViagemId>
    {
        Task<List<BlocoViagem>> GetViagensOfBlocoAsync(int blocoId);
        Task<BlocoViagem> GetById1Async(BlocoViagemId id);
    }
}