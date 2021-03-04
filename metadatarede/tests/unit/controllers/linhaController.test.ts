import { expect } from 'chai';
import * as sinon from 'sinon';
import { describe } from 'mocha';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../../config";

import ILinhaService from "../../../src/services/IServices/ILinhaService";
import LinhaService from "../../../src/services/linhaService";
import ILinhaDTO from '../../../src/dto/ILinhaDTO';
import { Result } from '../../../src/core/logic/Result';
import LinhaController from '../../../src/controllers/linhaController';


describe('linha controller create', function () {
    let stub1, stub2;
    beforeEach(function() {
        let linhaServiceClass = require("../../../src/services/" + config.services.linha.path).default;
        let linhaServiceInstance: ILinhaService = Container.get(linhaServiceClass);
        let linhaDTO: ILinhaDTO = {
            id: "3",
            codigo: "3",
            nome: "Camapnha",
            idTiposViatura: [],
            idTiposTripulante: []} as ILinhaDTO;
        stub1 = sinon.stub(linhaServiceInstance as LinhaService, 'criarLinha').resolves(new Result<ILinhaDTO>(true, null, linhaDTO));
        stub2 = sinon.stub(linhaServiceInstance as LinhaService, 'listarLinhas').resolves(new Result<Array<ILinhaDTO>>(true, null, [linhaDTO]));
        Container.set(config.services.linha.name, linhaServiceInstance);
    })

    it('returns json with id+name values', async function () {
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => {};

        const ctrl = new LinhaController(Container.get(config.services.linha.name));

        await ctrl.criarLinha(<Request> req, <Response> res, <NextFunction> next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            "id": "3",
            "codigo": "3",
            "nome": "Camapnha",
            "idTiposViatura": [],
            "idTiposTripulante": []
        })
    });

    it('returns json array with all linhas', async function () {

        let body = {};
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new LinhaController(Container.get(config.services.linha.name));

        await ctrl.listarLinhas(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, [{
            "id": "3",
            "codigo": "3",
            "nome": "Camapnha",
            "idTiposViatura": [],
            "idTiposTripulante": []
        }]);

    });

    afterEach(function () {
        stub1.restore();
        stub2.restore();
    });
})