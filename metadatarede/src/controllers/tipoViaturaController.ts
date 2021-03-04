import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";

import ITipoViaturaController from "./IControllers/ITipoViaturaController";
import ITipoViaturaService from "../services/IServices/ITipoViaturaService";
import ITipoViaturaDTO from "../dto/ITipoViaturaDTO";

export default class TipoViaturaController implements ITipoViaturaController {
    constructor(
        @Inject(config.services.tipoViatura.name) private tipoViaturaServiceInstance : ITipoViaturaService
    ) {}

    public async criarTipoViatura(req: Request, res: Response, next: NextFunction) {
        try {
            const tipoViaturaOrError = await this.tipoViaturaServiceInstance.criarTipoViatura(req.body as ITipoViaturaDTO) as Result<ITipoViaturaDTO>;
            
            if(tipoViaturaOrError.isFailure) {
                return res.status(402).send();
            }

            const tipoViaturaDTO = tipoViaturaOrError.getValue();

            return res.status(201).json(tipoViaturaDTO);
        } catch (err) {
            return next(err);
        }
    }

    public async listarTiposViatura(req: Request, res: Response, next: NextFunction) {
        try {
          const tipoViaturasOrError = await this.tipoViaturaServiceInstance.listarTiposViatura() as Result<Array<ITipoViaturaDTO>>;
          
          if (tipoViaturasOrError.isFailure) {
            return res.status(402).send(tipoViaturasOrError.errorValue());
          }
    
          const tipoViaturaDTO = tipoViaturasOrError.getValue();
          return res.status(201).json( tipoViaturaDTO );
        }
        catch (e) {
          if(e instanceof Result) 
            return res.status(402).send(e.errorValue());
          else 
            next(e);
        }
    }

    public async getTipoViaturaById(req: Request, res: Response, next: NextFunction) {
      try {
        const tipoViaturaOrError = await this.tipoViaturaServiceInstance.getTipoViaturaById({id: req.params.id} as ITipoViaturaDTO) as Result<ITipoViaturaDTO>;
  
        if (tipoViaturaOrError.isFailure) {
          return res.status(402).send(tipoViaturaOrError.errorValue());
        }
  
        const tipoViaturaDTO = tipoViaturaOrError.getValue();
        return res.status(201).json(tipoViaturaDTO);
      }
      catch (e) {
        if (e instanceof Result)
          return res.status(402).send(e.errorValue());
        else
          next(e);
      }
    }
}