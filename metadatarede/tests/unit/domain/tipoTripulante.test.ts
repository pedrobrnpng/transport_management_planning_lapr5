import { TipoTripulante } from '../../../src/domain/tipoTripulante';
import ITipoTripulanteDTO from '../../../src/dto/ITipoTripulanteDTO';
import { expect } from 'chai'
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

const id = "tp1";
const descricao = "Fala inglês";

describe('TipoTripulante Domain Test', () => {
  it('Pode ser criado com descrição e id', () => {
    expect(TipoTripulante.create({ id: id, description: descricao }, new UniqueEntityID(id)).isSuccess).to.equal(true);
  });
  it('Não pode ser criado com descrição null', () => {
    expect(TipoTripulante.create({ id: id, description: null }, new UniqueEntityID(id)).isSuccess).to.equal(false);
  });
  it('Não pode ser criado com descrição vazio', () => {
    expect(TipoTripulante.create({ id: id, description: "" }, new UniqueEntityID(id)).isSuccess).to.equal(false);
  });
  it ('Não pode ser criado com descrição de tamanho superior a 250', () => {
    expect(TipoTripulante.create({ id: id, description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }, 
    new UniqueEntityID(id)).isSuccess).to.equal(false);
  });
});