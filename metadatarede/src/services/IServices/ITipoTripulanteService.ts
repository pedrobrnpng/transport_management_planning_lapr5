import { Result } from "../../core/logic/Result";
import ITipoTripulanteDTO from "../../dto/ITipoTripulanteDTO";

export default interface ITipoTripulanteService  {
  criarTipoTripulante(tipoTripulanteDTO: ITipoTripulanteDTO): Promise<Result<ITipoTripulanteDTO>>;
  listarTiposTripulante():  Promise<Result<Array<ITipoTripulanteDTO>>>;
  getTipoTripulanteById(tipoTripulanteDTO: ITipoTripulanteDTO): Promise<Result<ITipoTripulanteDTO>>;
}
