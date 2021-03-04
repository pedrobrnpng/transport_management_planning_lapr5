import { Result } from "../../core/logic/Result";
import ITipoViaturaDTO from "../../dto/ITipoViaturaDTO";

export default interface ITipoViaturaService {
    criarTipoViatura(tipoViaturaDTO: ITipoViaturaDTO): Promise< Result<ITipoViaturaDTO>>;
    listarTiposViatura():  Promise<Result<Array<ITipoViaturaDTO>>>;
    getTipoViaturaById(tipoViaturaDTO: ITipoViaturaDTO): Promise<Result<ITipoViaturaDTO>>;

}