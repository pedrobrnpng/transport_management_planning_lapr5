using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace metadataviagens.Domain.ImportarDados
{
    public class ImportarDados
    {
        public IFormFile file { get; set; }

        public ImportarDados()
        {
        }
        
        public ImportarDados(IFormFile file)
        {
            this.file=file;
        }
    }
}