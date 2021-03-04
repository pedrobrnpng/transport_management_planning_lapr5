import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import ITipoViaturaDTO from "../dto/ITipoViaturaDTO";

import { TipoViatura } from "../domain/tipoViatura";
import { CustoKM } from "../domain/custokm";
import { ITipoViaturaPersistence } from "../dataschema/ITipoViaturaPersistence";
import { Document, Model } from "mongoose";

import { Combustivel } from "../domain/combustivel";

export class TipoViaturaMap extends Mapper<TipoViatura> {
  
  public static toDTO( tipoViatura: TipoViatura ): ITipoViaturaDTO {
    return {
      id: tipoViatura.id.toString(),
      descricao: tipoViatura.descricao,
      combustivel: tipoViatura.combustivel,
      autonomia: tipoViatura.autonomia,
      velocidadeMedia: tipoViatura.velocidadeMedia,
      custoKM: {
        valor: tipoViatura.custoKM.valor,
        moeda: tipoViatura.custoKM.moeda
      },
      consumoMedio: tipoViatura.consumoMedio
    } as ITipoViaturaDTO;
  }

  public static toDomain (tipoViatura: any | Model<ITipoViaturaPersistence & Document>): TipoViatura {
    const custoKMOrError = CustoKM.create(tipoViatura.custoKM);
    const combustivelOrError = Combustivel.create(tipoViatura.combustivel.toString());

    custoKMOrError.isFailure ? console.log(custoKMOrError.error) : '';
    combustivelOrError.isFailure ? console.log(combustivelOrError.error) : '';
    
    const tipoViaturaOrError = TipoViatura.create({
      descricao: tipoViatura.descricao,
      combustivel: parseInt(combustivelOrError.getValue().props.value),
      autonomia: tipoViatura.autonomia,
      velocidadeMedia: tipoViatura.velocidadeMedia,
      custoKM: custoKMOrError.getValue(),
      consumoMedio: tipoViatura.consumoMedio
    }, new UniqueEntityID(tipoViatura.domainId)
    );

    tipoViaturaOrError.isFailure ? console.log(tipoViaturaOrError.error) : '';

    return tipoViaturaOrError.isSuccess ? tipoViaturaOrError.getValue() : null;
  }

  public static toPersistence (tipoViatura: TipoViatura): any {
      const newTipoViatura = {
        domainId: tipoViatura.id.toString(),
        descricao: tipoViatura.descricao,
        combustivel: tipoViatura.combustivel,
        autonomia: tipoViatura.autonomia,
        velocidadeMedia: tipoViatura.velocidadeMedia,
        custoKM: {
          valor: tipoViatura.custoKM.valor,
          moeda: tipoViatura.custoKM.moeda
        },
        consumoMedio: tipoViatura.consumoMedio
      };
      return newTipoViatura;    
  }
}