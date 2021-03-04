import * as sinon from 'sinon';
import { describe } from 'mocha'

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import IPercursoService from "../../src/services/IServices/IPercursoService";

import PercursoController from "../../src/controllers/percursoController";
import { Result } from "../../src/core/logic/Result";
import PercursoService from '../../src/services/percursoService';
import ILinhaRepo from '../../src/repos/IRepos/ILinhaRepo';
import { Linha } from '../../src/domain/linha';
import { No } from '../../src/domain/no';
import INoRepo from '../../src/repos/IRepos/INoRepo';
import INoDTO from '../../src/dto/INoDTO';
import { Abreviatura } from '../../src/domain/abreviatura';
import IPercursoRepo from '../../src/repos/IRepos/IPercursoRepo';
import { Percurso } from '../../src/domain/percurso';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import { SegmentoRede } from '../../src/domain/segmentoRede';
import { TempoViagem } from '../../src/domain/tempoViagem';
import { Distancia } from '../../src/domain/distancia';
import { IPercursoPersistence } from '../../src/dataschema/IPercursoPersistence';
import { Model, Document } from 'mongoose';
import PercursoRepo from '../../src/repos/percursoRepo';
import LinhaRepo from '../../src/repos/linhaRepo';
import NoRepo from '../../src/repos/noRepo';
import { ILinhaPersistence } from '../../src/dataschema/ILinhaPersistence';
import { INoPersistence } from '../../src/dataschema/INoPersistence';
import { PercursoMap } from '../../src/mappers/PercursoMap';

describe('percurso integration tests', function () {

    it('returns json with id+name values from controller', async function () {
        let stub1, stub2, stub3;
        //percurso
        let sr: SegmentoRede[] = [];
        let sg1 = SegmentoRede.create({
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: Distancia.create(10, "km").getValue(),
            tempoViagem: TempoViagem.create(11, "h").getValue(),
            sequencia: 1
        }).getValue();
        sr.push(sg1);
        let percurso: Percurso = Percurso.create({ segmentosRede: sr, idLinha: "linha1", direcao: "ida" }, new UniqueEntityID("p1")).getValue();

        let percursoRepoClass = require("../../src/repos/" + config.repos.percurso.path).default;
        let percursoRepoInstance: IPercursoRepo = Container.get(percursoRepoClass)

        stub1 = sinon.stub(percursoRepoInstance as IPercursoRepo, 'save').resolves(new Result<Percurso>(true, null, percurso));
        Container.set(config.repos.percurso.name, percursoRepoInstance);

        //linha
        let linha = Linha.create({ noInicial: "no1", noFinal: "no2", nome: "linha1", idTiposTripulante: [], idTiposViatura: [],
        cor: "RGB(2,2,2)"}, new UniqueEntityID("linha1"));

        let linhaRepoClass = require("../../src/repos/" + config.repos.linha.path).default;
        let linhaRepoInstance: ILinhaRepo = Container.get(linhaRepoClass);

        stub2 = sinon.stub(linhaRepoInstance as ILinhaRepo, 'findByDomainId').resolves(linha);
        Container.set(config.repos.linha.name, linhaRepoInstance);

        //no
        let no1 = No.create({ name: "no1", type: "paragem" } as INoDTO, Abreviatura.create("no1").getValue());
        let noRepoClass = require("../../src/repos/" + config.repos.no.path).default;
        let noRepoInstance: INoRepo = Container.get(noRepoClass);

        stub3 = sinon.stub(noRepoInstance as INoRepo, 'findByDomainId').resolves(no1);
        Container.set(config.repos.no.name, noRepoInstance);

        //test 
        let body = {
            "id": "p1",
            "segmentosRede": [{
                "id": "sg1",
                "idNoInicio": "no1",
                "idNoFim": "no2",
                "distancia": {
                    "value": "10",
                    "unidadeDistancia": "km"
                },
                "tempoViagem": {
                    "value": "1",
                    "unidadeTempo": "h"
                }
            }],
            "idLinha": "linha1",
            "direcao": "ida"
        };
        let req: Partial<Request> = { body };

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const srv = new PercursoService(Container.get(config.repos.percurso.name), Container.get(config.repos.linha.name),
            Container.get(config.repos.no.name));

        const ctrl = new PercursoController(srv);

        await ctrl.criarPercurso(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            direcao: "ida",
            id: "p1",
            idLinha: "linha1",
            segmentosRede: [{
                distancia: { unidadeDistancia: "km", value: "10" },
                id: "sg1",
                idNoFim: "no2",
                idNoInicio: "no1",
                sequencia: 1,
                tempoViagem: { unidadeTempo: "h", value: "1" }
            }]
        });
        stub1.restore();
        stub2.restore();
        stub3.restore();
    });

    it('returns json with "Percurso" values', async function () {
        let stub1;
        //percurso
        let sr: SegmentoRede[] = [];
        let sg1 = SegmentoRede.create({
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: Distancia.create(10, "km").getValue(),
            tempoViagem: TempoViagem.create(11, "h").getValue(),
            sequencia: 1
        }).getValue();
        sr.push(sg1);
        let percurso: Percurso = Percurso.create({ segmentosRede: sr, idLinha: "linha1", direcao: "ida" }, new UniqueEntityID("p1")).getValue();

        let percursoRepoClass = require("../../src/repos/" + config.repos.percurso.path).default;
        let percursoRepoInstance: IPercursoRepo = Container.get(percursoRepoClass)

        stub1 = sinon.stub(percursoRepoInstance as IPercursoRepo, 'findByLinhaId').resolves([percurso]);
        Container.set(config.repos.percurso.name, percursoRepoInstance);

        //linha
        let linhaRepoClass = require("../../src/repos/" + config.repos.linha.path).default;
        let linhaRepoInstance: ILinhaRepo = Container.get(linhaRepoClass);
        Container.set(config.repos.linha.name, linhaRepoInstance);

        //no
        let noRepoClass = require("../../src/repos/" + config.repos.no.path).default;
        let noRepoInstance: INoRepo = Container.get(noRepoClass);
        Container.set(config.repos.no.name, noRepoInstance);

        //test 
        let body = {
            idLinha: "linha1",
        };
        let req: Partial<Request> = { body };

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const srv = new PercursoService(Container.get(config.repos.percurso.name), Container.get(config.repos.linha.name),
            Container.get(config.repos.no.name));

        const ctrl = new PercursoController(srv);

        await ctrl.listarPercursosDumaLinha(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, [PercursoMap.toDTO(percurso)]);
        console.log("coco finito")
        stub1.restore();
    });

    it('returns json "Percurso" 3', async function () {
        let stub2, stub4, stub5;
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

        let percursoSchemaInstance: Model<IPercursoPersistence & Document> = require("../../src/persistence/schemas/percursoSchema").default;
        const stub1 = sinon.stub(percursoSchemaInstance as Model<IPercursoPersistence & Document>, 'create').resolves(percursoPersistence);
        stub2 = sinon.stub(percursoSchemaInstance as Model<IPercursoPersistence & Document>, 'findOne').resolves(null);
        Container.set('percursoSchema', percursoSchemaInstance);

        let linhaPersistence = {
            noInicial: "no1",
            noFinal: "no2",
            domainId: 'linha1',
            codigo: 'j',
            nome: '23443gf25f',
            idTiposTripulante: [],
            idTiposViatura: [],
            cor: "RGB(1,1,1)"
        };
        let linhaSchemaInstance: Model<ILinhaPersistence & Document> = require("../../src/persistence/schemas/linhaSchema").default;
        stub4 = sinon.stub(linhaSchemaInstance as Model<ILinhaPersistence & Document>, 'findOne').resolves(linhaPersistence);
        Container.set('linhaSchema', linhaSchemaInstance);

        let noPersistence = {
            domainId: "no1",
            name: "no1",
            type: "paragem",
            xCoordinate: "10",
            yCoordinate: "20"
        };
        let noSchemaInstance: Model<INoPersistence & Document> = require("../../src/persistence/schemas/noSchema").default;
        stub5 = sinon.stub(noSchemaInstance as Model<INoPersistence & Document>, 'findOne').resolves(noPersistence);
        Container.set('noSchema', noSchemaInstance);
        //test
        let body = {
            "id": "p1",
            "segmentosRede": [{
                "id": "sg1",
                "idNoInicio": "no1",
                "idNoFim": "no2",
                "distancia": {
                    "value": "10",
                    "unidadeDistancia": "km"
                },
                "tempoViagem": {
                    "value": "1",
                    "unidadeTempo": "h"
                }
            }],
            "idLinha": "linha1",
            "direcao": "ida"
        };
        let req: Partial<Request> = { body };

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => { };

        const ctrl = new PercursoController(new PercursoService(
            new PercursoRepo(Container.get('percursoSchema')),
            new LinhaRepo(Container.get('linhaSchema')),
            new NoRepo(Container.get('noSchema'))) as IPercursoService);

        await ctrl.criarPercurso(<Request>req, <Response>res, <NextFunction>next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            direcao: "ida",
            id: "p1",
            idLinha: "linha1",
            segmentosRede: [{
                distancia: { unidadeDistancia: "km", value: "10" },
                id: "sg1",
                idNoFim: "no2",
                idNoInicio: "no1",
                sequencia: 1,
                tempoViagem: { unidadeTempo: "h", value: "1" }
            }]
        });
        stub1.restore();
        stub2.restore();
        stub4.restore();
        stub5.restore();
    });
});