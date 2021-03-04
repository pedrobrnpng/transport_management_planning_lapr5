import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

import { LinhaId } from "./linhaId";

interface LinhaProps {
    noInicial: string;
    noFinal: string;
    nome: string;
    idTiposTripulante: Array<string>;
    idTiposViatura: Array<string>;
    cor: string;
}

export class Linha extends AggregateRoot<LinhaProps> {

    get id (): UniqueEntityID {
        return this._id;
    }

    get linhaId (): LinhaId {
        return LinhaId.create(this.id);
    }

    get noInicial(): string {
        return this.props.noInicial;
    }

    get noFinal(): string {
        return this.props.noFinal;
    }

    get nome (): string {
        return this.props.nome;
    }

    get idTiposTripulante (): Array<string> {
        return this.props.idTiposTripulante;
    }

    get idTiposViatura (): Array<string> {
        return this.props.idTiposViatura;
    }

    get cor (): string {
        return this.props.cor;
    }

    private constructor (props: LinhaProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: LinhaProps, id?: UniqueEntityID): Result<Linha> {
        const guardedProps = [
            {argument: props.noInicial, argumentName: 'noInicial'},
            {argument: props.noFinal, argumentName: 'noFinal'},
            {argument: props.nome, argumentName: 'nome'},
            {argument: props.idTiposTripulante, argumentName: 'idTiposTripulante'},
            {argument: props.idTiposViatura, argumentName: 'idTiposViatura'},
            {argument: props.cor, argumentName: 'cor'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        const validaNome = props.nome.length >= 5 && props.nome.length <= 20;
        
        if(!guardResult.succeeded || !validaNome) {
            return Result.fail<Linha>("Linha mal definido");
        } else {
            const linha = new Linha(props, id);
            return Result.ok<Linha>(linha);
        }    
    }
}