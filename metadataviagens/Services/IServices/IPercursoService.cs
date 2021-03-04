using System.Threading.Tasks;
using metadataviagens.Domain.Viagens;
namespace metadataviagens.Services.Viagens
{
    public interface IPercursoService
    {
         Task<PercursoDto> ifExists(string idPercurso);
    }
}