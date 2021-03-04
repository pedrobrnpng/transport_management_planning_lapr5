using System.Net.Http;
using metadataviagens.Domain.Tripulantes;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using System;
using System.Configuration; 

namespace metadataviagens.Services.TiposTripulante
{
    public class TipoTripulanteService: ITipoTripulanteService
    {  
        static readonly HttpClient client = new HttpClient();

        public async Task<bool> ifExists(string idTipoTripulante)
        {
            var ApiUrl = "https://optlapr.herokuapp.com/api/tipoTripulantes/";
            HttpResponseMessage response = await client.GetAsync(ApiUrl + idTipoTripulante);
            string responseBody = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
            {
                throw new System.Exception(responseBody);
            }
            var tipoTripulante = JsonConvert.DeserializeObject<TipoTripulanteId>(responseBody);
            return idTipoTripulante.Equals(tipoTripulante.id);
        }
    }
}