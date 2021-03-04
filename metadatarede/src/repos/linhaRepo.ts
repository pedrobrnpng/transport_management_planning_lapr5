import { Service, Inject } from 'typedi';

import ILinhaRepo from "./IRepos/ILinhaRepo";
import { Linha } from "../domain/linha";
import { LinhaId } from "../domain/linhaId"
import { LinhaMap } from "../mappers/LinhaMap";

import { Document, Model } from 'mongoose';
import { ILinhaPersistence } from "../dataschema/ILinhaPersistence";

@Service()
export default class LinhaRepo implements ILinhaRepo {
    private models: any;

    constructor(
        @Inject('linhaSchema') private linhaSchema: Model<ILinhaPersistence & Document>,
    ) {}

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(linhaId: LinhaId | string): Promise<boolean> {

        const idX = linhaId instanceof LinhaId ? (<LinhaId> linhaId).id.toValue() : linhaId;

        const query = { domainId: idX.toString() };
        const linhaDoc = await this.linhaSchema.findOne(query);

        return !!linhaDoc === true;
    }

    public async save(linha: Linha): Promise<Linha> {
        const query = { domainId: linha.id.toString()};

        const linhaDoc = await this.linhaSchema.findOne( query );
        try {
            if(linhaDoc === null ) {
                const rawLinha: any = LinhaMap.toPersistence(linha);
                const linhaCreated = await this.linhaSchema.create(rawLinha);
                return LinhaMap.toDomain(linhaCreated);

            } else {
                throw new Error("Linha já definida.");
            }
        } catch (err){
            throw err;
        }
    }

    
  public async findByDomainId (linhaId: LinhaId | string): Promise<Linha> {
    const query = { domainId: linhaId.toString()};
    const linhaRecord = await this.linhaSchema.findOne( query );
    
    if( linhaRecord != null) {
      return LinhaMap.toDomain(linhaRecord);
    }
    else
      return null;
  }

  public async findAll() : Promise<Array<Linha>> {
      const linhaRecord = await this.linhaSchema.find();
      var linhas:Array<Linha> =[];
      if( linhaRecord != null) {
          linhaRecord.forEach(element => {
              linhas.push(LinhaMap.toDomain(element));
          });
        return linhas;
      }
      else
        return null;
  }

  public async findSortedById(): Promise<Array<Linha>>{
    const linhaRecord = await Promise.resolve(this.linhaSchema.find().sort({domainId: 1}));
    const linhas: Array<Linha> = [];

    if (linhaRecord != null) {
        linhaRecord.forEach(linha => {
            linhas.push(LinhaMap.toDomain(linha))
        })
        return linhas;
    }
    else
        return null;
    }
}
