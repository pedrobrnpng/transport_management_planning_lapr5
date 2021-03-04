import { Entity } from "../core/domain/Entity";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class LinhaId extends Entity<any> {

    get id (): UniqueEntityID {
        return this._id;
    }

    public static create (id?: UniqueEntityID): LinhaId {
        return new LinhaId(id);
    }
}