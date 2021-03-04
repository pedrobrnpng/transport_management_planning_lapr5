import { Service, Inject } from 'typedi';
import config from "../../config";
import ITipoTripulanteDTO from '../dto/ITipoTripulanteDTO';
import { TipoTripulante } from "../domain/tipoTripulante";
import ITipoTripulanteRepo from '../repos/IRepos/ITipoTripulanteRepo';
import ITipoTripulanteService from './IServices/ITipoTripulanteService';
import { Result } from "../core/logic/Result";
import { TipoTripulanteMap } from "../mappers/TipoTripulanteMap";
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

@Service()
export default class TipoTripulanteService implements ITipoTripulanteService {
  constructor(
    @Inject(config.repos.tipoTripulante.name) private tipoTripulanteRepo: ITipoTripulanteRepo
  ) { }

  public async criarTipoTripulante(tipoTripulanteDTO: ITipoTripulanteDTO): Promise<Result<ITipoTripulanteDTO>> {
    try {
      const tipoTripulanteOrError = TipoTripulante.create(tipoTripulanteDTO, new UniqueEntityID(tipoTripulanteDTO.id));

      if (tipoTripulanteOrError.isFailure) {
        return Result.fail<ITipoTripulanteDTO>(tipoTripulanteOrError.errorValue());
      }

      const tipoTipulanteResult = tipoTripulanteOrError.getValue();

      await this.tipoTripulanteRepo.save(tipoTipulanteResult);

      const tipoTripulanteDTOResult = TipoTripulanteMap.toDTO(tipoTipulanteResult) as ITipoTripulanteDTO;
      return Result.ok<ITipoTripulanteDTO>(tipoTripulanteDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async listarTiposTripulante(): Promise<Result<Array<ITipoTripulanteDTO>>> {
    try {
      const result = await this.tipoTripulanteRepo.findAll();
      const DTOResult: Array<ITipoTripulanteDTO> = [];

      result.forEach((tipoTripulante) => {
        DTOResult.push(TipoTripulanteMap.toDTO(tipoTripulante) as ITipoTripulanteDTO);
      });
      return Result.ok<Array<ITipoTripulanteDTO>>(DTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getTipoTripulanteById(tipoTripulanteDTO: ITipoTripulanteDTO) {
    try {
      const result = await this.tipoTripulanteRepo.findByDomainId(tipoTripulanteDTO.id);
      const tipoTripulanteDTOResult = TipoTripulanteMap.toDTO(result) as ITipoTripulanteDTO;
      return Result.ok<ITipoTripulanteDTO>(tipoTripulanteDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
