import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TipoTripulanteId } from "./tipoTripulanteId";

import ITipoTripulanteDTO from "../dto/ITipoTripulanteDTO";

interface TipoTripulanteProps {
  description: string;
}

export class TipoTripulante extends AggregateRoot<TipoTripulanteProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get tipoTripulanteId (): TipoTripulanteId {
    return TipoTripulanteId.create(this.id);
  }

  get description (): string {
    return this.props.description;
  }

  set description ( value: string) {
    this.props.description = value;
  }
  private constructor (props: TipoTripulanteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (tipoTripulanteDTO: ITipoTripulanteDTO, id?: UniqueEntityID): Result<TipoTripulante> {
    const description = tipoTripulanteDTO.description;

    if (!!description === false || description.length === 0 || description.length > 250) {
      return Result.fail<TipoTripulante>("Tem de fornecer uma descrição para o tipo de tripulante");
    } else {
      const tipoTripulante = new TipoTripulante({ description: description }, id);
      return Result.ok<TipoTripulante>( tipoTripulante )
    }
  }
}
