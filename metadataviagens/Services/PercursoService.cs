using System.Net.Http;
using metadataviagens.Domain.Viagens;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System;

namespace metadataviagens.Services.Viagens
{
    public class PercursoService : IPercursoService
    {
        private string ApiUrl = "https://optlapr.herokuapp.com/api/percursos/";
        static readonly HttpClient client = new HttpClient();
        public async Task<PercursoDto> ifExists(string idPercurso)
        {
            HttpResponseMessage response = await client.GetAsync(ApiUrl + idPercurso);
            string responseBody = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError){
                throw new System.Exception(responseBody);
            }
            var percurso = JsonConvert.DeserializeObject<PercursoDto>(responseBody);
            Console.WriteLine(percurso);
            if (!idPercurso.Equals(percurso.id)){
                return null;
            }
            return percurso;
        }
    }
}