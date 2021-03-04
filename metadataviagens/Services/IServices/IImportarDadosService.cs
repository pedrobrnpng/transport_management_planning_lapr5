using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Services.ImportarDados
{
    public interface IImportarDadosService
    {
        Task<string> importarDados(string input);
    }
}