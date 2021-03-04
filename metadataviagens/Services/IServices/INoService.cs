using System.Threading.Tasks;
using metadataviagens.Domain.BlocosTrabalho;
namespace metadataviagens.Services.BlocosTrabalho
{
    public interface INoService
    {
         Task<NoDto> ifExists(string idNo);
    }
}