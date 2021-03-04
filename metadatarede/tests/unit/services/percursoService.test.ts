import { expect } from 'chai';
import * as sinon from 'sinon';
import {describe} from 'mocha'

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../../config";

import PercursoService from "../../../src/services/percursoService";
import { Result } from "../../../src/core/logic/Result";
import IPercursoDTO from '../../../src/dto/IPercursoDTO';
import IPercursoRepo from '../../../src/repos/IRepos/IPercursoRepo';
import { Percurso } from '../../../src/domain/percurso';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import ISegmentoRedeDTO from '../../../src/dto/ISegmentoRedeDTO';
import IDistanciaDTO from '../../../src/dto/IDistanciaDTO';
import ITempoViagemDTO from '../../../src/dto/ITempoViagemDTO';
import { SegmentoRede } from '../../../src/domain/segmentoRede';
import { Distancia } from '../../../src/domain/distancia';
import { TempoViagem } from '../../../src/domain/tempoViagem';
import ILinhaRepo from '../../../src/repos/IRepos/ILinhaRepo';
import { Linha } from '../../../src/domain/linha';
import { No } from '../../../src/domain/no';
import INoDTO from '../../../src/dto/INoDTO';
import { Abreviatura } from '../../../src/domain/abreviatura';
import INoRepo from '../../../src/repos/IRepos/INoRepo';

describe('percurso service create', function () {
    let stub1,stub2,stub3, stub4;
    beforeEach(function () {
        //percurso
        let sr: SegmentoRede[] = [];
        let sg1 = SegmentoRede.create({
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: Distancia.create( 10, "km" ).getValue() ,
            tempoViagem: TempoViagem.create(11, "h" ).getValue(),
            sequencia: 1
        }).getValue();
        sr.push(sg1);
        let percurso: Percurso = Percurso.create({segmentosRede:sr,idLinha:"9",direcao:"ida" }, new UniqueEntityID("p1")).getValue();
        let percursoRepoClass = require("../../../src/repos/" + config.repos.percurso.path).default;
        let percursoRepoInstance: IPercursoRepo = Container.get(percursoRepoClass)

        let percursosArray : Array<Percurso> = [];
        percursosArray.push(percurso)
        
        stub1 = sinon.stub(percursoRepoInstance as IPercursoRepo, 'save').resolves(new Result<Percurso>(true, null, percurso));
        stub4 = sinon.stub(percursoRepoInstance as IPercursoRepo, 'findByLinhaId').resolves(percursosArray);
        Container.set(config.repos.percurso.name,percursoRepoInstance);
        
        //linha
        let linha= Linha.create({noInicial:"no1",noFinal:"no2",nome:"9",idTiposTripulante: [],idTiposViatura:[],cor: "RGB(2,2,2)"}, new UniqueEntityID("9"));

        let linhaRepoClass = require("../../../src/repos/" + config.repos.linha.path).default;
        let linhaRepoInstance: ILinhaRepo = Container.get(linhaRepoClass);

        stub2=sinon.stub(linhaRepoInstance as ILinhaRepo,'findByDomainId').resolves(linha);
        Container.set(config.repos.linha.name, linhaRepoInstance);

        //no
        let no1 = No.create({name:"no1",type: "paragem"}as INoDTO,Abreviatura.create("no1").getValue());
        let noRepoClass = require("../../../src/repos/" + config.repos.no.path).default;
        let noRepoInstance: INoRepo = Container.get(noRepoClass);

        stub3=sinon.stub(noRepoInstance as INoRepo,'findByDomainId').resolves(no1);
        Container.set(config.repos.no.name, noRepoInstance);


    });

    it('returns dto with id, description', async function () {
        let sr: ISegmentoRedeDTO[] = [];
        let sg1 = {
            id: "sg1",
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: { value: 10, unidadeDistancia: "km" } as IDistanciaDTO,
            tempoViagem: { value: 11, unidadeTempo: "h" } as ITempoViagemDTO,
            sequencia: 1
        } as ISegmentoRedeDTO;
        sr.push(sg1);
        var percursoDTOExpected: IPercursoDTO = { id: "p1", segmentosRede: sr, idLinha: "9", direcao: "ida" } as IPercursoDTO;
        
        const srv = new PercursoService(Container.get(config.repos.percurso.name),Container.get(config.repos.linha.name),
        Container.get(config.repos.no.name));

        let actual: IPercursoDTO = await (await srv.criarPercurso(percursoDTOExpected)).getValue();

        expect(actual.id).to.equal(percursoDTOExpected.id);
        expect(actual.segmentosRede[0].id).to.equal(percursoDTOExpected.segmentosRede[0].id);
        expect(actual.segmentosRede[0].idNoInicio).to.equal(percursoDTOExpected.segmentosRede[0].idNoInicio);
        expect(actual.segmentosRede[0].idNoFim).to.equal(percursoDTOExpected.segmentosRede[0].idNoFim);
        expect(actual.segmentosRede[0].distancia.value).to.equal(percursoDTOExpected.segmentosRede[0].distancia.value);
        expect(actual.segmentosRede[0].distancia.unidadeDistancia).to.equal(percursoDTOExpected.segmentosRede[0].distancia.unidadeDistancia);
        expect(actual.segmentosRede[0].tempoViagem.value).to.equal(percursoDTOExpected.segmentosRede[0].tempoViagem.value);
        expect(actual.segmentosRede[0].tempoViagem.unidadeTempo).to.equal(percursoDTOExpected.segmentosRede[0].tempoViagem.unidadeTempo);
        expect(actual.segmentosRede[0].sequencia).to.equal(percursoDTOExpected.segmentosRede[0].sequencia);
        expect(actual.direcao).to.equal(percursoDTOExpected.direcao);
    });

    it('returns an array of dtos with id, segmentosRede, idLInha, direcao', async function () {
        let idLInha = "1";
        let sr: ISegmentoRedeDTO[] = [];
        let sg1 = {
            id: "sg1",
            idNoInicio: "no1",
            idNoFim: "no2",
            distancia: { value: 10, unidadeDistancia: "km" } as IDistanciaDTO,
            tempoViagem: { value: 11, unidadeTempo: "h" } as ITempoViagemDTO,
            sequencia: 1
        } as ISegmentoRedeDTO;
        sr.push(sg1);
        var percursoDTOExpected: IPercursoDTO = { id: "p1", segmentosRede: sr, idLinha: "1", direcao: "ida" } as IPercursoDTO;
        
        const srv = new PercursoService(Container.get(config.repos.percurso.name),Container.get(config.repos.linha.name),
        Container.get(config.repos.no.name));

        let actual: IPercursoDTO[] = await (await srv.listarPercursoDumaLinha({idLinha: idLInha} as IPercursoDTO)).getValue();

        expect(actual[0].id).to.equal(percursoDTOExpected.id);
        expect(actual[0].segmentosRede[0].idNoInicio).to.equal(percursoDTOExpected.segmentosRede[0].idNoInicio);
        expect(actual[0].segmentosRede[0].idNoFim).to.equal(percursoDTOExpected.segmentosRede[0].idNoFim);
        expect(actual[0].segmentosRede[0].distancia.value).to.equal(percursoDTOExpected.segmentosRede[0].distancia.value);
        expect(actual[0].segmentosRede[0].distancia.unidadeDistancia).to.equal(percursoDTOExpected.segmentosRede[0].distancia.unidadeDistancia);
        expect(actual[0].segmentosRede[0].tempoViagem.value).to.equal(percursoDTOExpected.segmentosRede[0].tempoViagem.value);
        expect(actual[0].segmentosRede[0].tempoViagem.unidadeTempo).to.equal(percursoDTOExpected.segmentosRede[0].tempoViagem.unidadeTempo);
        expect(actual[0].segmentosRede[0].sequencia).to.equal(percursoDTOExpected.segmentosRede[0].sequencia);
        expect(actual[0].direcao).to.equal(percursoDTOExpected.direcao);
    });

    afterEach(function(){
        stub1.restore();
        stub2.restore();
        stub3.restore();
        stub4.restore();
    });
});