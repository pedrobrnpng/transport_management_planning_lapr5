import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

export enum CombustivelEnum {
    gasoleo = "23" as any, 
    gpl = "20" as any, 
    hidrogenio = "50" as any,
    eletrico = "75" as any,
    gasolina = "1" as any
}

interface CombustivelProps {
    value: string
}

export class Combustivel extends ValueObject<CombustivelProps> {

    private constructor(props: CombustivelProps) {
        super(props);
    }
    
    public static create(combustivel: string): Result<Combustivel> {
        const guardResult = Guard.againstNullOrUndefined(combustivel, 'Combustivel');

        if(!guardResult.succeeded || !this.isValid(combustivel)) {
            return Result.fail<Combustivel>("combustivel nao existe");
        }

        return Result.ok<Combustivel>(new Combustivel({value: combustivel}));
    }

    public static isValid(value: string): boolean {
        return Object.keys(CombustivelEnum).includes(value);
    }
}
