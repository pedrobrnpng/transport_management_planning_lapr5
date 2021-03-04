
import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

enum UnidadesTempo {
    h,
    m,
    s
}

interface TempoViagemProps {
  value: number;
  unidadeTempo: string
}

export class TempoViagem extends ValueObject<TempoViagemProps> {
  get value (): number {
    return this.props.value;
  }

  get unidade(): string{
      return this.props.unidadeTempo;
  }
  
  private constructor (props: TempoViagemProps) {
    super(props);
  }

  public static create (tempoViagem: number, unidade: string): Result<TempoViagem> {
    const guardResult = Guard.againstNullOrUndefined(tempoViagem, 'tempoViagem');
    const unidadeValid = Object.values(UnidadesTempo).includes(unidade!=null?unidade.toLowerCase():null);
    if (!guardResult.succeeded || !unidadeValid) {
      return Result.fail<TempoViagem>("Tempo de viagem mal definido");
    } else {
      return Result.ok<TempoViagem>(new TempoViagem({ value: tempoViagem , unidadeTempo: unidade}))
    }
  }
}