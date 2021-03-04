import { expect } from 'chai'
import { describe } from 'mocha'
import { NomeNo } from '../../../src/domain/nomeNo';

//Nome
const nome = 'Amial';
const nome_null = null;
const nome_undefined = undefined;
const nome_leghtError = nome.repeat(200);
const nome_vazio = "";



describe('No Name Domain Test', () => {
  it('Pode ser criado com nome', () => {
    expect(NomeNo.create(nome).isSuccess).to.equal(true);
  });
  it('Não pode ser criado vazio', () => {
    expect(NomeNo.create(nome_vazio).isSuccess).to.equal(false);
  });
  it('Não pode ser criado a null', () => {
    expect(NomeNo.create(nome_null).isSuccess).to.equal(false);
  });
  it('Não pode ser criado undifined', () => {
    expect(NomeNo.create(nome_undefined).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com tamanho superior a 200', () => {
    expect(NomeNo.create(nome_leghtError).isSuccess).to.equal(false);
  });
});