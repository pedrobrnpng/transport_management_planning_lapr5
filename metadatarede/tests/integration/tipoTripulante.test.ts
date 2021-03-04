import { expect } from 'chai';
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import ITipoTripulanteService from "../../src/services/IServices/ITipoTripulanteService";

import TipoTripulanteController from "../../src/controllers/tipoTripulanteController";
import { Result } from "../../src/core/logic/Result";
import ITipoTripulanteDTO from '../../src/dto/ITipoTripulanteDTO';
import TipoTripulanteService from '../../src/services/tipoTripulanteService';
import ITipoTripulanteRepo from '../../src/repos/IRepos/ITipoTripulanteRepo';
import { TipoTripulante } from '../../src/domain/tipoTripulante';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import { Model, Document } from 'mongoose';
import { ITipoTripulantePersistence } from '../../src/dataschema/ITipoTripulantePersistence';
import TipoTripulanteRepo from '../../src/repos/tipoTripulanteRepo';

describe('tipoTripulante create', function () {

    it('returns json with id+name values', async function () {
        let stub;

        let tipoTripulanteRepoClass = require("../../src/repos/" + config.repos.tipoTripulante.path).default;
        let tipoTripulanteRepoInstance: ITipoTripulanteRepo = Container.get(tipoTripulanteRepoClass)

        var tipoTripulante: TipoTripulante = TipoTripulante.create({ "id": "tp1", "description": "Fala inglês" } as ITipoTripulanteDTO, new UniqueEntityID("tp1")).getValue();
        stub = sinon.stub(tipoTripulanteRepoInstance as ITipoTripulanteRepo, 'save').resolves(new Result<TipoTripulante>(true, null, tipoTripulante));
        Container.set(config.repos.tipoTripulante.name, tipoTripulanteRepoInstance);

        let body = { "id": 'tp1', "description": "Fala inglês" };
        let req: Partial<Request> = { body };

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new TipoTripulanteController(new TipoTripulanteService(Container.get(config.repos.tipoTripulante.name)));

        await ctrl.criarTipoTripulante(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, { "id": "tp1", "description": "Fala inglês" });
        
        await ctrl.listarTiposTripulante(<Request> req, <Response> res, <NextFunction> next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            description: "Fala inglês",
            id: "tp1"           
        });
        
        stub.restore();
    });

    it('returns json with id+name values', async function () {
        let tipoTripulantePersistence = { domainId: "Tp1", description: "Fala inglês" };

        let tipoTripulanteSchemaInstance: Model<ITipoTripulantePersistence & Document> = require("../../src/persistence/schemas/tipoTripulanteSchema").default;
        const stub1 = sinon.stub(tipoTripulanteSchemaInstance as Model<ITipoTripulantePersistence & Document>, 'create').resolves(tipoTripulantePersistence);
        const stub2 = sinon.stub(tipoTripulanteSchemaInstance as Model<ITipoTripulantePersistence & Document>, 'findOne').resolves(null);
        Container.set('tipoTripulanteSchema', tipoTripulanteSchemaInstance);

        //test
        let body = {
            "id": "tp1",
            "description": "Fala inglês"
        };
        let req: Partial<Request> = { body };

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new TipoTripulanteController(new TipoTripulanteService(new TipoTripulanteRepo(Container.get('tipoTripulanteSchema'))) as ITipoTripulanteService);

        await ctrl.criarTipoTripulante(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            description: "Fala inglês", 
            id: "tp1"
        });
        
        stub1.restore();
        stub2.restore();
    });
});