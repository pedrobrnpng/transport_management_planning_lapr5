
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

enum UnidadesDistancia {
    km,
    m
}

interface DistanciaProps {
  value: number;
  unidadeDistancia: string
}

export class Distancia extends ValueObject<DistanciaProps> {
  get value (): number {
    return this.props.value;
  }

  get unidade(): string{
      return this.props.unidadeDistancia;
  }
  
  private constructor (props: DistanciaProps) {
    super(props);
  }

  public static create (distancia: number, unidade: string): Result<Distancia> {
    const guardResult = Guard.againstNullOrUndefined(distancia, 'distancia');
    const unidadeValid = Object.values(UnidadesDistancia).includes(unidade!=null?unidade.toLowerCase():null);
    if (!guardResult.succeeded || !unidadeValid) {
      return Result.fail<Distancia>("Distancia mal definida");
    } else {
      return Result.ok<Distancia>(new Distancia({ value: distancia , unidadeDistancia: unidade}))
    }
  }
}