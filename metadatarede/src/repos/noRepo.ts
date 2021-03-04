import { Service, Inject } from 'typedi';

import INoRepo from "./IRepos/INoRepo";
import { No } from "../domain/no";
import { NoId } from "../domain/noId";
import { NoMap } from "../mappers/NoMap";

import { Document, Model } from 'mongoose';
import { INoPersistence } from '../dataschema/INoPersistence';

@Service()
export default class NoRepo implements INoRepo {
  private models: any;

  constructor(
    @Inject('noSchema') private noSchema: Model<INoPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(noId: NoId | string): Promise<boolean> {

    const idX = noId instanceof NoId ? noId.id.toValue() : noId;

    const query = { domainId: idX.toString() };
    const noDocument = this.noSchema.findOne(query);

    return !!noDocument === true;
  }

  public async save(no: No): Promise<No> {
    const query = { domainId: no.id.toString() };
    
    const noDocument = await this.noSchema.findOne(query);

    if (noDocument === null) {
      const rawNo: any = NoMap.toPersistence(no);
      const noCreated = await this.noSchema.create(rawNo);
      return NoMap.toDomain(noCreated);
    } else {
      throw new Error("Nó já se encontra definido");
    }
  }

  public async modify(no: No): Promise<No> {
    const query = { domainId: no.id.toString() };

    const noDocument = await this.noSchema.findOne(query);

    try {
      noDocument.domainId = no.id.toString();
      noDocument.name = no.props.nome.props.value;
      noDocument.type = no.props.tipo.props.value;
      noDocument.xCoordinate = no.props.coordenadas.props.latitude;
      noDocument.yCoordinate = no.props.coordenadas.props.longitude;
      noDocument.modelo = no.props.modelo;
      await noDocument.save();

      return no;
    } catch {
      throw new Error("Não foi possível alterar o Nó");
    }
  }

  public async findByDomainId(noId: NoId | string): Promise<No> {
    const query = { domainId: noId.toString() };
    const noRecord = await this.noSchema.findOne(query);
    if (noRecord != null) {
      return NoMap.toDomain(noRecord);
    }
    else
      return null;
  }

  public async findSortedById(): Promise<Array<No>> {
    const noRecord = await Promise.resolve(this.noSchema.find().sort({ domainId: 1 }));
    const nos: Array<No> = [];

    if (noRecord != null) {
      noRecord.forEach(no => {
        nos.push(NoMap.toDomain(no))
      })
      return nos;
    }
    else
      return null;
  }

  public async findAll(): Promise<Array<No>> {
    const noRecord = this.noSchema.find();
    var nos: Array<No> = [];
    if (noRecord != null) {
      (await noRecord).forEach(element => {
        nos.push(NoMap.toDomain(element));
      });
      return nos;
    }
    else
      return null;
  }
}