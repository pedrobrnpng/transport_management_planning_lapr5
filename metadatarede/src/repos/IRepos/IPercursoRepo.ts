import { Repo } from "../../core/infra/Repo";
import { Percurso } from "../../domain/percurso";
import { PercursoId } from "../../domain/percursoId";

export default interface IPercursoRepo extends Repo<Percurso> {
  save(percurso: Percurso): Promise<Percurso>;
  findByLinhaId(percursoId: PercursoId | string): Promise<Array<Percurso>>;
  findSortedByLinha(): Promise<Array<Percurso>>;
  findByDomainId(percursoId: PercursoId | string): Promise<Percurso>;
}
