import { Entity } from "../core/domain/Entity";
import { Abreviatura } from "./abreviatura";

export class NoId extends Entity<any> {

    get id(): Abreviatura {
        return this._id;
    }

    public static create(id: Abreviatura): NoId {
        //let id = Abreviatura.create(abreviatura);
        return new NoId(id);
    }
}