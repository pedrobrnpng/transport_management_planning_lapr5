import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from "../../config";

import { Linha } from '../../src/domain/linha';
import ILinhaRepo from '../../src/repos/IRepos/ILinhaRepo';
import { UniqueEntityID } from '../../src/core/domain/UniqueEntityID';
import { Result } from '../../src/core/logic/Result';
import LinhaController from '../../src/controllers/linhaController';
import LinhaService from '../../src/services/linhaService';
import { TipoTripulante } from '../../src/domain/tipoTripulante';
import { TipoViatura } from '../../src/domain/tipoViatura';
import ITipoTripulanteDTO from '../../src/dto/ITipoTripulanteDTO';
import ITipoViaturaRepo from '../../src/repos/IRepos/ITipoViaturaRepo';
import ITipoTripulanteRepo from '../../src/repos/IRepos/ITipoTripulanteRepo';
import ITipoViaturaDTO from '../../src/dto/ITipoViaturaDTO';
import { CustoKM } from '../../src/domain/custokm';
import { No } from '../../src/domain/no';
import { Abreviatura } from '../../src/domain/abreviatura';
import INoDTO from '../../src/dto/INoDTO';
import INoRepo from '../../src/repos/IRepos/INoRepo';

describe('linha integration test', function () {
    it('returns json with id+name values from controller', async function (){
        let stub1, stub2, stub3, stub4, stub5;

        let linha: Linha = Linha.create({ 
            noInicial: "PARED",
            noFinal: "CETE",
            nome: "linha1", 
            idTiposTripulante: ["tp1"], 
            idTiposViatura: ["tv1"],
            cor: "RGB(1,1,1)"
        }, new UniqueEntityID("l1")).getValue();

        let linhaRepoClass =  require('../../src/repos/linhaRepo').default;
        let linhaRepoInstance: ILinhaRepo = Container.get(linhaRepoClass);

        stub1 = sinon.stub(linhaRepoInstance as ILinhaRepo, 'save').resolves(new Result<Linha>(true, null, linha));
        Container.set(config.repos.linha.name, linhaRepoInstance);

        let tipoTripulante : TipoTripulante = TipoTripulante.create({ "id": "tp1","description": "Fala inglês" } as ITipoTripulanteDTO, new UniqueEntityID("tp1")).getValue();
        let tipoTripulanteRepoClass = require('../../src/repos/tipoTripulanteRepo').default;
        let tipoTripulanteRepoInstance: ITipoTripulanteRepo = Container.get(tipoTripulanteRepoClass);

        stub2 = sinon.stub(tipoTripulanteRepoInstance as ITipoTripulanteRepo, 'findByDomainId').resolves(tipoTripulante);
        Container.set(config.repos.tipoTripulante.name, tipoTripulanteRepoInstance);

        let ck: CustoKM = CustoKM.create({valor: 2, moeda: "EUR"}).getValue();
        let tipoViatura: TipoViatura = TipoViatura.create({
            descricao: "Autocarros",
            combustivel: 23,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: ck,
            consumoMedio: 5} as ITipoViaturaDTO, new UniqueEntityID("12345678901234567890")).getValue();
        
        let tipoViaturaClass = require('../../src/repos/tipoViaturaRepo').default;
        let tipoViaturaRepoInstance: ITipoViaturaRepo = Container.get(tipoViaturaClass);

        stub3 = sinon.stub(tipoViaturaRepoInstance as ITipoViaturaRepo, 'findByDomainId').resolves(tipoViatura);
        Container.set(config.repos.tipoViatura.name, tipoViaturaRepoInstance);


        let noDTO: INoDTO = {
            id_abreviature: "pared",
            name: "Paredes",
            type: "paragem",
            xCoordinate: 90,
            yCoordinate: 90
        };

        let noInicial: No = No.create(noDTO, Abreviatura.create(noDTO.id_abreviature).getValue()).getValue();

        let noRepoClass = require('../../src/repos/noRepo').default;
        let noRepoInstance: INoRepo = Container.get(noRepoClass);

        stub5 = sinon.stub(noRepoInstance as INoRepo, 'findByDomainId').resolves(noInicial);
        Container.set(config.repos.no.name, noRepoInstance);
        
        stub4 = sinon.stub(linhaRepoInstance as ILinhaRepo, 'findAll').resolves([linha]);

        let body = {
            "id": "l1",
            "noInicial": "PARED",
            "noFinal": "CETE",
            "nome": "linha1",
            "idTiposTripulante" : ["tp1"],
            "idTiposViatura": ["12345678901234567890"],
            "cor": "RGB(1,1,1)"
        };
        let req: Partial<Request> = { body };

        let res: Partial<Response> = {
            status: sinon.stub(),
            json: sinon.stub()
        };

        (res.status as sinon.SinonStub).returnsThis();

        let next: Partial<NextFunction> = () => {};

        const ctrl = new LinhaController(new LinhaService(Container.get(config.repos.linha.name),Container.get(config.repos.tipoViatura.name),
                                                        Container.get(config.repos.tipoTripulante.name), Container.get(config.repos.no.name)));
    
        await ctrl.criarLinha(<Request> req, <Response> res, <NextFunction> next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            noInicial: "PARED",
            noFinal: "CETE",
            id: "l1",
            nome: "linha1",
            idTiposTripulante: ["tp1"],
            idTiposViatura: ["12345678901234567890"],
            cor: "RGB(1,1,1)"
        });

        await ctrl.listarLinhas(<Request> req, <Response> res, <NextFunction> next);
        sinon.assert.calledWithMatch(res.status as sinon.SinonStub, 201);
        sinon.assert.calledWithMatch(res.json as sinon.SinonStub, {
            noInicial: "PARED",
            noFinal: "CETE",            
            id: "l1",
            nome: "linha1",
            idTiposTripulante: ["tp1"],
            idTiposViatura: ["12345678901234567890"],
            cor: "RGB(1,1,1)"
        });

        stub1.restore();
        stub2.restore();
        stub3.restore();
        stub4.restore();
        stub5.restore();
    })
})