import { Request, Response, NextFunction } from 'express';

export default interface ILinhaController {
    criarLinha(req: Request, res: Response, next: NextFunction);

    listarLinhas(req: Request, res: Response, next: NextFunction);
    
    getLinhaById(req: Request, res: Response, next: NextFunction);

    listarLinhasOrdenadosPorId(req: Request, res: Response, next: NextFunction);
}