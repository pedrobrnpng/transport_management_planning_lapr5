import { No } from '../../../src/domain/no';
import { expect } from 'chai'
import { describe } from 'mocha'
import { NomeNo } from '../../../src/domain/nomeNo';
import { TipoNo } from '../../../src/domain/tipoNo';
import { Coordenadas } from '../../../src/domain/coordenadas';
import { Abreviatura } from '../../../src/domain/abreviatura';

//Abreviatura
const id = Abreviatura.create("AML");

//Nome
const nome = NomeNo.create("Amial");

//Tipos de Nó
const tipoNo1 = TipoNo.create("paragem");

//Coordenadas
const coordenadas = Coordenadas.create(50,50);

describe('No Domain Test', () => {
  it('Pode ser criado abreviatura, nome, tipo de no e coordenadas', () => {
    expect(No.create({
        id_abreviature: id.getValue().toString(),
        name: nome.getValue().props.value,
        xCoordinate: coordenadas.getValue().props.latitude,
        yCoordinate: coordenadas.getValue().props.longitude,
        type: tipoNo1.getValue().props.value
    }, id.getValue()).isSuccess).to.equal(true);
  });
  it('Não pode ser criado com abreviatura null', () => {
    expect(No.create({
        id_abreviature: null,
        name: nome.getValue().props.value,
        xCoordinate: coordenadas.getValue().props.latitude,
        yCoordinate: coordenadas.getValue().props.longitude,
        type: tipoNo1.getValue().props.value
    }, null).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com coordenadas null', () => {
    expect(No.create({
        id_abreviature: id.getValue().toString(),
        name: nome.getValue().props.value,
        xCoordinate: null,
        yCoordinate: null,
        type: tipoNo1.getValue().props.value
    }, id.getValue()).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com tipo null', () => {
    expect(No.create({
        id_abreviature: id.getValue().toString(),
        name: nome.getValue().props.value,
        xCoordinate: coordenadas.getValue().props.latitude,
        yCoordinate: coordenadas.getValue().props.longitude,
        type: null
    }, id.getValue()).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com tipo vazio', () => {
    expect(No.create({
        id_abreviature: id.getValue().toString(),
        name: nome.getValue().props.value,
        xCoordinate: coordenadas.getValue().props.latitude,
        yCoordinate: coordenadas.getValue().props.longitude,
        type: ""
    }, id.getValue()).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com name vazio', () => {
    expect(No.create({
        id_abreviature: id.getValue().toString(),
        name: "",
        xCoordinate: coordenadas.getValue().props.latitude,
        yCoordinate: coordenadas.getValue().props.longitude,
        type: tipoNo1.getValue().props.value
    }, id.getValue()).isSuccess).to.equal(false);
  });
});