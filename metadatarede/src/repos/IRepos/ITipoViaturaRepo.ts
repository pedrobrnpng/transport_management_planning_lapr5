import { Repo } from "../../core/infra/Repo";

import { TipoViatura } from "../../domain/tipoViatura";
import { TipoViaturaId } from "../../domain/tipoViaturaId"

export default interface ITipoViaturaRepo extends Repo<TipoViatura> {
    save(tipoViatura: TipoViatura): Promise<TipoViatura>;
    findByDomainId(tipoViaturaId: TipoViaturaId | string): Promise<TipoViatura>;
    findAll(): Promise<Array<TipoViatura>>;
}