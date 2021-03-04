import { expect } from 'chai';
import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../../config";

import TipoTripulanteService from "../../../src/services/tipoTripulanteService";
import { Result } from "../../../src/core/logic/Result";
import ITipoTripulanteDTO from '../../../src/dto/ITipoTripulanteDTO';
import ITipoTripulanteRepo from '../../../src/repos/IRepos/ITipoTripulanteRepo';
import { TipoTripulante } from '../../../src/domain/tipoTripulante';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

describe('tipoTripulante service create', function () {

	beforeEach(function() {
		let tipoTripulanteRepoClass = require("../../../src/repos/"+config.repos.tipoTripulante.path).default;
		let tipoTripulanteRepoInstance: ITipoTripulanteRepo = Container.get(tipoTripulanteRepoClass)

		var tipoTripulante : TipoTripulante = TipoTripulante.create({ "id": "tp1","description": "Fala inglês" } as ITipoTripulanteDTO, new UniqueEntityID("tp1")).getValue();
		const stub = sinon.stub(tipoTripulanteRepoInstance as ITipoTripulanteRepo, 'save').resolves(new Result<TipoTripulante>(true, null, tipoTripulante));
		Container.set(config.repos.tipoTripulante.name, tipoTripulanteRepoInstance);
		
	});
		
    it('returns dto with id, description', async function () {
		let tipoTripulanteDTOExpected: ITipoTripulanteDTO = { "id": "tp1","description": "Fala inglês" } as ITipoTripulanteDTO;

		const srv = new TipoTripulanteService(Container.get(config.repos.tipoTripulante.name));

        let actual: ITipoTripulanteDTO= await (await srv.criarTipoTripulante(tipoTripulanteDTOExpected)).getValue();

        expect(actual.id).to.equal(tipoTripulanteDTOExpected.id);
        expect(actual.description).to.equal(tipoTripulanteDTOExpected.description);
	});
});