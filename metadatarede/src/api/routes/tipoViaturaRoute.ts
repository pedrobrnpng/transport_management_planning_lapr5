import { Router } from 'express';
import {celebrate, Joi } from 'celebrate';
import config from "../../../config";
import { Container } from 'typedi';
import ITipoViaturaController from '../../controllers/IControllers/ITipoViaturaController';

const route = Router();

export default (app: Router) => {
    app.use('/tipoViatura', route);
    const controller = Container.get(config.controller.tipoViatura.name) as ITipoViaturaController;

    route.post('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required().length(20),
                descricao: Joi.string().required(),
                combustivel: Joi.number(),
                autonomia: Joi.number().min(0),
                velocidadeMedia: Joi.number().min(0),
                custoKM: Joi.object({
                    valor: Joi.number().min(0),
                    moeda: Joi.string().max(3)
                }),
                consumoMedio: Joi.number().min(0)
            })
        }),
        (req, res, next) => controller.criarTipoViatura(req, res, next));

    route.get('', (req, res, next) => controller.listarTiposViatura(req, res, next));    

    route.get('/:id', (req,res,next) => controller.getTipoViaturaById(req,res,next));

}