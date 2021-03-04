import { expect } from 'chai';
import * as sinon from 'sinon';

import { Container } from 'typedi';


import TipoTripulanteRepo from "../../../src/repos/tipoTripulanteRepo";
import ITipoTripulanteDTO from '../../../src/dto/ITipoTripulanteDTO';
import { TipoTripulante } from '../../../src/domain/tipoTripulante';
import { Document, Model } from 'mongoose';
import { ITipoTripulantePersistence } from '../../../src/dataschema/ITipoTripulantePersistence';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

describe('tipoTripulante repo create', function () {
	let stub;
	beforeEach(function() {
		let tipoTripulanteSchemaInstance: Model<ITipoTripulantePersistence & Document> = require("../../../src/persistence/schemas/tipoTripulanteSchema").default;
		let tipoTripulantePersistence = {domainId:"tp1",description:"Fala inglês"} ;
		stub = sinon.stub(tipoTripulanteSchemaInstance as Model<ITipoTripulantePersistence & Document>, 'create').resolves(tipoTripulantePersistence);
		sinon.stub(tipoTripulanteSchemaInstance as Model<ITipoTripulantePersistence & Document>, 'findOne').resolves(null);
		Container.set('tipoTripulanteSchema', tipoTripulanteSchemaInstance);
		
	});
		
    it('return with id and description', async function () {

		var tipoTripulanteExpected : TipoTripulante = TipoTripulante.create({ "id": "tp1","description": "Fala inglês" } as ITipoTripulanteDTO, new UniqueEntityID("tp1")).getValue();

		const rep = new TipoTripulanteRepo(Container.get('tipoTripulanteSchema'));

		let actual = await rep.save(tipoTripulanteExpected);
		expect(actual.id.toString()).to.equal(tipoTripulanteExpected.id.toString());
		expect(actual.description).to.equal(tipoTripulanteExpected.description);
	});

	afterEach(() => {
		stub.restore();
	})
});