using System;
using System.Threading.Tasks;
using metadataviagens.Domain.ServicosTripulante;
using System.Collections.Generic;

namespace metadataviagens.Services.ServicosTripulante
{
    public interface IServicosTripulanteService
    {
        Task<ServicoTripulanteDto> AddAsync(CriarServicoTripulanteDto dto);
        Task<ServicoTripulanteDto> GetByDomainIdAsync(string id);
        Task<List<ServicoTripulanteDto>> GetSTsOfDayAsync(DateTime date);
        Task<List<ServicoTripulanteDto>> GetAllAsync();
    }
}