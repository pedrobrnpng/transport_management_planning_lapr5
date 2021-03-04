using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Mappers.Viaturas;
using System;
using metadataviagens.Services.TiposViatura;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Infrastructure.Viaturas;
using System.Collections.Generic;

namespace metadataviagens.Services.Viaturas
{
    public class ViaturaService: IViaturaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IViaturaRepository _repo;
        private readonly ITipoViaturaService _tViatura;

        public ViaturaService(IUnitOfWork unitOfWork, IViaturaRepository repo, ITipoViaturaService service)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._tViatura = service;
        }

        public async Task<ViaturaDto> AddAsync(CriarViaturaDto dto)
        {
            if (!await this._tViatura.ifExists(dto.tipoViaturaId.toString()))
            {
                throw new BusinessRuleValidationException("Tipo de Viatura não existe.");
            }
 
            var viatura = ViaturaMapper.toDomain(dto);

            await this._repo.AddAsync(viatura);

            await this._unitOfWork.CommitAsync();

            return ViaturaMapper.toDTO(viatura);
        }

        public async Task<ViaturaDto> GetByDomainIdAsync(string id)
        {
            var viatura = await this._repo.GetByDomainIdAsync(id);

            if(viatura == null) 
                return null;
            
            return ViaturaMapper.toDTO(viatura);
        }

        public async Task<ViaturaDto> GetByVINAsync(string vin)
        {
            var viatura = await this._repo.GetByVINAsync(vin);

            if (viatura == null)
                return null;

            return ViaturaMapper.toDTO(viatura);
        }

        public async Task<List<ViaturaDto>> GetAllAsync()
        {
            var viaturas = await this._repo.GetAllAsync();
            var viaturasDto = new List<ViaturaDto>();

            if (viaturas == null)
                return null;

            foreach (var viatura in viaturas)
            {
                viaturasDto.Add(ViaturaMapper.toDTO(viatura));
            }

            return viaturasDto;
        }

    }
}