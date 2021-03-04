using DDDSample1.Domain.Shared;
using metadataviagens.Domain.BlocosTrabalho;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Infrastructure.BlocosTrabalho
{
    public interface IBlocoTrabalhoRepository: IRepository<BlocoTrabalho,BlocoTrabalhoId>
    {
        Task<BlocoTrabalho> GetByDomainIdAsync(int codigo);
        Task<BlocoTrabalho> GetByParametersAsync(int horaInicio, int horaFim, string noInicio, string noFim);
        Task<int> GetLastAsync();
        Task<List<BlocoTrabalho>> GetAllOrderedAsync();
    }
}