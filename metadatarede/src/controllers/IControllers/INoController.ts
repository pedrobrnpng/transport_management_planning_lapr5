import { Request, Response, NextFunction } from 'express';

export default interface INoController  {
  criarNo(req: Request, res: Response, next: NextFunction);
  listarNos(req: Request, res: Response, next: NextFunction);
  getNoById(req: Request,res: Response,next: NextFunction);
  listarNosOrdenadosPorId(req: Request,res: Response,next: NextFunction);
  adicionarModelo(req: Request,res: Response,next: NextFunction);
}