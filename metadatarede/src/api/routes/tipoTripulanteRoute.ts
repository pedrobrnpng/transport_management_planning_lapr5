import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITipoTripulanteController from '../../controllers/IControllers/ITipoTripulanteController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/tipoTripulantes', route);
  
  const ctrl = Container.get(config.controller.tipoTripulante.name) as ITipoTripulanteController;

  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        description: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.criarTipoTripulante(req, res, next) );

    route.get('', (req, res, next) => ctrl.listarTiposTripulante(req, res, next));    

    route.get('/:id', (req,res,next) => ctrl.getTipoTripulanteById(req,res,next));

};