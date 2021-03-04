import { TempoViagem } from '../../../src/domain/tempoViagem';
import { expect } from 'chai'
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

const value = 10;
const unidadeTempo = "m";

describe('TempoViagem Domain Test', () => {
    it('Pode ser criado com value e unidadeTempo', () => {
        expect(TempoViagem.create(value, unidadeTempo).isSuccess).to.equal(true);
    });
    it('Não pode ser criado com value null', () => {
        expect(TempoViagem.create(null, unidadeTempo).isSuccess).to.equal(false);
    });
    it('Não pode ser criado com unidadeTempo null', () => {
        expect(TempoViagem.create(value, null).isSuccess).to.equal(false);
    });
    it('Não pode ser criado com unidadeTempo vazio', () => {
        expect(TempoViagem.create(value, "").isSuccess).to.equal(false);
    });
    it('Não pode ser criado com unidadeTempo fora dos parametros definidos', () => {
        expect(TempoViagem.create(value, "d").isSuccess).to.equal(false);
    });
});