import { expect } from 'chai';
import * as sinon from 'sinon';
import { describe } from 'mocha';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../../config";

import INoService from "../../../src/services/IServices/INoService";

import NoController from "../../../src/controllers/noController";
import { Result } from "../../../src/core/logic/Result";
import INoDTO from '../../../src/dto/INoDTO';
import NoService from '../../../src/services/noService';

const name = "Amial";
const id = "AML";
const type = "paragem";
const latitude = 90;
const longitude = 90;

describe('no controller create', function () {
    let stub1,stub2;
    beforeEach(function () {
        let noServiceClass = require("../../../src/services/" + config.services.no.path).default;
        let noServiceInstance: INoService = Container.get(noServiceClass)
        let noDTO: INoDTO = {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        };
        stub1=sinon.stub(noServiceInstance as NoService, 'criarNo').resolves(new Result<INoDTO>(true, null, noDTO));
        stub2=sinon.stub(noServiceInstance as NoService, 'listarNos').resolves(new Result<Array<INoDTO>>(true, null, [noDTO]));
        Container.set(config.services.no.name, noServiceInstance);

    });

    it('returns json with id+name+type+coordinates values', async function () {

        let body = {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        };
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new NoController(Container.get(config.services.no.name));

        await ctrl.criarNo(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        });
    });

    it('returns json array with all nos', async function () {

        let body = {};
        let req: Partial<Request> = {};

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new NoController(Container.get(config.services.no.name));

        await ctrl.listarNos(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, [{
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        }]);

    });

    afterEach(function () {
        stub1.restore();
        stub2.restore();
    });
});