import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from '../../config';
import ILinhaController from "./IControllers/ILinhaController";
import ILinhaService from "../services/IServices/ILinhaService";
import ILinhaDTO from "../dto/ILinhaDTO";

import { Result } from "../core/logic/Result";

export default class LinhaController implements ILinhaController {

  constructor(
    @Inject(config.services.linha.name) private linhaServiceInstance: ILinhaService
  ) { }

  public async criarLinha(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const linhaOrError = await this.linhaServiceInstance.criarLinha(req.body as ILinhaDTO) as Result<ILinhaDTO>;

      if (linhaOrError.isFailure) {
        return res.status(402).send();
      }

      const linhaDTO = linhaOrError.getValue();
      return res.status(201).json(linhaDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async listarLinhas(req: Request, res: Response, next: NextFunction) {
    try {
      const linhasOrError = await this.linhaServiceInstance.listarLinhas() as Result<Array<ILinhaDTO>>;

      if (linhasOrError.isFailure) {
        return res.status(402).send(linhasOrError.errorValue());
      }

      const linhaDTO = linhasOrError.getValue();
      return res.status(201).json(linhaDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

  public async getLinhaById(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoTripulanteOrError = await this.linhaServiceInstance.getLinhaById({ id: req.params.id } as ILinhaDTO) as Result<ILinhaDTO>;

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

  public async listarLinhasOrdenadosPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const linhasOrError = await this.linhaServiceInstance.listarLinhasOrdenadosPorId();

      if (linhasOrError.isFailure) {
        return res.status(402).send(linhasOrError.errorValue());
      }

      const linhasDTO = linhasOrError.getValue();
      return res.status(201).json(linhasDTO);
    }
    catch (e) {
      if (e instanceof Result)
        return res.status(402).send(e.errorValue());
      else
        next(e);
    }
  }

}
