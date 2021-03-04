import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

enum Moedas {
    EUR,
    USD
}

interface CustoKMProps {
    valor: number,
    moeda: string
}

export class CustoKM extends ValueObject<CustoKMProps> {

    get valor (): number {
        return this.props.valor;
    }
    
    get moeda (): string {
        return this.props.moeda;
    }

    set valor (value : number) {
        this.props.valor = value;
    };

    set moeda (value : string) {
        this.props.moeda = value;
    }

    private constructor (props: CustoKMProps) {
        super(props);
    }

    public static create (props: CustoKMProps): Result<CustoKM> {

        const guardResult = Guard.againstNullOrUndefined(props.valor, 'valor');
        const moedaValid = Object.values(Moedas).includes(props.moeda.toUpperCase());
        if(!guardResult.succeeded || !moedaValid || props.valor <= 0 ) {
            return Result.fail<CustoKM>("Custo por KM Inválido");
        } else {
            return Result.ok<CustoKM>(new CustoKM({valor:props.valor, moeda: props.moeda}));
        }
    }
    
}