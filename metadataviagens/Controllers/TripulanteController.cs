using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using metadataviagens.Domain.Tripulantes;
using System.Collections.Generic;
using metadataviagens.Services.Tripulantes;


namespace metadataviagens.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripulantesController : ControllerBase
    {
        private readonly ITripulanteService _service;

        public TripulantesController(ITripulanteService service)
        {
            _service = service;
        }

        // POST: api/Tripulantes
        [HttpPost]
        public async Task<ActionResult<TripulanteDto>> Create(CriarTripulanteDto dto)
        {
            try
            {
                var trip = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetByDomainId), new { id = trip.Id }, trip);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // GET: api/Tripulantes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripulanteDto>> GetGetByDomainId(int id)
        {
            var prod = await _service.GetByDomainIdAsync(id);

            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }

        // GET: api/Tripulantes/cartaocidao/5
        [HttpGet("cartaocidadao/{id}")]
        public async Task<ActionResult<TripulanteDto>> GetGetByNumeroCartaoCidadao(int id)
        {
            var prod = await _service.GetByNumeroCartaoCidadaoAsync(id);

            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }

        // GET: api/Tripulantes/nif/5
        [HttpGet("nif/{id}")]
        public async Task<ActionResult<TripulanteDto>> GetGetByNif(int id)
        {
            var prod = await _service.GetByNifAsync(id);

            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }

        // GET: api/Tripulantes/
        [HttpGet("")]
        public async Task<ActionResult<List<TripulanteDto>>> GetGetAll(int id)
        {
            var prod = await _service.GetAllAsync();

            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }

    }
}