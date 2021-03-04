using System.Threading.Tasks;
using metadataviagens.Domain.Viagens;
namespace metadataviagens.Services.Viagens
{
    public interface ILinhaService
    {
         Task<bool> ifExists(string idLinha);
    }
}