using metadataviagens.Domain.Viaturas;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace metadataviagens.Services.TiposViatura
{
    public class TipoViaturaService: ITipoViaturaService
    {
        static readonly HttpClient client = new HttpClient();
        private string ApiUrl = "https://optlapr.herokuapp.com/api/tipoViatura/";

        public async Task<bool> ifExists(string idTipoViatura)
        {
            HttpResponseMessage response = await client.GetAsync(ApiUrl + idTipoViatura);
            
            string responseBody = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
            {
                throw new System.Exception(responseBody);
            }

            var tipoViatura = JsonConvert.DeserializeObject<TipoViaturaId>(responseBody);
            return idTipoViatura.Equals(tipoViatura.id);
        }
    }
}
