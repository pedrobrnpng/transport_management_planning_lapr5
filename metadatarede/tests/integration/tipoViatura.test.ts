import { expect } from 'chai';
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";
import { Result } from "../../src/core/logic/Result";

import ITipoViaturaRepo from '../../src/repos/IRepos/ITipoViaturaRepo';
import { TipoViatura } from '../../src/domain/tipoViatura';
import { CustoKM } from '../../src/domain/custokm';
import ITipoViaturaDTO from '../../src/dto/ITipoViaturaDTO';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import TipoViaturaController from '../../src/controllers/tipoViaturaController';
import TipoViaturaService from '../../src/services/tipoViaturaService';
import { Combustivel, CombustivelEnum } from '../../src/domain/combustivel';

describe('tipoviatura integration tests', function () {

    it('retorna json', async function() {
        let stub;

        let ck: CustoKM = CustoKM.create({valor: 2, moeda: "EUR"}).getValue();
 
        let tipoViatura: TipoViatura = TipoViatura.create({
            descricao: "Autocarros",
            combustivel: 23,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: ck,
            consumoMedio: 5} as ITipoViaturaDTO, new UniqueEntityID("12345678901234567890")).getValue();

        let tipoViaturaRepoClass = require('../../src/repos/tipoViaturaRepo').default;
        let tipoViaturaRepoInstance: ITipoViaturaRepo = Container.get(tipoViaturaRepoClass);
    
        stub = sinon.stub(tipoViaturaRepoInstance as ITipoViaturaRepo, 'save').resolves(new Result<TipoViatura>(true, null, tipoViatura));
        Container.set(config.repos.tipoViatura.name, tipoViaturaRepoInstance);

        let body = {
                    "id": "12345678901234567890",
                    "descricao": "Autocarros",
                    "combustivel": 23,
                    "autonomia": 200,
                    "velocidadeMedia": 30,
                    "custoKM": {"valor": 5, "moeda": "EUR"},
                    "consumoMedio": 5};

        let req: Partial<Request> = {body};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => {};

        const controller = new TipoViaturaController(new TipoViaturaService(Container.get(config.repos.tipoViatura.name)));

        await controller.criarTipoViatura(<Request> req, <Response> res, <NextFunction> next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, 
            {id: '12345678901234567890',
            descricao: "Autocarros",
            combustivel: 23,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: {valor: 5, moeda: "EUR"},
            consumoMedio: 5});

        await controller.listarTiposViatura(<Request> req, <Response> res, <NextFunction> next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, 
            {
            id: "12345678901234567890",
            descricao: "Autocarros",
            combustivel: 23,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: {valor: 5, moeda: "EUR"},
            consumoMedio: 5
        });
        stub.restore();
    });

});