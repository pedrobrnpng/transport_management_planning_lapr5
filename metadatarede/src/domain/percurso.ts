import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { PercursoId } from "./percursoId";
import { Guard } from "../core/logic/Guard";
import { SegmentoRede } from "./segmentoRede";

enum direcoes {
  ida,
  volta
}

export interface PercursoProps {
  segmentosRede : Array<SegmentoRede>;
  idLinha: string;
  direcao: string;
}

export class Percurso extends AggregateRoot<PercursoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get percursoId (): PercursoId {
    return PercursoId.caller(this.id)
  }

  get segmentosRede (): Array<SegmentoRede> {
    return this.props.segmentosRede;
  }

  get idLinha (): string {
    return this.props.idLinha;
  }

  get direcao (): string {
    return this.props.direcao;
  }

  private constructor (props: PercursoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  private static validaSegmentosRede(segmentosRede: Array<SegmentoRede>): boolean {
    var bol = true;
    var i=0;
    if(segmentosRede[0].idNoInicio.localeCompare(segmentosRede[0].idNoFim)==0) return false;
    while(i<segmentosRede.length-1) {
      if(segmentosRede[i].idNoFim.localeCompare(segmentosRede[i+1].idNoInicio) !=0 
      || segmentosRede[i+1].idNoInicio.localeCompare(segmentosRede[i+1].idNoFim) ==0 ) {
        bol= false;
      }
      i++;
    }
    return bol;
  }

  public static create (props: PercursoProps, id?: UniqueEntityID): Result<Percurso> {
    const guardedProps = [
      { argument: props.segmentosRede, argumentName: 'segmentosRede' },
      { argument: props.idLinha, argumentName: 'idLinha' },
      { argument: props.direcao, argumentName: 'direcao' }
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    const validaSegmentos= props.segmentosRede!=null?this.validaSegmentosRede(props.segmentosRede):null;
    const validaIdLinha = props.idLinha!=null? props.idLinha.length !=0:null;
    const validaDirecao = props.direcao!=null ?Object.values(direcoes).includes(props.direcao.toLowerCase()):null;
    if (!guardResult.succeeded || !validaSegmentos || !validaDirecao || !validaIdLinha) {
      return Result.fail<Percurso>("Percurso mal definido");
    }     
    else {
      const percurso = new Percurso(props
      , id);

      return Result.ok<Percurso>(percurso);
    }
  }
}