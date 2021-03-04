import { expect } from 'chai'
import { describe } from 'mocha'
import { Abreviatura } from '../../../src/domain/abreviatura';

//Abreviatura
const abreviatura = "AML";
const abreviatura_null = null;
const abreviatura_undefined = undefined;
const abreviatura_maxLengthError = abreviatura.repeat(20);



describe('Abreviature Domain Test', () => {
  it('Pode ser criado com abreviatura', () => {
    expect(Abreviatura.create(abreviatura).isSuccess).to.equal(true);
  });
  it('Não pode ser criado com abreviatura a null', () => {
    expect(Abreviatura.create(abreviatura_null).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a abreviatura undifined', () => {
    expect(Abreviatura.create(abreviatura_undefined).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a abreviatura de comprimento superior a 20', () => {
    expect(Abreviatura.create(abreviatura_maxLengthError).isSuccess).to.equal(false);
  });
});