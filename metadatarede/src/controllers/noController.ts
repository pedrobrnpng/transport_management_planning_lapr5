import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import INoController from "./IControllers/INoController";
import INoService from '../services/IServices/INoService';
import INoDTO from '../dto/INoDTO';

import { Result } from "../core/logic/Result";

export default class NoController implements INoController {
  constructor(
    @Inject(config.services.no.name) private NoServiceInstance: INoService
  ) { }

  public async criarNo(req: Request, res: Response, next: NextFunction) {
    try {
      const NoOrError = await this.NoServiceInstance.criarNo(req.body as INoDTO);

      if (NoOrError.isFailure) {
        return res.status(400).send();
      }

      const NoDTO = NoOrError.getValue();
      return res.status(201).json(NoDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(400).send(e.errorValue());
      else
        next(e);
    }
  }

  public async listarNos(req: Request, res: Response, next: NextFunction) {
    try {
      const nosOrError = await this.NoServiceInstance.listarNos();
      
      if (nosOrError.isFailure) {
        return res.status(400).send(nosOrError.errorValue());
      }

      const noDTO = nosOrError.getValue();
      return res.status(201).json( noDTO );
    }
    catch (e) {
      if(e instanceof Result) 
        return res.status(400).send(e.errorValue());
      else 
        next(e);
    }
  }

  public async getNoById(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoTripulanteOrError = await this.NoServiceInstance.getNoById({id_abreviature: req.params.id} as INoDTO);

      if (tipoTripulanteOrError.isFailure) {
        return res.status(402).send(tipoTripulanteOrError.errorValue());
      }

      const tipoTripulanteDTO = tipoTripulanteOrError.getValue();
      return res.status(201).json(tipoTripulanteDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async listarNosOrdenadosPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const nosOrError = await this.NoServiceInstance.listarNosOrdenadosPorId();

      if (nosOrError.isFailure) {
        return res.status(400).send(nosOrError.errorValue());
      }

      const nosDTO = nosOrError.getValue();
      return res.status(201).json(nosDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(400).send(e.errorValue());
      else
        next(e);
    }
  }
  
  public async adicionarModelo(req: Request, res: Response, next: NextFunction) {
    try {
      const NoOrError = await this.NoServiceInstance.adicionarModelo(req.body as INoDTO);

      if (NoOrError.isFailure) {
        return res.status(400).send(NoOrError.errorValue());
      }

      const NoDTO = NoOrError.getValue();
      return res.status(201).json(NoDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(400).send(e.errorValue());
      else
        next(e);
    }
  }
}