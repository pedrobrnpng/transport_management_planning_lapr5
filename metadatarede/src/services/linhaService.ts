import { Service, Inject } from 'typedi';
import config from "../../config";
import ILinhaDTO from '../dto/ILinhaDTO';
import { Linha } from "../domain/linha";
import ILinhaRepo from '../repos/IRepos/ILinhaRepo';
import ILinhaService from './IServices/ILinhaService';
import { Result } from "../core/logic/Result";
import { LinhaMap } from "../mappers/LinhaMap";
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import ITipoViaturaRepo from '../repos/IRepos/ITipoViaturaRepo';
import ITipoTripulanteRepo from '../repos/IRepos/ITipoTripulanteRepo';
import INoRepo from '../repos/IRepos/INoRepo';
import { hasIn } from 'lodash';
import { LinhaId } from '../domain/linhaId';

@Service()
export default class LinhaService implements ILinhaService {
  constructor(
      @Inject(config.repos.linha.name) private linhaRepo : ILinhaRepo,
      @Inject(config.repos.tipoViatura.name) private tipoViaturaRepo : ITipoViaturaRepo,
      @Inject(config.repos.tipoTripulante.name) private tipoTripulanteRepo : ITipoTripulanteRepo,
      @Inject(config.repos.no.name) private noRepo : INoRepo
  ) {}

  public async criarLinha(linhaDTO: ILinhaDTO): Promise<Result<ILinhaDTO>> {
    try {
      var tViaturasList: string[] = [];
      var tTripulantesList: string[] = [];
      
      const noInicialOrError = await this.noRepo.findByDomainId(linhaDTO.noInicial);
      if(noInicialOrError === null) throw new Error("ID do nó inicial inválido.");

      const noFinalOrError = await this.noRepo.findByDomainId(linhaDTO.noFinal);
      if(noFinalOrError === null) throw new Error("ID do nó final inválido.");
      

      if(Array.isArray(linhaDTO.idTiposViatura)) {
        for(const element of linhaDTO.idTiposViatura){
          const tipoViaturaOrError = await this.tipoViaturaRepo.findByDomainId(element);
          if(tipoViaturaOrError === null) throw new Error("Tipo Viatura não encontrado");
          tViaturasList.push(element);
        };
      }

      if(Array.isArray(linhaDTO.idTiposTripulante)) {
        for(const element of linhaDTO.idTiposTripulante){
          const tipoTripulanteOrError = await this.tipoTripulanteRepo.findByDomainId(element);
          if(tipoTripulanteOrError === null) throw new Error("Tipo Tripulante não encontrado");
          tTripulantesList.push(element);
        }    
      }

      let re : RegExp = /^RGB\(([1-9]\d{0,2}|0)\,([1-9]\d{0,2}|0)\,([1-9]\d{0,2}|0)\)$/
      if(!re.test(linhaDTO.cor)) throw new Error("Cor da linha inválida.");
   
      const linhaOrError = Linha.create(linhaDTO, new UniqueEntityID(linhaDTO.id));

      if (linhaOrError.isFailure) {
        return Result.fail<ILinhaDTO>(linhaOrError.errorValue());
      }
      const linhaResult = linhaOrError.getValue();

      await this.linhaRepo.save(linhaResult);

      const linhaDTOResult = LinhaMap.toDTO(linhaResult) as ILinhaDTO;

      return Result.ok<ILinhaDTO>(linhaDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async listarLinhas(): Promise<Result<Array<ILinhaDTO>>> {
    try {
      const linhasResult = await this.linhaRepo.findAll();
      const linhasDTOResult: Array<ILinhaDTO> = [];

      linhasResult.forEach((linha) => {
        linhasDTOResult.push(LinhaMap.toDTO(linha) as ILinhaDTO);
      });
      return Result.ok<Array<ILinhaDTO>>(linhasDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getLinhaById(no: ILinhaDTO) {
    try {
      const result = await this.linhaRepo.findByDomainId(no.id);
      const tipoTripulanteDTOResult = LinhaMap.toDTO(result) as ILinhaDTO;
      return Result.ok<ILinhaDTO>(tipoTripulanteDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async listarLinhasOrdenadosPorId(): Promise<Result<Array<ILinhaDTO>>>{
    try {
      const linhasResult = await this.linhaRepo.findSortedById();
      const linhasDTOResult: Array<ILinhaDTO> = [];
      linhasResult.forEach((linha) => {
        linhasDTOResult.push(LinhaMap.toDTO(linha));
      });
      return Result.ok<Array<ILinhaDTO>>(linhasDTOResult);
    } catch (error) {
      return Result.fail<Array<ILinhaDTO>>(error);
    }
  }

}
