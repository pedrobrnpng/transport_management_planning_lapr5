import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITipoTripulantePersistence } from '../dataschema/ITipoTripulantePersistence';

import ITipoTripulanteDTO from "../dto/ITipoTripulanteDTO";
import { TipoTripulante } from "../domain/tipoTripulante";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TipoTripulanteMap extends Mapper<TipoTripulante> {
  
  public static toDTO( tipoTripulante: TipoTripulante): ITipoTripulanteDTO {
    return {
      id: tipoTripulante.id.toString(),
      description: tipoTripulante.description,
    } as ITipoTripulanteDTO;
  }

  public static toDomain (tipoTripulante: any | Model<ITipoTripulantePersistence & Document> ): TipoTripulante {
    const tipoTripulanteOrError = TipoTripulante.create(
      tipoTripulante,
      new UniqueEntityID(tipoTripulante.domainId)
    );

    tipoTripulanteOrError.isFailure ? console.log(tipoTripulanteOrError.error) : '';

    return tipoTripulanteOrError.isSuccess ? tipoTripulanteOrError.getValue() : null;
  }

  public static toPersistence (tipoTripulante: TipoTripulante): any {
    return {
      domainId: tipoTripulante.id.toString(),
      description: tipoTripulante.description
    }
  }
}