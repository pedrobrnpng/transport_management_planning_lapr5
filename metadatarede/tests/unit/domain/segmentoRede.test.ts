import { SegmentoRede } from '../../../src/domain/segmentoRede';
import { expect } from 'chai'
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Distancia } from '../../../src/domain/distancia';
import { TempoViagem } from '../../../src/domain/tempoViagem';


const value = 10;
const unidadeDistancia = "km";
const distancia = Distancia.create(value, unidadeDistancia).getValue();

const unidadeTempo = "m";
const tempoViagem = TempoViagem.create(value, unidadeTempo).getValue();

const idNoInicio = "no1";
const idNoFim = "no2";
const sequencia = 1;

describe('SegmentoRede Domain Test', () => {
  it('Pode ser criado com idNoInicio, idNoFim, unidadeTempo, tempoViagem, sequencia', () => {
    expect(SegmentoRede.create({
      idNoInicio: idNoInicio,
      idNoFim: idNoFim,
      distancia: distancia,
      tempoViagem: tempoViagem,
      sequencia: sequencia
    }).isSuccess).to.equal(true);
  });
  it('Não pode ser criado com idNoInicio null', () => {
    expect(SegmentoRede.create({
      idNoInicio: null,
      idNoFim: idNoFim,
      distancia: distancia,
      tempoViagem: tempoViagem,
      sequencia: sequencia
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com idNoFim null', () => {
    expect(SegmentoRede.create({
      idNoInicio: idNoInicio,
      idNoFim: null,
      distancia: distancia,
      tempoViagem: tempoViagem,
      sequencia: sequencia
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com distancia null', () => {
    expect(SegmentoRede.create({
      idNoInicio: idNoInicio,
      idNoFim: idNoFim,
      distancia: null,
      tempoViagem: tempoViagem,
      sequencia: sequencia
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com tempoViagem null', () => {
    expect(SegmentoRede.create({
      idNoInicio: idNoInicio,
      idNoFim: idNoFim,
      distancia: distancia,
      tempoViagem: null,
      sequencia: sequencia
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com idNoInicio vazio', () => {
    expect(SegmentoRede.create({
      idNoInicio: "",
      idNoFim: idNoFim,
      distancia: distancia,
      tempoViagem: tempoViagem,
      sequencia: sequencia
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com idNoFim vazio', () => {
    expect(SegmentoRede.create({
      idNoInicio: idNoInicio,
      idNoFim: "",
      distancia: distancia,
      tempoViagem: tempoViagem,
      sequencia: sequencia
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com sequencia 0', () => {
    expect(SegmentoRede.create({
      idNoInicio: "",
      idNoFim: idNoFim,
      distancia: distancia,
      tempoViagem: tempoViagem,
      sequencia: sequencia
    }).isSuccess).to.equal(false);
  });
});