import { expect } from 'chai';
import * as sinon from 'sinon';
import {describe} from 'mocha';
import { Container } from 'typedi';
import { Model, Document } from 'mongoose';

import LinhaRepo from '../../../src/repos/linhaRepo';
import { ILinhaPersistence } from '../../../src/dataschema/ILinhaPersistence';
import { Linha } from '../../../src/domain/linha';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import ILinhaDTO from '../../../src/dto/ILinhaDTO';

describe('linha repo create', function () {
    let stub, stub1;

    beforeEach(function () {
        let linhaSchemaInstance: Model<ILinhaPersistence & Document> = require("../../../src/persistence/schemas/linhaSchema").default;
        let linhaPersistence = {
            domainId: "1",
            noInicial: "PARED",
            noFinal: "CETE",
            nome: "Camapnha",
            idTiposViatura: ["tv1"],
            idTiposTripulante: ["tp1"],
            cor: "RGB(1,1,1)"
        };
 
        stub = sinon.stub(linhaSchemaInstance as Model<ILinhaPersistence & Document>, 'create').resolves(linhaPersistence);
        stub1 = sinon.stub(linhaSchemaInstance as Model<ILinhaPersistence & Document>, 'findOne').resolves(null);

        Container.set('linhaSchema', linhaSchemaInstance);
    });

    it('return with id', async function() {
        var linhaExpected: Linha = Linha.create({
            noInicial: "PARED",
            noFinal: "CETE",
            nome: "Camapnha",
            idTiposViatura: ["tv1"],
            idTiposTripulante: ["tv1"],
            cor: "RGB(1,1,1)"
        } as ILinhaDTO, new UniqueEntityID("1")).getValue();
        
        const repo = new LinhaRepo(Container.get('linhaSchema'));

        let result = await repo.save(linhaExpected);
        

        expect(result.id.toString()).to.equal(linhaExpected.id.toString());
        expect(result.nome).to.equal(linhaExpected.nome);
    });

    afterEach( () => {
        stub.restore();
        stub1.restore();
    })

})