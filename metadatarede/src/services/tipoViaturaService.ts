import { Inject, Service } from "typedi";
import config from "../../config";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

import { TipoViatura } from "../domain/tipoViatura";
import ITipoViaturaDTO from "../dto/ITipoViaturaDTO";
import { TipoViaturaMap } from "../mappers/TipoViaturaMap";
import ITipoViaturaRepo from "../repos/IRepos/ITipoViaturaRepo";
import ITipoViaturaService from "./IServices/ITipoViaturaService";

@Service()
export default class TipoViaturaService implements ITipoViaturaService {
    constructor(
        @Inject(config.repos.tipoViatura.name) private tipoViaturaRepo : ITipoViaturaRepo
    ) {}

    public async criarTipoViatura(tipoViaturaDTO: ITipoViaturaDTO): Promise<Result<ITipoViaturaDTO>> {
        try {

            const tipoViaturaOrError = TipoViatura.create(tipoViaturaDTO, new UniqueEntityID(tipoViaturaDTO.id));

            if(tipoViaturaOrError.isFailure) {
                return Result.fail<ITipoViaturaDTO>(tipoViaturaOrError.errorValue());
            }

            const tipoViaturaResult = tipoViaturaOrError.getValue();
            
            await this.tipoViaturaRepo.save(tipoViaturaResult);
            const tipoViaturaDTOResult = TipoViaturaMap.toDTO(tipoViaturaResult) as ITipoViaturaDTO;
            return Result.ok<ITipoViaturaDTO>(tipoViaturaDTOResult);
        } catch (err) {
            throw err;
        }
    }

    public async listarTiposViatura(): Promise<Result<Array<ITipoViaturaDTO>>> {
        try {
          const result = await this.tipoViaturaRepo.findAll();
          const DTOResult: Array<ITipoViaturaDTO> = [];
          result.forEach((tipoViatura) => {
            DTOResult.push(TipoViaturaMap.toDTO(tipoViatura) as ITipoViaturaDTO);
          });
          return Result.ok<Array<ITipoViaturaDTO>>(DTOResult);
        } catch (e) {
          throw e;
        }
    }

    public async getTipoViaturaById(tipoViaturaDTO: ITipoViaturaDTO) {
        try {
          const result = await this.tipoViaturaRepo.findByDomainId(tipoViaturaDTO.id);
          const tipoViaturaDTOResult = TipoViaturaMap.toDTO(result) as ITipoViaturaDTO;
          return Result.ok<ITipoViaturaDTO>(tipoViaturaDTOResult);
        } catch (e) {
          throw e;
        }
      }
    
}