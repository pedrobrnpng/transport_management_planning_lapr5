namespace metadataviagens.Domain.Viagens
{
    public class TempoViagemDto
    {
        public int value { get; private set; }
        public string unidadeTempo { get; private set; }

        public TempoViagemDto(int value, string unidadeTempo ){
            this.value = value;
            this.unidadeTempo = unidadeTempo;
        }
    }
}