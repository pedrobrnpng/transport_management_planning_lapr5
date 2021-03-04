using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Domain.Shared;
using metadataviagens.Services.ServicosViatura;
using System.Collections.Generic;

namespace metadataviagens.Controllers
{
    [Route("api/ServicosViatura")]
    [ApiController]
    public class ServicoViaturaController : ControllerBase
    {
        private readonly IServicoViaturaService _service;

        public ServicoViaturaController(IServicoViaturaService service)
        {
            _service = service;
        }

        // POST: api/ServicosViatura
        [HttpPost]
        public async Task<ActionResult<ServicoViaturaDto>> Create(CriarServicoViaturaDto dto)
        {
            try
            {
                var servV = await _service.AddAsync(dto);

                if (servV == null)
                    return BadRequest(new { Message = "Erro na criação de serviço de viatura" });

                return CreatedAtAction(nameof(GetByDomainId), new { id = servV.nome }, servV);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/ServicosViatura/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServicoViaturaDto>> GetByDomainId(string id)
        {
            var servV = await _service.GetByDomainIdAsync(id);

            if (servV == null)
            {
                return NotFound();
            }

            return servV;
        }

        // GET: api/ServicosViatura
        [HttpGet]
        public async Task<ActionResult<List<ServicoViaturaDto>>> GetAll()
        {
            var servsV = await _service.GetAllAsync();

            if (servsV == null)
            {
                return NotFound();
            }

            return servsV;
        }

        // GET: api/ServicosViatura/AtDate
        [HttpPost("AtDate")]
        public async Task<ActionResult<List<ServicoViaturaDto>>> GetSVsOfDay(DateTimeDto dateDto)
        {
            var servsV = await _service.GetSVsOfDayAsync(dateDto.date);

            if (servsV == null)
            {
                return NotFound();
            }

            return servsV;
        }
    }
}