import { Repo } from "../../core/infra/Repo";
import { Linha } from "../../domain/linha";
import { LinhaId } from "../../domain/linhaId";

export default interface ILinhaRepo extends Repo<Linha> {
    save(linha: Linha): Promise<Linha>;
    findByDomainId (roleId: LinhaId | string): Promise<Linha>;
    findAll(): Promise<Array<Linha>>;
    findSortedById(): Promise<Array<Linha>>;
}