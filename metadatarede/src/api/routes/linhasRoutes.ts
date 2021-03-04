import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import ILinhaController from '../../controllers/IControllers/ILinhaController';
import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/linhas', route);

    const controller = Container.get(config.controller.linha.name) as ILinhaController;
    
    route.post('', celebrate({
        body: Joi.object({
            id: Joi.string().required().min(1).max(1).required(),
            noInicial: Joi.string().required(),
            noFinal: Joi.string().required(),
            nome: Joi.string().required(),
            idTiposTripulante: Joi.array().items(Joi.string()),
            idTiposViatura: Joi.array().items(Joi.string()),
            cor: Joi.string().required()
        })
    }),
    (req, res, next) => controller.criarLinha(req, res, next) );

    route.get('', (req, res, next) => controller.listarLinhas(req, res, next));

    route.get('/:id',(req,res,next) => controller.getLinhaById(req,res,next));

    route.get('/all/sorted',
    (req, res, next) => controller.listarLinhasOrdenadosPorId(req, res, next));
};

