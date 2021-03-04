import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

enum TipoNoEnum {
  paragem = "paragem",
  estacaorecolha = "estacaorecolha",
  pontorendicao = "pontorendicao"
}
interface TipoNoProps {
  value: string
}

export class TipoNo extends ValueObject<TipoNoProps>{

  private constructor(props: TipoNoProps) {
    super(props);
  }
  
  public static create(tipo: string): Result<TipoNo> {
    const guardResult = Guard.againstNullOrUndefined(tipo, 'Tipo de Nó');
    if (!guardResult.succeeded  || !this.isValid(tipo.toLowerCase())) {
      return Result.fail<TipoNo>("TipoNo mal definida");
    } else {

      return Result.ok<TipoNo>(new TipoNo({ value: tipo.toLowerCase() }))
    }
  }

  public static isValid(value: string): boolean {
    return Object.keys(TipoNoEnum).includes(value);
  }
}