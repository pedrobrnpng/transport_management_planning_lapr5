import { expect } from 'chai';
import * as sinon from 'sinon';
import { describe } from 'mocha'

import { Container } from 'typedi';

import NoRepo from "../../../src/repos/noRepo";
import { No } from '../../../src/domain/no';
import { Document, Model } from 'mongoose';
import { INoPersistence } from '../../../src/dataschema/INoPersistence';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Abreviatura } from '../../../src/domain/abreviatura';

const name = "Amial";
const id = "AML";
const type = "paragem";
const latitude = 90;
const longitude = 90;

describe('no repo create', function () {
    let stub1, stub2;
    beforeEach(function () {
        let noSchemaInstance: Model<INoPersistence & Document> = require("../../../src/persistence/schemas/noSchema").default;
        let noPersistence = {
            domainId: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        };
        stub1 = sinon.stub(noSchemaInstance as Model<INoPersistence & Document>, 'create').resolves(noPersistence);
        stub2 = sinon.stub(noSchemaInstance as Model<INoPersistence & Document>, 'findOne').resolves(null);
        Container.set('noSchema', noSchemaInstance);
    });

    it('return with id, name, type and coordinates', async function () {


        var noExpected: No = No.create({ id_abreviature: id, name: name, type: type, xCoordinate: latitude, yCoordinate: longitude }, Abreviatura.create(id).getValue()).getValue();
        const rep = new NoRepo(Container.get('noSchema'));

        let actual = await rep.save(noExpected);
        expect(actual.id.toString()).to.equal(noExpected.id.toString());
        expect(actual.props.coordenadas.props.latitude).to.equal(noExpected.props.coordenadas.props.latitude);
        expect(actual.props.coordenadas.props.longitude).to.equal(noExpected.props.coordenadas.props.longitude);
        expect(actual.props.nome.props.value).to.equal(noExpected.props.nome.props.value);
        expect(actual.props.tipo.props.value).to.equal(noExpected.props.tipo.props.value);
    });

    afterEach(function () {
        stub1.restore();
        stub2.restore();
    });
});
