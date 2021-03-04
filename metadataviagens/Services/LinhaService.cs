using System.Net.Http;
using metadataviagens.Domain.Viagens;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace metadataviagens.Services.Viagens
{
    public class LinhaService : ILinhaService
    {
        private string ApiUrl = "https://optlapr.herokuapp.com/api/linhas/";
        static readonly HttpClient client = new HttpClient();
        public async Task<bool> ifExists(string idLinha)
        {
            HttpResponseMessage response = await client.GetAsync(ApiUrl + idLinha);
            string responseBody = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError){
                throw new System.Exception(responseBody);
            }
            var linha = JsonConvert.DeserializeObject<LinhaId>(responseBody);
            return idLinha.Equals(linha.id);
        }
    }
}