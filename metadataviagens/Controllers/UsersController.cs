using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using System;
using metadataviagens.Domain.Users;
using metadataviagens.Services.Users;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Web.Http;
using System.IO;
using System.Text;

namespace metadataviagens.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<UserDto>> Create(CriarUserDto dto)
        {
            try
            {
                var user = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetByDomainId), new { id = user.email }, user);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetByDomainId(string id)
        {
            var user = await _service.GetByDomainIdAsync(id);

            if (user == null)
            {
                return Ok(new CriarUserDto("USER NOT FOUND","","",1));
            }

            return user;
        }

        // GET: api/Users/Authenticate
        [HttpPost("Authenticate")]
        public async Task<ActionResult<UserDto>> AuthenticateUser(AuthDto dto)
        {
            var user = await _service.AuthenticateUser(dto.email, dto.password);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

         // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDto>> DeleteByDomainId(string id)
        {
            var user = await _service.DeleteByDomainIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // UPDATE: api/Users/5
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> UpdateByDomainId(string id,CriarUserDto userDto)
        {
            var user = await _service.UpdateByDomainIdAsync(id,userDto);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    
    }
}