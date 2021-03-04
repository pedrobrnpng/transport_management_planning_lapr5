using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using metadataviagens.Domain.ServicosViatura;

namespace metadataviagens.Services.ServicosViatura
{
    public interface IServicoViaturaService
    {
        Task<ServicoViaturaDto> AddAsync(CriarServicoViaturaDto dto);
        Task<ServicoViaturaDto> GetByDomainIdAsync(string id);
        Task<List<ServicoViaturaDto>> GetSVsOfDayAsync(DateTime date);
        Task<List<ServicoViaturaDto>> GetAllAsync();
    }
}