import { Result } from "../../core/logic/Result";

export default interface IImportarDadosService  {
  importarDados(filename:string): Promise<Result<string>>;
}