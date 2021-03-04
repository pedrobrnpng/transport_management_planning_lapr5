import { TipoViatura } from '../../../src/domain/tipoViatura';
import { expect } from 'chai';
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { CustoKM } from '../../../src/domain/custokm';

const tipoViatura1 = TipoViatura.create({
    descricao: "Autocarros",
    combustivel: 23,
    autonomia: 200,
    velocidadeMedia: 30,
    custoKM: CustoKM.create({valor: 2, moeda: "EUR"}).getValue(),
    consumoMedio: 5
}, new UniqueEntityID("12345678901234567890")).getValue();

describe('TipoViatura Domain Test', () => {
    it('Pode ser criado com todos os props', () => {
        expect(TipoViatura.create(tipoViatura1, new UniqueEntityID("tv1")).isSuccess).to.equal(true);
    });
    it('Não pode ser criado com codigo com menos de 20 carateres', () => {
        expect(TipoViatura.create({
        descricao: "Autocarros",
        combustivel: 23,
        autonomia: 200,
        velocidadeMedia: 30,
        custoKM: CustoKM.create({valor: 2, moeda: "EUR"}).getValue(),
        consumoMedio: 5}, new UniqueEntityID("123456789012349")).isSuccess).to.equal(true);
      });
    it('Não pode ser criado com combustivel invalido', () => {
        expect(TipoViatura.create({
            descricao: "Autocarros",
            combustivel: 32,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: CustoKM.create({valor: 2, moeda: "EUR"}).getValue(),
            consumoMedio: 5}, new UniqueEntityID("1234567890123490")).isSuccess).to.equal(false);
    });
    it('Não pode ser criado com consumo inferior a 0', () => {
        expect(TipoViatura.create({
            descricao: "Autocarros",
            combustivel: 32,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: CustoKM.create({valor: 2, moeda: "EUR"}).getValue(),
            consumoMedio: -3}, new UniqueEntityID("1234567890123490")).isSuccess).to.equal(false);
    });
    it('Não pode ser criado com velocidade inferior a 0', () => {
        expect(TipoViatura.create({
            descricao: "Autocarros",
            combustivel: 32,
            autonomia: 200,
            velocidadeMedia: -4,
            custoKM: CustoKM.create({valor: 2, moeda: "EUR"}).getValue(),
            consumoMedio: 5}, new UniqueEntityID("12345678901234567890")).isSuccess).to.equal(false);
    });
})