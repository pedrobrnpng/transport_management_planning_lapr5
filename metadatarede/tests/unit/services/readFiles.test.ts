import { expect } from 'chai';
import * as sinon from 'sinon';
import {describe} from 'mocha'

import { Container } from 'typedi';
import config from "../../../config";

import ReadFiles from "../../../src/services/import/readFiles";
import LinhaService from "../../../src/services/linhaService";
import NoService from "../../../src/services/noService";
import PercursoService from "../../../src/services/percursoService";
import TipoTripulanteService from "../../../src/services/tipoTripulanteService";
import TipoViautraService from "../../../src/services/tipoViaturaService";
import IPercursoDTO from '../../../src/dto/IPercursoDTO';
import IPercursoRepo from '../../../src/repos/IRepos/IPercursoRepo';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import ISegmentoRedeDTO from '../../../src/dto/ISegmentoRedeDTO';
import IDistanciaDTO from '../../../src/dto/IDistanciaDTO';
import ITempoViagemDTO from '../../../src/dto/ITempoViagemDTO';
import { SegmentoRede } from '../../../src/domain/segmentoRede';
import { Distancia } from '../../../src/domain/distancia';
import { TempoViagem } from '../../../src/domain/tempoViagem';
import { Percurso } from '../../../src/domain/percurso';
import ILinhaRepo from '../../../src/repos/IRepos/ILinhaRepo';
import { Linha } from '../../../src/domain/linha';
import { No } from '../../../src/domain/no';
import INoDTO from '../../../src/dto/INoDTO';
import { Abreviatura } from '../../../src/domain/abreviatura';
import INoRepo from '../../../src/repos/IRepos/INoRepo';
import ITipoTripulanteDTO from '../../../src/dto/ITipoTripulanteDTO';
import ITipoTripulanteRepo from '../../../src/repos/IRepos/ITipoTripulanteRepo';
import { TipoTripulante } from '../../../src/domain/tipoTripulante';
import ITipoViaturaDTO from '../../../src/dto/ITipoViaturaDTO';
import ITipoViaturaRepo from '../../../src/repos/IRepos/ITipoViaturaRepo';
import { TipoViatura } from '../../../src/domain/tipoViatura';
import { CustoKM } from '../../../src/domain/custokm';
import { Result } from "../../../src/core/logic/Result";

describe("readFiles create", function() {
    let stub1,stub2,stub3,stub4,stub5;

    beforeEach(function () {
        //percurso
        let sr: SegmentoRede[] = [];
        let sg1 = SegmentoRede.create({
            idNoInicio: "NOVIQ",
            idNoFim: "TOQIO",
            distancia: Distancia.create(5000, "m").getValue() ,
            tempoViagem: TempoViagem.create(600, "s").getValue(),
            sequencia: 1
        }).getValue();
        sr.push(sg1);
        let percurso: Percurso = Percurso.create({segmentosRede:sr,idLinha:"1",direcao:"volta" }, new UniqueEntityID("p1")).getValue();
        let percursoRepoClass = require("../../../src/repos/" + config.repos.percurso.path).default;
        let percursoRepoInstance: IPercursoRepo = Container.get(percursoRepoClass)
        
        stub1 = sinon.stub(percursoRepoInstance as IPercursoRepo, 'save').resolves(new Result<Percurso>(true, null, percurso));
        Container.set(config.repos.percurso.name,percursoRepoInstance);

        //linha
        let linha= Linha.create({noInicial:"PORT", noFinal:"NOVIQ" ,nome:"Porto_Nova_Iorque",idTiposTripulante: [],idTiposViatura:[],
        cor: "RGB(2,2,2)"}, new UniqueEntityID("1")).getValue();

        let linhaRepoClass = require("../../../src/repos/" + config.repos.linha.path).default;
        let linhaRepoInstance: ILinhaRepo = Container.get(linhaRepoClass);

        stub2=sinon.stub(linhaRepoInstance as ILinhaRepo,'save').resolves(new Result<Linha>(true, null, linha));
        Container.set(config.repos.linha.name, linhaRepoInstance);

        //no
        let no1 = No.create({name:"Porto",type: "paragem",xCoordinate: 1,yCoordinate:2} as INoDTO,Abreviatura.create("PORT").getValue()).getValue();
        let noRepoClass = require("../../../src/repos/" + config.repos.no.path).default;
        let noRepoInstance: INoRepo = Container.get(noRepoClass);

        stub3=sinon.stub(noRepoInstance as INoRepo,'save').resolves(new Result<No>(true, null, no1));
        Container.set(config.repos.no.name, noRepoInstance);

        //tipo tripulante
        let tipoTripulanteRepoClass = require("../../../src/repos/"+config.repos.tipoTripulante.path).default;
		let tipoTripulanteRepoInstance: ITipoTripulanteRepo = Container.get(tipoTripulanteRepoClass)

		var tipoTripulante : TipoTripulante = TipoTripulante.create({ "id": "1","description": "astronauta" } as ITipoTripulanteDTO, new UniqueEntityID("tp1")).getValue();
        stub4 = sinon.stub(tipoTripulanteRepoInstance as ITipoTripulanteRepo, 'save').resolves(new Result<TipoTripulante>(true, null, tipoTripulante));
        Container.set(config.repos.tipoTripulante.name, tipoTripulanteRepoInstance);
        
        //tipo viatura
        let tipoViaturaRepoClass = require("../../../src/repos/"+config.repos.tipoViatura.path).default;
		let tipoViaturaRepoInstance: ITipoViaturaRepo = Container.get(tipoViaturaRepoClass)

        var ck: CustoKM = CustoKM.create({valor: 10, moeda: "EUR"}).getValue();
		var tipoViatura : TipoViatura = TipoViatura.create({
            descricao: "Foguete",
            combustivel: 23,
            autonomia: 500000,
            velocidadeMedia: 300,
            custoKM: ck,
            consumoMedio: 30} as ITipoViaturaDTO, new UniqueEntityID("11111111111111111111")).getValue();
        stub5 = sinon.stub(tipoViaturaRepoInstance as ITipoViaturaRepo, 'save').resolves(new Result<TipoViatura>(true, null, tipoViatura));
        Container.set(config.repos.tipoViatura.name, tipoViaturaRepoInstance);
    });

    it("returns string", async function() {
        const readF = new ReadFiles();
        let actual=await readF.importarDados("test.glx");
        expect(actual.getValue()).to.equal(undefined);
    });

    afterEach(function() {
        stub1.restore();
        stub2.restore();
        stub3.restore();
        stub4.restore();
        stub5.restore();
    });
});