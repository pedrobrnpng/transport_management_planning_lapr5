import { expect } from 'chai'
import { describe } from 'mocha'
import { Coordenadas } from '../../../src/domain/coordenadas';

//Latitude
const latitude_positivo = 50;
const latitude_negativo = -50;
const latitude_superiorLengthError = 91;
const latitude_minorLengthError = -91;
const latitude_null = null;
const latitude_undefined = undefined;

//Longitude
const longitude_positivo = 120;
const longitude_negativo = -120;
const longitude_superiorLengthError = 181;
const longitude_minorLengthError = -181;
const longitude_null = null;
const longitude_undefined = undefined;



describe('Coordinates Domain Test', () => {
  it('Pode ser criado com latitude e longitude positivos', () => {
    expect(Coordenadas.create(latitude_positivo, longitude_positivo).isSuccess).to.equal(true);
  });
  it('Pode ser criado com latitude e longitude negativos', () => {
    expect(Coordenadas.create(latitude_negativo, longitude_negativo).isSuccess).to.equal(true);
  });
  it('Não pode ser criado com longitude a null', () => {
    expect(Coordenadas.create(latitude_negativo, longitude_null).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com latitude a null', () => {
    expect(Coordenadas.create(latitude_null, longitude_negativo).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a latitude undifined', () => {
    expect(Coordenadas.create(latitude_undefined, longitude_negativo).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a longitude undifined', () => {
    expect(Coordenadas.create(latitude_negativo, longitude_undefined).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a longitude superior a 180', () => {
    expect(Coordenadas.create(latitude_negativo, longitude_superiorLengthError).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a longitude inferior a -180', () => {
    expect(Coordenadas.create(latitude_negativo, longitude_minorLengthError).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a latitude inferior a -90', () => {
    expect(Coordenadas.create(latitude_minorLengthError, longitude_positivo).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com a longitude superior a 90', () => {
    expect(Coordenadas.create(latitude_superiorLengthError, longitude_positivo).isSuccess).to.equal(false);
  });
});