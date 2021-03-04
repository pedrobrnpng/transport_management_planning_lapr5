import { Service, Inject } from 'typedi';

import ITipoTripulanteRepo from "./IRepos/ITipoTripulanteRepo";
import { TipoTripulante } from "../domain/tipoTripulante";
import { TipoTripulanteId } from "../domain/tipoTripulanteId";
import { TipoTripulanteMap } from "../mappers/TipoTripulanteMap";

import { Document, Model } from 'mongoose';
import { ITipoTripulantePersistence } from '../dataschema/ITipoTripulantePersistence';

@Service()
export default class TipoTripulanteRepo implements ITipoTripulanteRepo {
  private models: any;

  constructor(
    @Inject('tipoTripulanteSchema') private tipoTripulanteSchema: Model<ITipoTripulantePersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(tipoTripulanteId: TipoTripulanteId | string): Promise<boolean> {

    const idX = tipoTripulanteId instanceof TipoTripulanteId ? (<TipoTripulanteId>tipoTripulanteId).id.toValue() : tipoTripulanteId;

    const query = { domainId: idX.toString() };
    const tipoTripulanteDocument = await this.tipoTripulanteSchema.findOne(query);

    return !!tipoTripulanteDocument === true;
  }

  public async save(tipoTripulante: TipoTripulante): Promise<TipoTripulante> {
    const query = { domainId: tipoTripulante.id.toString() };

    const tipoTripulanteDocument = await this.tipoTripulanteSchema.findOne(query);

    try {
      if (tipoTripulanteDocument === null) {
        const rawTipoTripulante: any = TipoTripulanteMap.toPersistence(tipoTripulante);

        const tipoTripulanteCreated = await this.tipoTripulanteSchema.create(rawTipoTripulante);

        return TipoTripulanteMap.toDomain(tipoTripulanteCreated);
      } else {
        throw new Error("Tipo de tripulante já se encontra definido");
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(tipoTripulanteId: TipoTripulanteId | string): Promise<TipoTripulante> {
    const query = { domainId: tipoTripulanteId.toString() };
    const tipoTripulanteRecord = await this.tipoTripulanteSchema.findOne(query);

    if (tipoTripulanteRecord != null) {
      return TipoTripulanteMap.toDomain(tipoTripulanteRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Array<TipoTripulante>> {
    const tipoTripulanteRecord = await this.tipoTripulanteSchema.find();
    var tipoTripulantes: Array<TipoTripulante> = [];
    if (tipoTripulanteRecord != null) {
      tipoTripulanteRecord.forEach(element => {
        tipoTripulantes.push(TipoTripulanteMap.toDomain(element));
      });
      return tipoTripulantes;
    }
    else
      return null;
  }
}