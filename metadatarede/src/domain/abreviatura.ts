import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface AbreviaturaProps {
    value: string
  }

export class Abreviatura extends UniqueEntityID{
    private static readonly MAX_ABREVIATURA_LENGTH = 20;

    private constructor (props: AbreviaturaProps) {
        super(props.value);
    }
    
    public static create (abreviatura: string): Result<Abreviatura> {
    const guardResult = Guard.againstNullOrUndefined(abreviatura, 'Abreviatura');
    if (!guardResult.succeeded || abreviatura.length > this.MAX_ABREVIATURA_LENGTH) {
        return Result.fail<Abreviatura>("Abreviatura mal definida");
    } else {
        return Result.ok<Abreviatura>(new Abreviatura({ value: abreviatura}))
    }
    }
}