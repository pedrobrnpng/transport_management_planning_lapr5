import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";
import { TipoViaturaId } from "./tipoViaturaId";
import { CustoKM } from "./custokm";
import { Combustivel, CombustivelEnum } from "./combustivel";

interface TipoViaturaProps {
    descricao: string;
    combustivel: number;
    autonomia: number;
    velocidadeMedia: number;
    custoKM: CustoKM;
    consumoMedio: number;
}

export class TipoViatura extends AggregateRoot<TipoViaturaProps> {

    get id (): UniqueEntityID {
        return this._id;
    }

    get tipoViaturaId(): TipoViaturaId {
        return TipoViaturaId.caller(this.id);
    }

    get descricao (): string {
        return this.props.descricao;
    }

    get combustivel (): number {
        return this.props.combustivel;
    }

    get autonomia (): number {
        return this.props.autonomia;
    }

    get velocidadeMedia (): number {
        return this.props.velocidadeMedia;
    }

    get custoKM (): CustoKM {
        return this.props.custoKM;
    }

    get consumoMedio (): number {
        return this.props.consumoMedio;
    }

    private constructor (props: TipoViaturaProps, id?: UniqueEntityID){
        super(props,id);
    }

    public static create(props: TipoViaturaProps, id?: UniqueEntityID): Result<TipoViatura>{

        const guardedProps = [
            { argument: props.descricao, argumentName: 'descricao'},
            { argument: props.combustivel, argumentName: 'combustivel'},
            { argument: props.autonomia, argumentName: 'autonomia'},
            { argument: props.velocidadeMedia, argumentName: 'velocidadeMedia'},
            { argument: props.custoKM, argumentName: 'custoKM'},
            { argument: props.consumoMedio, argumentName: 'consumoMedio'},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        const custoKM = CustoKM.create(props.custoKM);
        const combustivel = Combustivel.create(props.combustivel.toString());
        const validaVelocidade = props.velocidadeMedia > 0;
        const validaCombustivel = Object.keys(CombustivelEnum).includes(props.combustivel.toString());
        const validaConsumo = props.consumoMedio > 0;

        if(!guardResult.succeeded || custoKM.isFailure || combustivel.isFailure
            || !validaConsumo || !validaCombustivel || !validaVelocidade ) {
            return Result.fail<TipoViatura>('Não foi possivel criar Tipo Viatura.');
        } else {
            const tipoViatura = new TipoViatura(props, id);
            return Result.ok<TipoViatura>(tipoViatura);
        }
    }
}