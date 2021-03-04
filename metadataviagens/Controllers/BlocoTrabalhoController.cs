using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Services.BlocosTrabalho;
using metadataviagens.Domain.BlocosViagens;
using metadataviagens.Services.BlocosViagens;
using System.Collections.Generic;

namespace metadataviagens.Controllers
{
    [Route("api/BlocosTrabalho")]
    [ApiController]
    public class BlocoTrabalhoController : ControllerBase
    {
        private readonly IBlocoTrabalhoService _service;
        private readonly IBlocoViagemService _BVservice;

        public BlocoTrabalhoController(IBlocoTrabalhoService service, IBlocoViagemService BVservice)
        {
            _service = service;
            _BVservice = BVservice;
        }

        // POST: api/BlocosTrabalho
        [HttpPost]
        public async Task<ActionResult<BlocoTrabalhoDto>> Create(CriarBlocoSemCodigoDto dto)
        {
            try
            {
                var bloco = await _service.AddAsync(dto);

                if (bloco == null)
                    return BadRequest(new { Message = "Bloco já existe" });

                return CreatedAtAction(nameof(GetByDomainId), new { id = bloco.codigo }, bloco);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/BlocosTrabalho/Import
        [HttpPost("Import")]
        public async Task<ActionResult<BlocoTrabalhoDto>> Create(CriarBlocoTrabalhoDto dto)
        {
            try
            {
                var bloco = await _service.AddAsync(dto);

                if (bloco == null)
                    return BadRequest(new { Message = "Bloco já existe" });

                return CreatedAtAction(nameof(GetByDomainId), new { id = bloco.codigo }, bloco);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/BlocosTrabalho/List
        [HttpPost("List")]
        public async Task<ActionResult<List<BlocoTrabalhoDto>>> Create(List<CriarBlocoSemCodigoDto> dtos)
        {
            var bloco_list=new List<BlocoTrabalhoDto>();
            try
            {
                foreach (var dto in dtos)
                {
                    var bloco = await _service.AddAsync(dto);

                    if (bloco == null)
                        return BadRequest(new { Message = "Erro a criar Bloco" });
                    
                    bloco_list.Add(bloco);
                }

                return bloco_list;
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/BlocosTrabalho/List2
        [HttpPost("List2")]
        public async Task<ActionResult<List<BlocoTrabalhoDto>>> Create(List<CriarBlocoTrabalhoDto> dtos)
        {
            var bloco_list=new List<BlocoTrabalhoDto>();
            var counter=0;
            try
            {
                foreach (var dto in dtos)
                {
                    var bloco = await _service.AddAsync(dto);

                    if (bloco == null)
                        return BadRequest(new { Message = "Erro a criar Bloco ("+counter+" blocos criados)" });
                    
                    bloco_list.Add(bloco);
                    counter++;
                }

                return bloco_list;
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/BlocosTrabalho/5/AdicionarViagem
        [HttpPost("{id}/AdicionarViagem")]
        public async Task<ActionResult<BlocoViagemDto>> AddViagem(int id, CriarBlocoViagemDto dto)
        {
            try
            {
                var blocoV = await _BVservice.AddAsync(id, dto);

                return CreatedAtAction(nameof(GetBlocosViagemById), new { id = blocoV.Id }, blocoV);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // GET: api/BlocosTrabalho/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BlocoTrabalhoDto>> GetByDomainId(int id)
        {
            var bloco = await _service.GetByDomainIdAsync(id);

            if (bloco == null)
            {
                return NotFound();
            }

            return bloco;
        }

        // GET: api/BlocosTrabalho/5/Viagens
        [HttpGet("{id}/Viagens")]
        public async Task<ActionResult<ViagemListDto>> GetViagensOfBlocoById(int id)
        {
            var viagens = await _BVservice.GetViagensOfBlocoByIdAsync(id);

            if (viagens == null)
            {
                return NotFound();
            }

            return viagens;
        }

        // GET: api/BlocosTrabalho/5/ViagensPossiveis
        [HttpGet("{id}/ViagensPossiveis")]
        public async Task<ActionResult<ViagemListDto>> GetPossibleViagensOfBlocoById(int id)
        {
            var viagens = await _BVservice.GetPossibleViagensOfBlocoByIdAsync(id);

            if (viagens == null)
            {
                return NotFound();
            }

            return viagens;
        }

        // GET: api/BlocosTrabalho/BlocosViagem/5
        [HttpGet("BlocosViagem/{id}")]
        public async Task<ActionResult<BlocoViagemDto>> GetBlocosViagemById(Guid id)
        {
            var bv = await _BVservice.GetByIdAsync(new BlocoViagemId(id));

            if (bv == null)
            {
                return NotFound();
            }

            return bv;
        }

        // GET: api/BlocosTrabalho/
        [HttpGet("")]
        public async Task<ActionResult<List<BlocoTrabalhoDto>>> GetAll()
        {
            var bloco = await _service.GetAllAsync();

            if (bloco == null)
            {
                return NotFound();
            }

            return bloco;
        }

        // GET: api/BlocosTrabalho/NoSV
        [HttpGet("NoSV")]
        public async Task<ActionResult<List<BlocoTrabalhoDto>>> GetAllWithoutServicoViatura()
        {
            var bloco = await _service.GetAllWithoutServicoViaturaAsync();

            if (bloco == null)
            {
                return NotFound();
            }

            return bloco;
        }

        // GET: api/BlocosTrabalho/NoST
        [HttpGet("NoST")]
        public async Task<ActionResult<List<BlocoTrabalhoDto>>> GetAllWithoutServicoTripulante()
        {
            var bloco = await _service.GetAllWithoutServicoTripulanteAsync();

            if (bloco == null)
            {
                return NotFound();
            }

            return bloco;
        }
    }
}