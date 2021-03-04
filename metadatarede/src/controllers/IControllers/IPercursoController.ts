import { Request, Response, NextFunction } from 'express';

export default interface IPercursoController  {
  criarPercurso(req: Request, res: Response, next: NextFunction);
  listarPercursosDumaLinha(req: Request, res: Response, next: NextFunction);
  listarPercursosOrdenadosPorLinha(req: Request, res: Response, next: NextFunction);
  listarPercursosDumaLinha2(req: Request, res: Response, next: NextFunction);
  getPercursoById(req: Request,res: Response,next: NextFunction);
}