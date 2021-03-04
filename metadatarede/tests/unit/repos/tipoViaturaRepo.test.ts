import { expect } from 'chai';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { Document, Model } from 'mongoose';

import TipoViaturaRepo from "../../../src/repos/tipoViaturaRepo";
import ITipoViaturaDTO from '../../../src/dto/ITipoViaturaDTO';
import { TipoViatura } from '../../../src/domain/tipoViatura';
import { ITipoViaturaPersistence } from '../../../src/dataschema/ITipoViaturaPersistence';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { CustoKM } from '../../../src/domain/custokm';


describe('tipo viatura repo create', function () {
    let stub;
	beforeEach(function() {
         
		let tipoViaturaSchemaInstance: Model<ITipoViaturaPersistence & Document> = require("../../../src/persistence/schemas/tipoViaturaSchema").default;
        let tipoViaturaPersistence = {
                                domainId: "12345678901234567890",
                                descricao: "Autocarros",
                                combustivel: 23,
                                autonomia: 200,
                                velocidadeMedia: 30,
                                custoKM: CustoKM.create({valor: 2, moeda: "EUR"}).getValue(),
                                consumoMedio: 5} ;
		stub = sinon.stub(tipoViaturaSchemaInstance as Model<ITipoViaturaPersistence & Document>, 'create').resolves(tipoViaturaPersistence);
		sinon.stub(tipoViaturaSchemaInstance as Model<ITipoViaturaPersistence & Document>, 'findOne').resolves(null);
		Container.set('tipoViaturaSchema', tipoViaturaSchemaInstance);
		
	});
		
    it('return with id and description', async function () {

		var tipoViaturaExpected : TipoViatura = TipoViatura.create({ 
                                          descricao: "Autocarros",
                                          combustivel: 23,
                                          autonomia: 200,
                                          velocidadeMedia: 30,
                                          custoKM: CustoKM.create({valor: 2, moeda: "EUR"}).getValue(),
                                          consumoMedio: 5} as ITipoViaturaDTO, new UniqueEntityID("12345678901234567890")).getValue();

		const rep = new TipoViaturaRepo(Container.get('tipoViaturaSchema'));

		let actual = await rep.save(tipoViaturaExpected);
		expect(actual.id.toString()).to.equal(tipoViaturaExpected.id.toString());
    });
    
    afterEach(() => {
		stub.restore();
	})
});