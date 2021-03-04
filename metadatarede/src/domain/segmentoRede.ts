import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { SegmentoRedeId } from "./segmentoRedeId";
import { Guard } from "../core/logic/Guard";
import { Distancia } from "./distancia";
import { TempoViagem } from "./tempoViagem";
import { Entity } from "../core/domain/Entity";


interface SegmentoRedeProps {
  idNoInicio: string;
  idNoFim: string;
  distancia: Distancia;
  tempoViagem: TempoViagem;
  sequencia: number;
}

export class SegmentoRede extends Entity<SegmentoRedeProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get segmentoRedeId (): SegmentoRedeId {
    return SegmentoRedeId.caller(this.id)
  }

  get idNoInicio (): string {
    return this.props.idNoInicio;
  }

  get idNoFim (): string {
    return this.props.idNoFim;
  }

  get tempoViagem (): TempoViagem {
    return this.props.tempoViagem;
  }

  get distancia (): Distancia {
    return this.props.distancia;
  }

  get sequencia (): number {
      return this.props.sequencia;
  }

  private constructor (props: SegmentoRedeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: SegmentoRedeProps, id?: UniqueEntityID): Result<SegmentoRede> {
    const guardedProps = [
      { argument: props.idNoInicio, argumentName: 'idNoInicio' },
      { argument: props.idNoFim, argumentName: 'idNoFim' },
      { argument: props.distancia, argumentName: 'distancia' },
      { argument: props.tempoViagem, argumentName: 'tempoViagem' },
      { argument: props.sequencia, argumentName: 'sequencia' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    const emptyStrings = (props.idNoInicio!=null? props.idNoInicio.length == 0: null) || (props.idNoFim!=null?props.idNoFim.length == 0:null);
    const sequenciaWrongValue = props.sequencia ==0 ; 
    if (!guardResult.succeeded || emptyStrings || sequenciaWrongValue) {
      return Result.fail<SegmentoRede>('Segmento de rede mal definido');
    }     
    else {
      const segmentoRede = new SegmentoRede({
        ...props
      }, id);

      return Result.ok<SegmentoRede>(segmentoRede);
    }
  }
}