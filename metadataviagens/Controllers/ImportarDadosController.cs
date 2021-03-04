using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using metadataviagens.Domain.ImportarDados;
using metadataviagens.Services.ImportarDados;
using Microsoft.AspNetCore.Http;
using System.Web.Http;
using System.IO;
using System.Text;

namespace metadataviagens.Controllers
{
    [Route("api/ImportarDados")]
    [ApiController]
    public class ImportarDadosController : ControllerBase
    {
        private readonly IImportarDadosService _service;

        public ImportarDadosController(IImportarDadosService service)
        {
            _service = service;
        }

        // POST: api/ImportarDados
        [HttpPost]
        public async Task<IActionResult> ImportDados([FromForm] ImportarDados imd)
        {
            var inputText = "";
            try
            {
                var files = imd.file;
                if (files.Length > 0)
                {
                    byte[] result;
                    var filePath = Path.GetTempFileName();

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await files.CopyToAsync(stream);
                        stream.Seek(0, SeekOrigin.Begin);
                        result = new byte[stream.Length];
                        await stream.ReadAsync(result, 0, (int)stream.Length);
                    }
                    System.IO.File.Delete(filePath);
                    inputText=System.Text.Encoding.ASCII.GetString(result);
                }
                var str_res = await this._service.importarDados(inputText);

                return Ok(new { input = str_res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}