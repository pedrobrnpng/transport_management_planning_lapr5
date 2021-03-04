using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Services.Viaturas;
using System.Collections.Generic;

namespace metadataviagens.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViaturasController : ControllerBase
    {
        private readonly IViaturaService _service;

        public ViaturasController(IViaturaService service)
        {
            _service = service;
        }

        // POST: api/Viaturas
        [HttpPost]
        public async Task<ActionResult<ViaturaDto>> Create(CriarViaturaDto dto)
        {
            try
            {
                var viatura = await _service.AddAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = viatura.Id }, viatura);
            } catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // GET: api/Viaturas/id
        [HttpGet("matricula/{id}")]
        public async Task<ActionResult<ViaturaDto>> GetById(string id)
        {
            var viatura = await _service.GetByDomainIdAsync(id);

            if (viatura == null)
                return NotFound();

            return viatura;
        }

        // GET: api/Viaturas/vin
        [HttpGet("vin/{vin}")]
        public async Task<ActionResult<ViaturaDto>> getByVin(string vin)
        {
            var viatura = await _service.GetByVINAsync(vin);
            if (viatura == null)
                return NotFound();
            
            return viatura;
        }

        // GET: api/Viaturas/
        [HttpGet("")]
        public async Task<ActionResult<List<ViaturaDto>>> GetAll()
        {
             var viatura = await _service.GetAllAsync();

            if (viatura == null)
            {
                return NotFound();
            }

            return viatura;
        }

    }
}
