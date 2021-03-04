import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";

import IPercursoController from "./IControllers/IPercursoController";
import IPercursoService from '../services/IServices/IPercursoService';
import IPercursoDTO from '../dto/IPercursoDTO';

import { Result } from "../core/logic/Result";

export default class PercursoController implements IPercursoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.percurso.name) private percursoServiceInstance: IPercursoService
  ) { }

  public async criarPercurso(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.criarPercurso(req.body as IPercursoDTO) as Result<IPercursoDTO>;
      if (percursoOrError.isFailure) {
        return res.status(402).send(percursoOrError.errorValue());
      }

      const percursoDTO = percursoOrError.getValue();
      return res.status(201).json(percursoDTO);
    }
    catch (e) {
      if (e instanceof Result) return res.status(402).send(e.errorValue());
      else next(e);
    }
  }

  public async listarPercursosDumaLinha(req: Request, res: Response, next: NextFunction) {
    try {
      const percursosOrError = await this.percursoServiceInstance.listarPercursoDumaLinha(req.body as IPercursoDTO) as Result<Array<IPercursoDTO>>;

      if (percursosOrError.isFailure) {
        return res.status(402).send(percursosOrError.errorValue());
      }

      const percursosDTO = percursosOrError.getValue();
      return res.status(201).json(percursosDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async listarPercursosDumaLinha2(req: Request, res: Response, next: NextFunction) {
    try {
      const percursosOrError = await this.percursoServiceInstance.listarPercursoDumaLinha2({ id: req.params.id } as IPercursoDTO) as Result<Array<IPercursoDTO>>;

      if (percursosOrError.isFailure) {
        return res.status(402).send(percursosOrError.errorValue());
      }

      const percursosDTO = percursosOrError.getValue();
      return res.status(201).json(percursosDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async listarPercursosOrdenadosPorLinha(req: Request, res: Response, next: NextFunction) {
    try {
      const percursosOrError = await this.percursoServiceInstance.listarPercursosOrdenadosPorLinha();

      if (percursosOrError.isFailure) {
        return res.status(402).send(percursosOrError.errorValue());
      }

      const percursosDTO = percursosOrError.getValue();
      return res.status(201).json(percursosDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getPercursoById(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoTripulanteOrError = await this.percursoServiceInstance.getPercursoById({ id: req.params.id } as IPercursoDTO) as Result<IPercursoDTO>;

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
