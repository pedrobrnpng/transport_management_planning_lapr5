using System.Net.Http;
using metadataviagens.Domain.BlocosTrabalho;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System;

namespace metadataviagens.Services.BlocosTrabalho
{
    public class NoService : INoService
    {
        private string ApiUrl = "https://optlapr.herokuapp.com/api/nos/";
        static readonly HttpClient client = new HttpClient();
        
        public async Task<NoDto> ifExists(string idNo)
        {
            HttpResponseMessage response = await client.GetAsync(ApiUrl + idNo);
            string responseBody = await response.Content.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError){
                throw new System.Exception(responseBody);
            }
            var no = JsonConvert.DeserializeObject<NoDto>(responseBody);
            if (!idNo.Equals(no.id_abreviature)){
                return null;
            }
            return no;
        }
    }
}