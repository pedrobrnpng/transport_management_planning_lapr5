using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Services.ReadData
{
    public interface IReadServicosTripulante : IReadData
    {
        new Task<int> readData(List<string> lines);
    }
}