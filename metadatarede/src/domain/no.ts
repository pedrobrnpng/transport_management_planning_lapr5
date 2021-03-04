import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { NoId } from "./noId";

import INoDTO from "../dto/INoDTO";

import { Abreviatura } from "./abreviatura";
import { Coordenadas } from "./coordenadas";
import { TipoNo } from "./tipoNo";
import { NomeNo } from "./nomeNo";
import { Guard } from "../core/logic/Guard";

interface NoProps {
  nome: NomeNo;
  tipo: TipoNo;
  coordenadas: Coordenadas;
  modelo?: string;
}

export class No extends AggregateRoot<NoProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get noId(): NoId {
    return NoId.create(this.id);
  }

  private constructor(props: NoProps, id: Abreviatura) {
    super(props, id);
  }

  public static create(noDTO: INoDTO, id: Abreviatura): Result<No> {
    const nome = NomeNo.create(noDTO.name);
    const tipo = TipoNo.create(noDTO.type);
    const coordenadas = Coordenadas.create(noDTO.xCoordinate, noDTO.yCoordinate);
    const guardResult = Guard.againstNullOrUndefined(id, 'ID');
    if (nome.isFailure || tipo.isFailure || coordenadas.isFailure || !guardResult.succeeded) {
      return Result.fail<No>("Não foi possível criar Nó.");
    } else {
      const no = new No({
        nome: nome.getValue(),
        tipo: tipo.getValue(),
        coordenadas: coordenadas.getValue(),
        modelo: noDTO.modelo
      }, id);
      return Result.ok<No>(no)
    }
  }
}
