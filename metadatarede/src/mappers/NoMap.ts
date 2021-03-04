import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { INoPersistence } from '../dataschema/INoPersistence';

import INoDTO from "../dto/INoDTO";
import { No } from "../domain/no";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class NoMap extends Mapper<No> {

  public static toDTO(no: No): INoDTO {
    return {
      id_abreviature: no.id.toString(),
      name: no.props.nome.props.value,
      type: no.props.tipo.props.value,
      xCoordinate: no.props.coordenadas.props.latitude,
      yCoordinate: no.props.coordenadas.props.longitude,
      modelo: no.props.modelo
    } as INoDTO;
  }

  public static toDomain(no: any | Model<INoPersistence & Document>): No {
    const noOrError = No.create(
      no,
      new UniqueEntityID(no.domainId)
    );

    if (noOrError.isFailure) {
      throw new Error(noOrError.error.toString());
    }

    return noOrError.isSuccess ? noOrError.getValue() : null;
  }

  public static toPersistence(no: No): INoPersistence {
    return {
      domainId: no.id.toString(),
      name: no.props.nome.props.value,
      type: no.props.tipo.props.value,
      xCoordinate: no.props.coordenadas.props.latitude,
      yCoordinate: no.props.coordenadas.props.longitude,
      modelo: no.props.modelo
    }
  }
}