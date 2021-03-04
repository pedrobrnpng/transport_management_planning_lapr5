import { Percurso } from '../../../src/domain/percurso';
import { expect } from 'chai'
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { TempoViagem } from '../../../src/domain/tempoViagem';
import { Distancia } from '../../../src/domain/distancia';
import { SegmentoRede } from '../../../src/domain/segmentoRede';

//Distancia
const id = "p1";
const value = 10;
const unidadeDistancia = "km";
const distancia = Distancia.create(value, unidadeDistancia).getValue();

//Tempo
const unidadeTempo = "m";
const tempoViagem = TempoViagem.create(value, unidadeTempo).getValue();

//Segmentos de Rede
const segmentoRede1 = SegmentoRede.create({
  idNoInicio: "no1",
  idNoFim: "no2",
  distancia: distancia,
  tempoViagem: tempoViagem,
  sequencia: 1
}).getValue();

const segmentoRede2 = SegmentoRede.create({
  idNoInicio: "no2",
  idNoFim: "no3",
  distancia: distancia,
  tempoViagem: tempoViagem,
  sequencia: 2
}).getValue();

const segmentoRede3 = SegmentoRede.create({
  idNoInicio: "no4",
  idNoFim: "no3",
  distancia: distancia,
  tempoViagem: tempoViagem,
  sequencia: 2
}).getValue();
var list1: SegmentoRede[] = [];
var list2: SegmentoRede[] = [];

//Percurso
const idLinha = "linha1";
const direcao = "ida";

describe('Percurso Domain Test', () => {
  list1.push(segmentoRede1);
  list1.push(segmentoRede2);
  list2.push(segmentoRede1);
  list2.push(segmentoRede3);
  it('Pode ser criado com segmentos,idLinha e direcao', () => {
    expect(Percurso.create({
      segmentosRede: list1,
      idLinha: idLinha,
      direcao: direcao
    }).isSuccess).to.equal(true);
  });
  it('Não pode ser criado com segmentoRede null', () => {
    expect(Percurso.create({
      segmentosRede: null,
      idLinha: idLinha,
      direcao: direcao
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com segmentoRede que nao estão ligados', () => {
    expect(Percurso.create({
      segmentosRede: list2,
      idLinha: idLinha,
      direcao: direcao
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com idLinha null', () => {
    expect(Percurso.create({
      segmentosRede: list1,
      idLinha: null,
      direcao: direcao
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com direcao null', () => {
    expect(Percurso.create({
      segmentosRede: list1,
      idLinha: idLinha,
      direcao: null
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com idLinha vazio', () => {
    expect(Percurso.create({
      segmentosRede: list1,
      idLinha: "",
      direcao: direcao
    }).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com direcao vazio', () => {
    expect(Percurso.create({
      segmentosRede: list1,
      idLinha: idLinha,
      direcao: ""
    }).isSuccess).to.equal(false);
  });
});