import { Request, Response, NextFunction } from 'express';

export default interface ITipoViaturaController {
    criarTipoViatura(req: Request, res: Response, next: NextFunction);
    listarTiposViatura(req: Request, res: Response, next: NextFunction);
    getTipoViaturaById(req: Request, res: Response, next: NextFunction);
}