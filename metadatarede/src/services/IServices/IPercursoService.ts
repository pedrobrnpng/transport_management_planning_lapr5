import { Result } from "../../core/logic/Result";
import IPercursoDTO from "../../dto/IPercursoDTO";

export default interface IPercursoService  {
  criarPercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>>;
  listarPercursoDumaLinha(percursoDTO: IPercursoDTO): Promise<Result<Array<IPercursoDTO>>>;
  listarPercursoDumaLinha2(percursoDTO: IPercursoDTO): Promise<Result<Array<IPercursoDTO>>>;
  listarPercursosOrdenadosPorLinha(): Promise<Result<Array<IPercursoDTO>>>;
  getPercursoById(percursoDTO: IPercursoDTO ): Promise<Result<IPercursoDTO>>;
}
