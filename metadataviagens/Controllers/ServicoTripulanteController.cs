using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using metadataviagens.Domain.ServicosTripulante;
using metadataviagens.Domain.Shared;
using metadataviagens.Services.ServicosTripulante;


namespace metadataviagens.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicosTripulanteController : ControllerBase
    {
        private readonly IServicosTripulanteService _service;

        public ServicosTripulanteController(IServicosTripulanteService service)
        {
            _service = service;
        }

        // POST: api/ServicosTripulante
        [HttpPost]
        public async Task<ActionResult<ServicoTripulanteDto>> Create(CriarServicoTripulanteDto dto)
        {
            try
            {
                var servicoTripulante = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetByDomainId), new { id = servicoTripulante.Id }, servicoTripulante);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/ServicosTripulante/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ServicoTripulanteDto>> GetGetByDomainId(string id)
        {
            var st = await _service.GetByDomainIdAsync(id);

            if (st == null)
            {
                return NotFound();
            }

            return st;
        }

        // GET: api/ServicosTripulante
        [HttpGet]
        public async Task<ActionResult<List<ServicoTripulanteDto>>> GetAll()
        {
            var servsT = await _service.GetAllAsync();

            if (servsT == null)
            {
                return NotFound();
            }

            return servsT;
        }

        // GET: api/ServicosTripulante/AtDate
        [HttpPost("AtDate")]
        public async Task<ActionResult<List<ServicoTripulanteDto>>> GetSTsOfDay(DateTimeDto dateDto)
        {
            var servsT = await _service.GetSTsOfDayAsync(dateDto.date);

            if (servsT == null)
            {
                return NotFound();
            }

            return servsT;
        }
    
    }
}