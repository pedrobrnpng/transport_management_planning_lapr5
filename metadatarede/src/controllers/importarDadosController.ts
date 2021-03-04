import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";
import Busboy from 'busboy';
import morgan from 'morgan';

import IImportarDadosController from "./IControllers/IImportarDadosController";
import IImportarDadosService from '../services/IServices/IImportarDadosService';

import { Result } from "../core/logic/Result";

export default class ImportarDadosController implements IImportarDadosController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.importarDados.name) private importarDadosService : IImportarDadosService
  ) {}

  public async importarDados(req: string, res: Response, next: NextFunction) {
    try {
      const importarDadosOrError = await this.importarDadosService.importarDados(req) as Result<string>;

      if (importarDadosOrError.isFailure) {
        return res.status(402).send("Erro na importação de dados.");
      }

      return res.status(201).json(importarDadosOrError.getValue());
    }
    catch (e) {
      return next(e);
    }
  };
}
