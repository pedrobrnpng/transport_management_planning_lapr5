using System.Reflection.Metadata;
using System.Xml;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using metadataviagens.Services.ReadData;

namespace metadataviagens.Services.ImportarDados
{
    public class ImportarDadosService : IImportarDadosService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IReadFile _readFile;

        public ImportarDadosService(IUnitOfWork unitOfWork, IReadFile readFile)
        {
            this._unitOfWork = unitOfWork;
            this._readFile = readFile;
        }

        public async Task<string> importarDados(string input)
        {
            return await this._readFile.importarDados(input);
        }
    }
}