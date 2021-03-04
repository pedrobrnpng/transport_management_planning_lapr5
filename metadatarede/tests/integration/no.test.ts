import * as sinon from 'sinon';
import {describe } from 'mocha'

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";
import { Result } from "../../src/core/logic/Result";

import INoRepo from '../../src/repos/IRepos/INoRepo';
import { No } from '../../src/domain/no';
import INoDTO from '../../src/dto/INoDTO';
import NoController from '../../src/controllers/noController';
import NoService from '../../src/services/noService';
import { Abreviatura } from '../../src/domain/abreviatura';

const name = "Amial";
const id = "AML";
const type = "paragem";
const latitude = 90;
const longitude = 90;

describe('No integration tests', function () {

    it('retorna json', async function() {
        let stub,stub1;

        let noDTO: INoDTO = {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        };
 
        let no: No = No.create(noDTO, Abreviatura.create(noDTO.id_abreviature).getValue()).getValue();

        let noRepoClass = require('../../src/repos/noRepo').default;
        let noRepoInstance: INoRepo = Container.get(noRepoClass);
    
        stub = sinon.stub(noRepoInstance as INoRepo, 'save').resolves(new Result<No>(true, null, no));
        stub1 = sinon.stub(noRepoInstance as INoRepo, 'findAll').resolves([no]);
        Container.set(config.repos.no.name, noRepoInstance);

        let body = {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        };

        let req: Partial<Request> = {body};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => {};

        const controller = new NoController(new NoService(Container.get(config.repos.no.name)));

        await controller.criarNo(<Request> req, <Response> res, <NextFunction> next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, 
            {
                id_abreviature: id,
                name: name,
                type: type,
                xCoordinate: latitude,
                yCoordinate: longitude
            });
        await controller.listarNos(<Request> req, <Response> res, <NextFunction> next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, 
            {
                id_abreviature: id,
                name: name,
                type: type,
                xCoordinate: latitude,
                yCoordinate: longitude
            });
        stub.restore();
        stub1.restore();
    });

});