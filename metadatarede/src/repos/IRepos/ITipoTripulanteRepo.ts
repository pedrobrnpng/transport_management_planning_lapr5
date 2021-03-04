import { Repo } from "../../core/infra/Repo";
import { TipoTripulante } from "../../domain/tipoTripulante";
import { TipoTripulanteId } from "../../domain/tipoTripulanteId";

export default interface ITipoTripulanteRepo extends Repo<TipoTripulante> {
  save(role: TipoTripulante): Promise<TipoTripulante>;
  findByDomainId (roleId: TipoTripulanteId | string): Promise<TipoTripulante>;
  findAll(): Promise<Array<TipoTripulante>>;
}
