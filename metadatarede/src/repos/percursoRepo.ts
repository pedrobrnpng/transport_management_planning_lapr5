import { Service, Inject } from 'typedi';

import IPercursoRepo from "./IRepos/IPercursoRepo";
import { Percurso } from "../domain/percurso";
import { PercursoId } from "../domain/percursoId";
import { PercursoMap } from "../mappers/PercursoMap";

import { Document, Model } from 'mongoose';
import { IPercursoPersistence } from '../dataschema/IPercursoPersistence';
import { SegmentoRede } from '../domain/segmentoRede';
import { LinhaId } from '../domain/linhaId';

@Service()
export default class PercursoRepo implements IPercursoRepo {
    private models: any;

    constructor(
        @Inject('percursoSchema') private percursoSchema: Model<IPercursoPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(percursoId: PercursoId | string): Promise<boolean> {

        const idX = percursoId instanceof PercursoId ? (<PercursoId>percursoId).id.toValue() : percursoId;

        const query = { domainId: idX.toString() };
        const percursoDocument = await this.percursoSchema.findOne(query);

        return !!percursoDocument === true;
    }

    public async save(percurso: Percurso): Promise<Percurso> {
        const query = { domainId: percurso.id.toString() };
        const percursoDocument = await this.percursoSchema.findOne(query);
        try {
            if (percursoDocument === null) {
                const rawPercurso: any = PercursoMap.toPersistence(percurso);
                const percursoCreated = await this.percursoSchema.create(rawPercurso);
                return PercursoMap.toDomain(percursoCreated);
            } else {
                throw new Error("Percurso já se encontra definido");
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(percursoId: PercursoId | string): Promise<Percurso> {
        const query = { domainId: percursoId.toString() };
        const percursoRecord = await this.percursoSchema.findOne(query);

        if (percursoRecord != null) {
            return PercursoMap.toDomain(percursoRecord);
        }
        else
            return null;
    }

    public async findByLinhaId(linhaId: LinhaId | string): Promise<Array<Percurso>> {
        const query = { idLinha: linhaId.toString() };
        const percursoRecords = await this.percursoSchema.find(query);
        const percursos: Array<Percurso> = [];
        

        if (percursoRecords != null) {
            percursoRecords.forEach(percurso => {
                percursos.push(PercursoMap.toDomain(percurso))
            })
            return percursos;
        }
        else
            return null;
    }

    public async findSortedByLinha(): Promise<Array<Percurso>>{
        const percursosRecord = await Promise.resolve(this.percursoSchema.find().sort({idLinha: 1}));
        const percursos: Array<Percurso> = [];

        if (percursosRecord != null) {
            percursosRecord.forEach(percurso => {
                percursos.push(PercursoMap.toDomain(percurso))
            })
            return percursos;
        }
        else
            return null;
    }
}