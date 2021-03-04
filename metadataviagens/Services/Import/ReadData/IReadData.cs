using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Services.ReadData
{
    public interface IReadData
    {
        Task<int> readData(List<string> lines);
    }
}