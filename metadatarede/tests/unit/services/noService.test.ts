import { expect } from 'chai';
import * as sinon from 'sinon';
import { describe } from 'mocha';
import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../../config";

import NoService from "../../../src/services/noService";
import { Result } from "../../../src/core/logic/Result";
import INoDTO from '../../../src/dto/INoDTO';
import INoRepo from '../../../src/repos/IRepos/INoRepo';
import { No } from '../../../src/domain/no';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Abreviatura } from '../../../src/domain/abreviatura';

const name = "Amial";
const id = "AML";
const type = "paragem";
const latitude = 90;
const longitude = 90;

describe('no service create', function () {
    let stub1,stub2;
    beforeEach(function () {
        let noRepoClass = require("../../../src/repos/" + config.repos.no.path).default;
        let noRepoInstance: INoRepo = Container.get(noRepoClass)

        let noDTO = {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        };

        var no: No = No.create(noDTO as INoDTO, Abreviatura.create(noDTO.id_abreviature).getValue()).getValue();
        stub1=sinon.stub(noRepoInstance as INoRepo, 'save').resolves(new Result<No>(true, null, no));
        stub2=sinon.stub(noRepoInstance as INoRepo, 'findAll').resolves([no]);
        Container.set(config.repos.no.name, noRepoInstance);
    });

    it('returns dto with id, name, type and coordinates', async function () {
        let noDTOExpected: INoDTO = {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        } as INoDTO;

        const srv = new NoService(Container.get(config.repos.no.name));

        let actual: INoDTO = await (await srv.criarNo(noDTOExpected)).getValue();

        expect(actual.id_abreviature).to.equal(noDTOExpected.id_abreviature);
        expect(actual.name).to.equal(noDTOExpected.name);
        expect(actual.type).to.equal(noDTOExpected.type);
        expect(actual.xCoordinate).to.equal(noDTOExpected.xCoordinate);
        expect(actual.yCoordinate).to.equal(noDTOExpected.yCoordinate);
    });

    it('returns an array of dtos with id, segmentosRede, idLInha, direcao', async function () {
        let noDTOExpected: INoDTO = {
            id_abreviature: id,
            name: name,
            type: type,
            xCoordinate: latitude,
            yCoordinate: longitude
        } as INoDTO;
        
        const srv = new NoService(Container.get(config.repos.no.name));

        let actual: INoDTO[] = await (await srv.listarNos()).getValue();

        expect(actual[0].id_abreviature).to.equal(noDTOExpected.id_abreviature);
        expect(actual[0].name).to.equal(noDTOExpected.name);
        expect(actual[0].type).to.equal(noDTOExpected.type);
        expect(actual[0].xCoordinate).to.equal(noDTOExpected.xCoordinate);
        expect(actual[0].yCoordinate).to.equal(noDTOExpected.yCoordinate);
    });

    afterEach(function() {
        stub1.restore();
        stub2.restore();
    });
});