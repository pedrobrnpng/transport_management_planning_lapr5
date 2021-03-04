namespace metadataviagens.Shared
{
    public class Tempo
    {
        public static int convertToMinutes(int tempo, string unidade){
            if ("h".Equals(unidade)){
                return tempo * 60;
            }
            if ("m".Equals(unidade) || unidade is null){
                return tempo;
            }
            if ("s".Equals(unidade)){
                return tempo / 60;
            }
            throw new System.Exception("Invalid Time Unit");
        }
    }
}