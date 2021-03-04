import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import INoController from '../../controllers/IControllers/INoController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/nos', route);
  
  const ctrl = Container.get<INoController>(config.controller.no.name);

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        id_abreviature: Joi.string().required(),
        xCoordinate: Joi.number().required(),
        yCoordinate: Joi.number().required(),
        type: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.criarNo(req, res, next) );

    route.post('/modelo',
    celebrate({
      body: Joi.object({
        id_abreviature: Joi.string().required(),
        modelo: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.adicionarModelo(req, res, next) );

    route.get('', (req, res, next) => ctrl.listarNos(req, res, next));

    route.get('/all/sorted',
    (req, res, next) => ctrl.listarNosOrdenadosPorId(req, res, next));

    route.get('/:id',(req, res,next) => ctrl.getNoById(req,res,next));
};