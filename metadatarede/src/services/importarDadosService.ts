import { Service } from 'typedi';
import ReadFile from './import/readFiles';
import IImportarDadosService from './IServices/IImportarDadosService';
import { Result } from "../core/logic/Result";

@Service()
export default class ImportarDadosService implements IImportarDadosService {
  constructor(private rf : ReadFile) {}

  public async importarDados(filename:string): Promise<Result<string>> {
    try {
        const imporarDadosOrError=await this.rf.importarDados(filename) as Result<string>;
        if (imporarDadosOrError.isSuccess)
          return Result.ok<string>(imporarDadosOrError.getValue());
        else
          return Result.fail<string>(imporarDadosOrError.getValue());
    } catch (e) {
      throw e;
    }
  }
}