using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Services.ReadData
{
    public interface IReadFile
    {
        Task<string> importarDados(string input);
    }
}