import { expect } from 'chai';
import * as sinon from 'sinon';
import { describe } from 'mocha';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../../config";

import IPercursoService from "../../../src/services/IServices/IPercursoService";

import PercursoController from "../../../src/controllers/percursoController";
import { Result } from "../../../src/core/logic/Result";
import IPercursoDTO from '../../../src/dto/IPercursoDTO';
import PercursoService from '../../../src/services/percursoService';
import ISegmentoRedeDTO from '../../../src/dto/ISegmentoRedeDTO';
import IDistanciaDTO from '../../../src/dto/IDistanciaDTO';
import ITempoViagemDTO from '../../../src/dto/ITempoViagemDTO';

describe('percurso controller create', function () {
    let stub1, stub2;
    beforeEach(function () {
        let percursoServiceClass = require("../../../src/services/" + config.services.percurso.path).default;
        let percursoServiceInstance: IPercursoService = Container.get(percursoServiceClass)
        let sr: ISegmentoRedeDTO[] = [];
        let sg1 = {
            id: "sg1",
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: { value: 10, unidadeDistancia: "km" } as IDistanciaDTO,
            tempoViagem: { value: 11, unidadeTempo: "h" } as ITempoViagemDTO,
            sequencia: 1
        } as ISegmentoRedeDTO;
        sr.push(sg1);
        var percursoDTO: IPercursoDTO = { id: "p1", segmentosRede: sr, idLinha: "linha1", direcao: "ida" } as IPercursoDTO;
        stub1 = sinon.stub(percursoServiceInstance as PercursoService, 'criarPercurso').resolves(new Result<IPercursoDTO>(true, null, percursoDTO));
        stub2 = sinon.stub(percursoServiceInstance as PercursoService, 'listarPercursoDumaLinha').resolves(new Result<Array<IPercursoDTO>>(true, null, [percursoDTO]));
        Container.set(config.services.percurso.name, percursoServiceInstance);

    });

    it('returns json with id+name values', async function () {

        let body = { "name": 'percurso1' };
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new PercursoController(Container.get(config.services.percurso.name));

        await ctrl.criarPercurso(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            "id": "p1",
            "segmentosRede": [{
                "id": "sg1",
                "idNoInicio": "no1",
                "idNoFim": "no2",
                "distancia": {
                    "value": 10,
                    "unidadeDistancia": "km"
                },
                "tempoViagem": {
                    "value": 11,
                    "unidadeTempo": "h"
                },
                "sequencia": 1
            }],
            "idLinha": "linha1",
            "direcao": "ida"
        });
    });

    it('returns json array with percursos with the same idLinha', async function () {

        let body = { "idLinha": '1' };
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new PercursoController(Container.get(config.services.percurso.name));

        await ctrl.listarPercursosDumaLinha(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, [{
            "id": "p1",
            "segmentosRede": [{
                "id": "sg1",
                "idNoInicio": "no1",
                "idNoFim": "no2",
                "distancia": {
                    "value": 10,
                    "unidadeDistancia": "km"
                },
                "tempoViagem": {
                    "value": 11,
                    "unidadeTempo": "h"
                },
                "sequencia": 1
            }],
            "idLinha": "linha1",
            "direcao": "ida"
        }]);

    });

    afterEach(function () {
        stub1.restore();
        stub2.restore();
    });
});