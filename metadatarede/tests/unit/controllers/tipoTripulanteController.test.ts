import { expect } from 'chai';
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../../config";

import ITipoTripulanteService from "../../../src/services/IServices/ITipoTripulanteService";

import TipoTripulanteController from "../../../src/controllers/tipoTripulanteController";
import { Result } from "../../../src/core/logic/Result";
import ITipoTripulanteDTO from '../../../src/dto/ITipoTripulanteDTO';
import TipoTripulanteService from '../../../src/services/tipoTripulanteService';

describe('tipoTripulante controller create', function () {

	beforeEach(function() {
		let tipoTripulanteServiceClass = require("../../../src/services/"+config.services.tipoTripulante.path).default;
		let tipoTripulanteServiceInstance: ITipoTripulanteService = Container.get(tipoTripulanteServiceClass)

		var tipoTripulanteDTO : ITipoTripulanteDTO = { "id": "tp1","description": "Fala inglês" } as ITipoTripulanteDTO;
		const stub = sinon.stub(tipoTripulanteServiceInstance as TipoTripulanteService, 'criarTipoTripulante').resolves(new Result<ITipoTripulanteDTO>(true, null, tipoTripulanteDTO));
		Container.set(config.services.tipoTripulante.name, tipoTripulanteServiceInstance);
		
	});
		
    it('returns json with id+name values', async function () {

        let body = { "name":'tipoTripulante1' };
		let req: Partial<Request> = {};
		
        let res: Partial<Response> = {
			status: sinon.stub(),
			json: sinon.stub()
		};

		(res.status as sinon.SinonStub).returnsThis();

		let next: Partial<NextFunction> = () => {};

		const ctrl = new TipoTripulanteController(Container.get(config.services.tipoTripulante.name));

        await ctrl.criarTipoTripulante(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
		sinon.assert.calledWithMatch(res.json as sinon.SinonStub, { "id": "tp1","description": "Fala inglês"});
	});
});