using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using System.Collections.Generic;
using metadataviagens.Domain.Viagens;
using metadataviagens.Services.Viagens;

namespace metadataviagens.Controllers
{
    [Route("api/Viagens")]
    [ApiController]
    public class ViagensController : ControllerBase
    {
        private readonly IViagemService _service;

        public ViagensController(IViagemService service)
        {
            _service = service;
        }

        // POST: api/Viagens
        [HttpPost]
        public async Task<ActionResult<ViagemDto>> Create(CriarViagemSemCodigoDto dto)
        {
            try
            {
                var viagem = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetByDomainId), new { id = viagem.codigo }, viagem);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // POST: api/Viagens/Import
        [HttpPost("Import")]
        public async Task<ActionResult<ViagemDto>> Create(CriarViagemDto dto)
        {
            try
            {
                var viagem = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetByDomainId), new { id = viagem.codigo }, viagem);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        [HttpPost("set")]
        public async Task<ActionResult<ViagemDto[]>> Create(CriarViagensDto dto)
        {
            try
            {
                var viagens = await _service.AddAsync(dto);
                return viagens;
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/Viagens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ViagemDto>> GetByDomainId(int id)
        {
            var viag = await _service.GetByDomainIdAsync(id);

            if (viag == null)
            {
                return NotFound();
            }

            return viag;
        }

        // GET: api/Viagens
        [HttpGet("")]
        public async Task<ActionResult<List<ViagemDto>>> GetAll()
        {
            var viag = await _service.GetAllAsync();

            if (viag == null)
            {
                return NotFound();
            }

            return viag;
        }
    
    }
}