import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { Container } from 'typedi';
import IImportarDadosController from '../../controllers/IControllers/IImportarDadosController'; 
import morgan from 'morgan'

import config from "../../../config";

const route = Router();

export default (app: Router) => {

  app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true
  }));
  app.use(morgan('dev'));
  app.use('/importarDados', route);
  
  const ctrl = Container.get(config.controller.importarDados.name) as IImportarDadosController;
  route.post('', (req, res, next) => {
    //@ts-ignore
    ctrl.importarDados(req.files.file.tempFilePath, res, next)
  });
};