import { Service, Inject } from 'typedi';
import config from "../../config";
import INoDTO from '../dto/INoDTO';
import { No } from "../domain/no";
import INoRepo from '../repos/IRepos/INoRepo';
import INoService from './IServices/INoService';
import { Result } from "../core/logic/Result";
import { NoMap } from "../mappers/NoMap";
import { Abreviatura } from '../domain/abreviatura';

@Service()
export default class NoService implements INoService {
  constructor(
      @Inject(config.repos.no.name) private NoRepo : INoRepo
  ) {}

  public async criarNo(NoDTO: INoDTO): Promise<Result<INoDTO>> {
    try {
      let id = Abreviatura.create(NoDTO.id_abreviature).getValue();
      const NoOrError = No.create( NoDTO, id );
      if (NoOrError.isFailure) {
        return Result.fail<INoDTO>(NoOrError.errorValue());
      }
      const noResult = NoOrError.getValue();

      await this.NoRepo.save(noResult);

      const NoDTOResult = NoMap.toDTO( noResult );

      return Result.ok<INoDTO>( NoDTOResult )
    } catch (error) {
      return Result.fail<INoDTO>(error);
    }
  }

  public async listarNos(): Promise<Result<Array<INoDTO>>> {
    try {
      const nosResult:Array<No> = await this.NoRepo.findAll();
      const nosDTOResult: Array<INoDTO> = [];
      if (nosResult!=null) {
        nosResult.forEach((no) => {
          nosDTOResult.push(NoMap.toDTO(no));
        });
      }
      return Result.ok<Array<INoDTO>>(nosDTOResult);
    } catch (error) {
      return Result.fail<Array<INoDTO>>(error);
    }
  }

  public async getNoById(no: INoDTO): Promise<Result<INoDTO>> {
    try {
      const result = await this.NoRepo.findByDomainId(no.id_abreviature);
      const noDTOResult = NoMap.toDTO(result);
      return Result.ok<INoDTO>(noDTOResult);
    } catch (error) {
      return Result.fail<INoDTO>(error);
    }
  }

  public async listarNosOrdenadosPorId(): Promise<Result<Array<INoDTO>>>{
    try {
      const nosResult = await this.NoRepo.findSortedById();
      const nosDTOResult: Array<INoDTO> = [];
      nosResult.forEach((percurso) => {
        nosDTOResult.push(NoMap.toDTO(percurso));
      });
      return Result.ok<Array<INoDTO>>(nosDTOResult);
    } catch (error) {
      return Result.fail<Array<INoDTO>>(error);
    }
  }

  public async adicionarModelo(no: INoDTO): Promise<Result<INoDTO>>{
    try {
      const noFound = await this.NoRepo.findByDomainId(no.id_abreviature);
      noFound.props.modelo = no.modelo;
      const noModified = await this.NoRepo.modify(noFound);
      const noDTO = NoMap.toDTO(noModified);
      return Result.ok<INoDTO>(noDTO);
    } catch (error) {
      return Result.fail<INoDTO>(error);
    }
  }
}
