namespace metadataviagens.Domain.Viagens
{
    public class SegmentoLinhaDto
    {
        public TempoViagemDto tempoViagem { get; private set; }

        public SegmentoLinhaDto(TempoViagemDto tempoViagem)
        {
            this.tempoViagem = tempoViagem;
        }

    }
}