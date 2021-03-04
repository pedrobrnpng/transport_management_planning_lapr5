import { Repo } from "../../core/infra/Repo";
import { No } from "../../domain/no";
import { NoId } from "../../domain/noId";

export default interface INoRepo extends Repo<No> {
  save(role: No): Promise<No>;
  findByDomainId (roleId: NoId | string): Promise<No>;
  findAll(): Promise<Array<No>>;
  findSortedById(): Promise<Array<No>>;
  modify(no: No): Promise<No>;
}
