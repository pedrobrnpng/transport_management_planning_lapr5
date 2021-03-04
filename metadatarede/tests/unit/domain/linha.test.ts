import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { CustoKM } from '../../../src/domain/custokm';
import { Linha } from '../../../src/domain/linha';
import { TipoTripulante } from '../../../src/domain/tipoTripulante';
import { TipoViatura } from '../../../src/domain/tipoViatura';

const linha1 = Linha.create({
    noInicial: "PARED",
    noFinal: "CETE",
    nome: "Camapnha",
    idTiposViatura: [],
    idTiposTripulante: [],
    cor: "RGB(1,1,1)"
}).getValue();

const linha2 = Linha.create({
    noInicial: "PARED",
    noFinal: "CETE",
    nome: "Camapnha",
    idTiposViatura: ["tv1"],
    idTiposTripulante: ["tp1"],
    cor: "RGB(2,2,2)"
}).getValue();

describe('Linha Domain Test', () => {
    it('Pode ser criado sem tipos', () => {
        expect(Linha.create(linha1, new UniqueEntityID("l1")).isSuccess).to.equal(true);
    });
    it('Pode ser criado com todos os props', () => {
        expect(Linha.create(linha2, new UniqueEntityID("l2")).isSuccess).to.equal(true);
    });
    it('Não pode ser criado com o tamanho do id diferente de 1', () => {
        expect(Linha.create({
            noInicial: "PARED",
            noFinal: "CETE",
            nome: "Camapnha",
            idTiposViatura: ["tv1"],
            idTiposTripulante: ["tp1"],
            cor: "RGB(1,1,1)"
        }, new UniqueEntityID("35")).isSuccess).to.equal(true);
    });
    it('Não pode ser criado com o tamanho do nome inferior a 5', () => {
        expect(Linha.create({
            noInicial: "PARED",
            noFinal: "CETE",
            nome: "Camapnha1234asdaeweqsafsda",
            idTiposViatura: ["tv1"],
            idTiposTripulante: ["tp1"],
            cor: "RGB(2,2,2)"
        }, new UniqueEntityID("3")).isSuccess).to.equal(false);
    });
    it('Não pode ser criado com o tamanho do nome superior a 20', () => {
        expect(Linha.create({
            noInicial: "PARED",
            noFinal: "CETE",
            nome: "Camapnha1234asdaeweqsafsda",
            idTiposViatura: ["tv1"],
            idTiposTripulante: ["tp1"],
            cor: "RGB(2,2,2)"
        }, new UniqueEntityID("5")).isSuccess).to.equal(false);
    });
});