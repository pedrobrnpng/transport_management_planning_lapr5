import { Service, Inject } from 'typedi';
import ITipoViaturaRepo from "./IRepos/ITipoViaturaRepo";
import { TipoViatura } from "../domain/tipoViatura";
import { TipoViaturaId } from "../domain/tipoViaturaId";
import { TipoViaturaMap } from "../mappers/TipoViaturaMap";
import { Document, Model } from 'mongoose';
import { ITipoViaturaPersistence } from "../dataschema/ITipoViaturaPersistence";

@Service()
export default class TipoViaturaRepo implements ITipoViaturaRepo {
    private models: any;

    constructor(
        @Inject('tipoViaturaSchema') private tipoViaturaSchema : Model<ITipoViaturaPersistence & Document>,
    ) {}

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists (tipoViaturaId: TipoViaturaId | string): Promise<boolean> {
        const idX = tipoViaturaId instanceof TipoViaturaId ? (<TipoViaturaId> tipoViaturaId).id.toValue() : tipoViaturaId;
        const query = { domainId: idX.toString()};
        const tipoViaturaDocument = await this.tipoViaturaSchema.findOne( query );

        return !!tipoViaturaDocument === true;
    }

    public async save (tipoViatura: TipoViatura): Promise<TipoViatura> {
        const query = { domainId: tipoViatura.id.toString()};
        const tipoViaturaDocument = await this.tipoViaturaSchema.findOne(query);

        try{
            if(tipoViaturaDocument === null){
                const rawTipoViatura: any = TipoViaturaMap.toPersistence(tipoViatura);

                const tipoViaturaCreated = await this.tipoViaturaSchema.create(rawTipoViatura);
                
                return TipoViaturaMap.toDomain(tipoViaturaCreated);
            } else {
                throw new Error("Tipo de Viatura já definido.");
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(tipoViaturaId: string | TipoViaturaId): Promise<TipoViatura> {
        const query = { domainId: tipoViaturaId.toString() };
        const tipoViaturaRecord = await this.tipoViaturaSchema.findOne( query );
        if(tipoViaturaRecord != null) {
            return TipoViaturaMap.toDomain(tipoViaturaRecord);
        } else
            return null;
    }

    public async findAll() : Promise<Array<TipoViatura>> {
        const tipoViaturaRecord = await this.tipoViaturaSchema.find();
        const tipoViaturas:Array<TipoViatura> =[];
        if( tipoViaturaRecord != null) {
            tipoViaturaRecord.forEach(element => {
                tipoViaturas.push(TipoViaturaMap.toDomain(element));
          });
          return tipoViaturas;
        }
        else
          return null;
    }
}
