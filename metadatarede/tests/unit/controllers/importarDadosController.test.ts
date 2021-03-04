import { expect } from 'chai';
import * as sinon from 'sinon';
import {describe} from 'mocha'

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../../config";

import IImportarDadosService from "../../../src/services/IServices/IImportarDadosService";

import ImportarDadosController from "../../../src/controllers/importarDadosController";
import { Result } from "../../../src/core/logic/Result";
import ImportarDadosService from '../../../src/services/importarDadosService';

describe('importarDados controller create', function () {
    let stub1;
    beforeEach(function() {
        let importarDadosServiceClass = require("../../../src/services/" + config.services.importarDados.path).default;
        let importarDadosServiceInstance: IImportarDadosService = Container.get(importarDadosServiceClass);
        stub1 = sinon.stub(importarDadosServiceInstance as ImportarDadosService, 'importarDados').resolves(new Result<string>(true, null, "Dados importados: ver resultado na consola."));
        Container.set(config.services.importarDados.name, importarDadosServiceInstance);
    });

    it("returns string", async function() {
        let body = { "filename": "import.glx" };
        let req: string = body.filename;

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();
        let next: Partial<NextFunction> = () => { };
        const ctrl = new ImportarDadosController(Container.get(config.services.importarDados.name));
        await ctrl.importarDados(req,<Response>res,<NextFunction>next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub,"Dados importados: ver resultado na consola.");
    });

    afterEach(function () {
        stub1.restore();
    });
});