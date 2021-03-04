import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPercursoController from '../../controllers/IControllers/IPercursoController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/percursos', route);

  const ctrl = Container.get(config.controller.percurso.name) as IPercursoController;
  
  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        segmentosRede:Joi.array().items(Joi.object({
            id:Joi.string().required(),
            idNoInicio: Joi.string().required(),
            idNoFim: Joi.string().required(),
            distancia: Joi.object({
                value: Joi.number().required(),
                unidadeDistancia: Joi.string().required()
            }).required(),
            tempoViagem: Joi.object({
                value: Joi.number().required(),
                unidadeTempo: Joi.string().required()
            }).required(),
        })).required(),
        idLinha: Joi.string().required(),
        direcao: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.criarPercurso(req, res, next) );


    route.get('', celebrate({
      body: Joi.object({
        idLinha: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.listarPercursosDumaLinha(req, res, next));

    route.get('/linhas/:id', (req, res, next) => ctrl.listarPercursosDumaLinha2(req, res, next));

    route.get('/all/sorted',
    (req, res, next) => ctrl.listarPercursosOrdenadosPorLinha(req, res, next));

    route.get('/:id',(req,res,next)=> ctrl.getPercursoById(req,res,next));
};