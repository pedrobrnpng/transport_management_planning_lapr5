using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Services.ReadData
{
    public interface IReadServicosViatura : IReadData
    {
        new Task<int> readData(List<string> lines);
    }
}