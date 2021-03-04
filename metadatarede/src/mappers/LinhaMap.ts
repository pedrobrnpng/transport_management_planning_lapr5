import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ILinhaPersistence } from '../dataschema/ILinhaPersistence';

import ILinhaDTO from "../dto/ILinhaDTO";
import { Linha } from "../domain/linha";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class LinhaMap extends Mapper<Linha> {

    public static toDTO (linha: Linha): ILinhaDTO {
        var tiposViatura: any[] = [];
                linha.idTiposViatura.forEach(e => tiposViatura.push(e));

        var tiposTripulante: any[] = [];
                linha.idTiposTripulante.forEach(e => tiposTripulante.push(e));
                
        return {
            id: linha.id.toString(),
            noInicial: linha.props.noInicial,
            noFinal: linha.props.noFinal,
            nome: linha.nome,
            idTiposTripulante: tiposTripulante,
            idTiposViatura: tiposViatura,
            cor: linha.cor
        } as ILinhaDTO;
    }

    public static toDomain (linha: any | Model<ILinhaPersistence & Document> ): Linha {
        const linhaOrError = Linha.create(
            linha,
            new UniqueEntityID(linha.domainId)
        );

        linhaOrError.isFailure ? console.log(linhaOrError.error) : '';

        return linhaOrError.isSuccess ? linhaOrError.getValue() : null;
    }

    public static toPersistence (linha: Linha): any {
        var tiposTripulante: any[] = [];
            linha.idTiposTripulante.forEach(e => tiposTripulante.push( e ));
        var tiposViatura: any[] = [];
            linha.idTiposViatura.forEach(e => tiposViatura.push( e ));
                
        return {
            domainId: linha.id.toString(),
            noInicial: linha.noInicial,
            noFinal: linha.noFinal,
            nome: linha.nome,
            idTiposTripulante: tiposTripulante,
            idTiposViatura: tiposViatura,
            cor: linha.cor
        }
    }
}