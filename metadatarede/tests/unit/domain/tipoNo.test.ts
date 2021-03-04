import { expect } from 'chai'
import { describe } from 'mocha'
import { TipoNo } from '../../../src/domain/tipoNo';

//TipoNo
const tipoNo_lowerCase = "paragem";
const tipoNo_upperCase = "PARAGEM";
const tipoNo_paragem = tipoNo_lowerCase;
const tipoNo_estacaoRecolha = "estacaoRecolha";
const tipoNo_pontoRendicao = "pontoRendicao"
const tipoNo_null = null;
const tipoNo_undefined = undefined;
const tipoNo_vazio = "";



describe('No Type Domain Test', () => {
  it('Pode ser do tipo "paragem"', () => {
    expect(TipoNo.create(tipoNo_paragem).isSuccess).to.equal(true);
  });
  it('Pode ser do tipo "estacaoRecolha"', () => {
    expect(TipoNo.create(tipoNo_estacaoRecolha).isSuccess).to.equal(true);
  });
  it('Pode ser do tipo "pontoRendicao"', () => {
    expect(TipoNo.create(tipoNo_pontoRendicao).isSuccess).to.equal(true);
  });
  it('Pode ser criado em letras minusculas', () => {
    expect(TipoNo.create(tipoNo_lowerCase).isSuccess).to.equal(true);
  });
  it('Pode ser criado em letras maiusculas', () => {
    expect(TipoNo.create(tipoNo_upperCase).isSuccess).to.equal(true);
  });
  it('Não pode ser criado com tipoNo a null', () => {
    expect(TipoNo.create(tipoNo_null).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com tipoNo undifined', () => {
    expect(TipoNo.create(tipoNo_undefined).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com tipoNo vazio', () => {
    expect(TipoNo.create(tipoNo_vazio).isSuccess).to.equal(false);
  });
});