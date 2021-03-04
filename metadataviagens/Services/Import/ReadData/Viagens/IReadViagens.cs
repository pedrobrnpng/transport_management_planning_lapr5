using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Services.ReadData
{
    public interface IReadViagens : IReadData
    {
        new Task<int> readData(List<string> lines);
    }
}