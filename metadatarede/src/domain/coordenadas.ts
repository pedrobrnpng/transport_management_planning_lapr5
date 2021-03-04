import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface CoordenadasProps {
    latitude: number;
    longitude: number
  }

export class Coordenadas extends ValueObject<CoordenadasProps>{
  private constructor (props: CoordenadasProps) {
    super(props);
  }

  public static create (latitude: number, longitude: number): Result<Coordenadas> {
    const guardResultX = Guard.againstNullOrUndefined(latitude, 'Latitude');
    const guardResultY = Guard.againstNullOrUndefined(longitude, 'Longitude');
    if (!guardResultX.succeeded || !guardResultY.succeeded || !this.validateCoordinates(latitude, longitude)) {
      return Result.fail<Coordenadas>("Coordenadas mal definida");
    } else {
      return Result.ok<Coordenadas>(new Coordenadas({ latitude: latitude , longitude: longitude}))
    }
  }

  private static validateCoordinates(latitude: number, longitude: number): boolean{
      return latitude >= -90 && latitude <= 90 && longitude <= 180 && longitude >=-180;
  }
}