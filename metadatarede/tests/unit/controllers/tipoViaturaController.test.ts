import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../../config";
import ITipoViaturaService from '../../../src/services/IServices/ITipoViaturaService';
import ITipoViaturaDTO from '../../../src/dto/ITipoViaturaDTO';
import TipoViaturaService from '../../../src/services/tipoViaturaService';
import { Result } from '../../../src/core/logic/Result';
import { CustoKM } from '../../../src/domain/custokm';
import { Combustivel } from '../../../src/domain/combustivel';
import { isMainThread } from 'worker_threads';
import TipoViaturaController from '../../../src/controllers/tipoViaturaController';

describe('tipoViatura Controller Create', function () {
    beforeEach(function() {
        let tipoViaturaServiceClass = require('../../../src/services/'+config.services.tipoViatura.path).default;
        let tipoViaturaServiceInstace: ITipoViaturaService = Container.get(tipoViaturaServiceClass);
    
        let ck: CustoKM = CustoKM.create({valor: 2, moeda: "EUR"}).getValue();

        var tipoViaturaDTO: ITipoViaturaDTO = {"id": 'tv1',
                                                "codigo": "12345678901234567890",
                                                "descricao": "Autocarros",
                                                "combustivel": 23,
                                                "autonomia": 200,
                                                "velocidadeMedia": 30,
                                                "custoKM": ck,
                                                "consumoMedio": 5} as ITipoViaturaDTO;

        const stub = sinon.stub(tipoViaturaServiceInstace as TipoViaturaService, 'criarTipoViatura').resolves(new Result<ITipoViaturaDTO>(true, null, tipoViaturaDTO));
        Container.set(config.services.tipoViatura.name, tipoViaturaServiceInstace);
    })

    it('returns json with id+name values', async function () {
        let body = {
            "id": 'tv1',
            "codigo": "12345678901234567890",
            "descricao": "Autocarros",
            "combustivel": 23,
            "autonomia": 200,
            "velocidadeMedia": 30,
            "custoKM": {valor: 2, moeda: "EUR"},
            "consumoMedio": 5
        };

        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };
        
        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => {};

        const ctrl = new TipoViaturaController(Container.get(config.services.tipoViatura.name));
        await ctrl.criarTipoViatura(<Request> req, <Response> res, <NextFunction> next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, body);

    })
})