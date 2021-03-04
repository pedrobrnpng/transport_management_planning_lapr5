import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface NomeNoProps {
    value: string
  }

export class NomeNo extends ValueObject<NomeNoProps>{
    private static readonly MAX_NAME_LENGTH = 200;

  private constructor (props: NomeNoProps) {
    super(props);
  }

  public static create (nome: string): Result<NomeNo> {
    const guardResult = Guard.againstNullOrUndefined(nome, 'Latitude');
    if (!guardResult.succeeded || nome.length > this.MAX_NAME_LENGTH || nome.length == 0) {
      return Result.fail<NomeNo>("NomeNo mal definida");
    } else {
      return Result.ok<NomeNo>(new NomeNo({ value: nome}))
    }
  }
}