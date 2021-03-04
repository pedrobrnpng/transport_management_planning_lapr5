import { Request, Response, NextFunction } from 'express';

export default interface IImportarDadosController  {
  importarDados(req: string, res: Response, next: NextFunction);
}