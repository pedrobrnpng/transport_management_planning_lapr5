import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPercursoPersistence } from '../dataschema/IPercursoPersistence';

import IPercursoDTO from "../dto/IPercursoDTO";
import { Percurso } from "../domain/percurso";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import ISegmentoRedeDTO from "../dto/ISegmentoRedeDTO";
import { SegmentoRede } from "../domain/segmentoRede";
import { TempoViagem } from "../domain/tempoViagem";
import { SegmentoRedeId } from "../domain/segmentoRedeId";
import IDistanciaDTO from "../dto/IDistanciaDTO";
import ITempoViagemDTO from "../dto/ITempoViagemDTO";

export class PercursoMap extends Mapper<Percurso> {

    public static toDTO(percurso: Percurso): IPercursoDTO {
        return {
            id: percurso.id.toString(),
            segmentosRede: percurso.segmentosRede.map((element) => ({
                id: element.id.toString(),
                idNoInicio: element.idNoInicio,
                idNoFim: element.idNoFim,
                distancia: {
                    value: element.distancia.value,
                    unidadeDistancia: element.distancia.unidade,
                } as IDistanciaDTO,
                tempoViagem: {
                    value: element.tempoViagem.value,
                    unidadeTempo: element.tempoViagem.unidade,
                } as ITempoViagemDTO,
                sequencia: element.sequencia,
            }as ISegmentoRedeDTO)),
            idLinha: percurso.idLinha,
            direcao: percurso.direcao,
        } as IPercursoDTO;
    }

    public static toDomain(percurso: any | Model<IPercursoPersistence & Document>): Percurso {
        const percursoOrError = Percurso.create(
            percurso,
            new UniqueEntityID(percurso.domainId)
        );
        percursoOrError.isFailure ? console.log(percursoOrError.error) : '';

        return percursoOrError.isSuccess ? percursoOrError.getValue() : null;
    }

    public static toPersistence(percurso: Percurso): any {
        return {
            domainId: percurso.id.toString(),
            segmentosRede: percurso.segmentosRede.map((element) => ({
                domainId: element.id,
                idNoInicio: element.idNoInicio,
                idNoFim: element.idNoFim,
                distancia: {
                    value: element.distancia.value,
                    unidadeDistancia: element.distancia.unidade,
                },
                tempoViagem: {
                    value: element.tempoViagem.value,
                    unidadeTempo: element.tempoViagem.unidade,
                },
                sequencia: element.sequencia,
            })),
            idLinha: percurso.idLinha,
            direcao: percurso.direcao,
        }
    }
}