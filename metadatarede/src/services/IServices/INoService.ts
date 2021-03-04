import { Result } from "../../core/logic/Result";
import INoDTO from "../../dto/INoDTO";

export default interface INoService  {
  criarNo(NoDTO: INoDTO): Promise<Result<INoDTO>>;
  listarNos(): Promise<Result<Array<INoDTO>>>;
  getNoById(NoDTO: INoDTO): Promise<Result<INoDTO>>;
  listarNosOrdenadosPorId(): Promise<Result<Array<INoDTO>>>;
  adicionarModelo(NoDTO: INoDTO): Promise<Result<INoDTO>>;
}
