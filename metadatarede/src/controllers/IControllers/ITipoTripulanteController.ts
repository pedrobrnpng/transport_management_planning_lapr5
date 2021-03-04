import { Request, Response, NextFunction } from 'express';

export default interface ITipoTripulanteController  {
  criarTipoTripulante(req: Request, res: Response, next: NextFunction);
  listarTiposTripulante(req: Request, res: Response, next: NextFunction);
  getTipoTripulanteById(req: Request,res: Response,next: NextFunction);
}