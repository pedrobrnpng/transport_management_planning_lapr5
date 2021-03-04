import { expect } from 'chai';
import * as sinon from 'sinon';
import {describe} from 'mocha';

import { Container } from 'typedi';


import PercursoRepo from "../../../src/repos/percursoRepo";
import { Percurso } from '../../../src/domain/percurso';
import { Document, Model } from 'mongoose';
import { IPercursoPersistence } from '../../../src/dataschema/IPercursoPersistence';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { SegmentoRede } from '../../../src/domain/segmentoRede';
import { TempoViagem } from '../../../src/domain/tempoViagem';
import { Distancia } from '../../../src/domain/distancia';

describe('percurso repo create', function () {
    let stub1, stub2, stub3;
    beforeEach(function () {
        let percursoSchemaInstance: Model<IPercursoPersistence & Document> = require("../../../src/persistence/schemas/percursoSchema").default;
        let sr: any[] = [];
        let sg = {
            id: "sg1",
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: { value: 10, unidade: "km" },
            tempoViagem: { value: 11, unidade: "h" },
            sequencia: 1
        };
        sr.push(sg);
        let percursoPersistence = { domainId: "p1", segmentosRede: sr, idLinha: "linha1", direcao: "ida" };
        stub1 = sinon.stub(percursoSchemaInstance as Model<IPercursoPersistence & Document>, 'create').resolves(percursoPersistence);
        stub2 = sinon.stub(percursoSchemaInstance as Model<IPercursoPersistence & Document>, 'findOne').resolves(null);
        stub3 = sinon.stub(percursoSchemaInstance as Model<IPercursoPersistence & Document>, 'find').resolves([percursoPersistence]);
        Container.set('percursoSchema', percursoSchemaInstance);

    });

    it('return with id and description', async function () {

        let sr: SegmentoRede[] = [];
        let sg1 = SegmentoRede.create({
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: Distancia.create(10, "km").getValue(),
            tempoViagem: TempoViagem.create(11, "h").getValue(),
            sequencia: 1
        }).getValue();
        sr.push(sg1);
        var percursoExpected: Percurso = Percurso.create({ segmentosRede: sr, idLinha: "linha1", direcao: "ida" }, new UniqueEntityID("p1")).getValue();
        const rep = new PercursoRepo(Container.get('percursoSchema'));

        let actual = await rep.save(percursoExpected);
        expect(actual.id.toString()).to.equal(percursoExpected.id.toString());
        expect(actual.segmentosRede[0].idNoInicio).to.equal(percursoExpected.segmentosRede[0].idNoInicio);
        expect(actual.segmentosRede[0].idNoFim).to.equal(percursoExpected.segmentosRede[0].idNoFim);
        expect(actual.segmentosRede[0].distancia.value).to.equal(percursoExpected.segmentosRede[0].distancia.value);
        expect(actual.segmentosRede[0].distancia.unidade).to.equal(percursoExpected.segmentosRede[0].distancia.unidade);
        expect(actual.segmentosRede[0].tempoViagem.value).to.equal(percursoExpected.segmentosRede[0].tempoViagem.value);
        expect(actual.segmentosRede[0].tempoViagem.unidade).to.equal(percursoExpected.segmentosRede[0].tempoViagem.unidade);
        expect(actual.segmentosRede[0].sequencia).to.equal(percursoExpected.segmentosRede[0].sequencia);
        expect(actual.idLinha).to.equal(percursoExpected.idLinha);
        expect(actual.direcao).to.equal(percursoExpected.direcao);
    });

    it('return with an array of id, name, array of segmentosRede and idLinha ', async function () {

        let sr: SegmentoRede[] = [];
        let sg1 = SegmentoRede.create({
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: Distancia.create(10, "km").getValue(),
            tempoViagem: TempoViagem.create(11, "h").getValue(),
            sequencia: 1
        }).getValue();
        sr.push(sg1);
        var percursoExpected: Percurso = Percurso.create({ segmentosRede: sr, idLinha: "linha1", direcao: "ida" }, new UniqueEntityID("p1")).getValue();
        const rep = new PercursoRepo(Container.get('percursoSchema'));

        let actual = await rep.findByLinhaId(percursoExpected.idLinha);
        expect(actual[0].id.toString()).to.equal(percursoExpected.id.toString());
        expect(actual[0].segmentosRede[0].idNoInicio).to.equal(percursoExpected.segmentosRede[0].idNoInicio);
        expect(actual[0].segmentosRede[0].idNoFim).to.equal(percursoExpected.segmentosRede[0].idNoFim);
        expect(actual[0].segmentosRede[0].distancia.value).to.equal(percursoExpected.segmentosRede[0].distancia.value);
        expect(actual[0].segmentosRede[0].distancia.unidade).to.equal(percursoExpected.segmentosRede[0].distancia.unidade);
        expect(actual[0].segmentosRede[0].tempoViagem.value).to.equal(percursoExpected.segmentosRede[0].tempoViagem.value);
        expect(actual[0].segmentosRede[0].tempoViagem.unidade).to.equal(percursoExpected.segmentosRede[0].tempoViagem.unidade);
        expect(actual[0].segmentosRede[0].sequencia).to.equal(percursoExpected.segmentosRede[0].sequencia);
        expect(actual[0].idLinha).to.equal(percursoExpected.idLinha);
        expect(actual[0].direcao).to.equal(percursoExpected.direcao);
    });

    afterEach(()=>{
        stub1.restore();
        stub2.restore();
        stub3.restore();
    })
});
