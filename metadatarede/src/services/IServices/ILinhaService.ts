import { Result } from "../../core/logic/Result";
import ILinhaDTO from "../../dto/ILinhaDTO";

export default interface ILinhaService  {
  criarLinha(linhaDTO: ILinhaDTO): Promise<Result<ILinhaDTO>>;
  listarLinhas(): Promise<Result<Array<ILinhaDTO>>>;
  getLinhaById(linhaDTO: ILinhaDTO): Promise<Result<ILinhaDTO>>;
  listarLinhasOrdenadosPorId(): Promise<Result<Array<ILinhaDTO>>>;
}
