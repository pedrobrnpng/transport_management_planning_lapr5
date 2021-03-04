import { Distancia } from '../../../src/domain/distancia';
import { expect } from 'chai'
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

const value = 10;
const unidadeDistancia = "km";

describe('Distancia Domain Test', () => {
    it('Pode ser criado com value e unidadeDistancia', () => {
        expect(Distancia.create(value, unidadeDistancia).isSuccess).to.equal(true);
    });
    it('Não pode ser criado com value null', () => {
        expect(Distancia.create(null, unidadeDistancia).isSuccess).to.equal(false);
    });
    it('Não pode ser criado com unidadeDistancia null', () => {
        expect(Distancia.create(value, null).isSuccess).to.equal(false);
    });
    it('Não pode ser criado com unidadeDistancia vazio', () => {
        expect(Distancia.create(value, "").isSuccess).to.equal(false);
    });
    it('Não pode ser criado com unidadeDistancia fora dos parametros definidos', () => {
        expect(Distancia.create(value, "d").isSuccess).to.equal(false);
    });
});