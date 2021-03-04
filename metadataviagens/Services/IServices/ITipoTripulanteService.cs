using System.Threading.Tasks;

namespace metadataviagens.Services.TiposTripulante
{
    public interface ITipoTripulanteService
    {
        Task<bool> ifExists(string idTipoTripulante);
    }
}