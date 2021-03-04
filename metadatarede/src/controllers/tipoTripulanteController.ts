import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import ITipoTripulanteController from "./IControllers/ITipoTripulanteController";
import ITipoTripulanteService from '../services/IServices/ITipoTripulanteService';
import ITipoTripulanteDTO from '../dto/ITipoTripulanteDTO';

import { Result } from "../core/logic/Result";

export default class TipoTripulanteController implements ITipoTripulanteController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.tipoTripulante.name) private tipoTripulanteServiceInstance: ITipoTripulanteService
  ) { }

  public async criarTipoTripulante(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoTripulanteOrError = await this.tipoTripulanteServiceInstance.criarTipoTripulante(req.body as ITipoTripulanteDTO) as Result<ITipoTripulanteDTO>;

      if (tipoTripulanteOrError.isFailure) {
        return res.status(402).send();
      }

      const tipoTripulanteDTO = tipoTripulanteOrError.getValue();
      return res.status(201).json(tipoTripulanteDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listarTiposTripulante(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoTripulanteOrError = await this.tipoTripulanteServiceInstance.listarTiposTripulante() as Result<Array<ITipoTripulanteDTO>>;

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

  public async getTipoTripulanteById(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoTripulanteOrError = await this.tipoTripulanteServiceInstance.getTipoTripulanteById({id: req.params.id} as ITipoTripulanteDTO) as Result<ITipoTripulanteDTO>;

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
}