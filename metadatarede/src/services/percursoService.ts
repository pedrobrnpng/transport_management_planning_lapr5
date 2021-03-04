import { Service, Inject } from 'typedi';
import config from "../../config";
import IPercursoDTO from '../dto/IPercursoDTO';
import { Percurso } from "../domain/percurso";
import IPercursoRepo from '../repos/IRepos/IPercursoRepo';
import IPercursoService from './IServices/IPercursoService';
import { Result } from "../core/logic/Result";
import { PercursoMap } from "../mappers/PercursoMap";
import ISegmentoRedeDTO from '../dto/ISegmentoRedeDTO';
import { SegmentoRede } from '../domain/segmentoRede';
import { Distancia } from '../domain/distancia';
import { TempoViagem } from '../domain/tempoViagem';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import ILinhaRepo from '../repos/IRepos/ILinhaRepo';
import INoRepo from '../repos/IRepos/INoRepo';

@Service()
export default class PercursoService implements IPercursoService {
  constructor(
    @Inject(config.repos.percurso.name) private percursoRepo: IPercursoRepo,
    @Inject(config.repos.linha.name) private linhaRepo: ILinhaRepo,
    @Inject(config.repos.no.name) private noRepo: INoRepo
  ) { }

  public async criarPercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>> {
    try {
      var list: SegmentoRede[] = [];
      var i = 0;

      //Tratamento dos segmentos de rede
      for (const element of percursoDTO.segmentosRede) {
        i++;
        const distOrError = Distancia.create(element.distancia.value, element.distancia.unidadeDistancia);
        const tempOrError = TempoViagem.create(element.tempoViagem.value, element.tempoViagem.unidadeTempo);
        const noInicioOrError = await this.noRepo.findByDomainId(element.idNoInicio);
        const noFimOrError = await this.noRepo.findByDomainId(element.idNoFim);
        if (noInicioOrError == null || noFimOrError == null) throw new Error("idNoInicio or idNoFim não existem");
        if (distOrError.isFailure) throw Result.fail<ISegmentoRedeDTO>(distOrError.errorValue());
        if (tempOrError.isFailure) throw Result.fail<ISegmentoRedeDTO>(tempOrError.errorValue());
        const segmentoRedeOrError = SegmentoRede.create({
          idNoInicio: element.idNoInicio, idNoFim: element.idNoFim,
          distancia: distOrError.getValue(), tempoViagem: tempOrError.getValue(), sequencia: i
        }, new UniqueEntityID(element.id));
        if (segmentoRedeOrError.isFailure) throw Result.fail<ISegmentoRedeDTO>(segmentoRedeOrError.errorValue());
        list.push(segmentoRedeOrError.getValue());
      };

      //Tratamento do idLinha
      const idLinhaOrError = await this.linhaRepo.findByDomainId(percursoDTO.idLinha);
      if (idLinhaOrError == null) throw new Error("IdLinha não existe");

      //Criação do percurso
      const percursoOrError = await Percurso.create({
        segmentosRede: list,
        idLinha: percursoDTO.idLinha,
        direcao: percursoDTO.direcao
      }, new UniqueEntityID(percursoDTO.id));
      if (percursoOrError.isFailure) {
        return Result.fail<IPercursoDTO>(percursoOrError.errorValue());
      }
      const percursoResult = percursoOrError.getValue();

      await this.percursoRepo.save(percursoResult);

      const percursoDTOResult = PercursoMap.toDTO(percursoResult) as IPercursoDTO;
      return Result.ok<IPercursoDTO>(percursoDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async listarPercursoDumaLinha(percursoDTO: IPercursoDTO): Promise<Result<Array<IPercursoDTO>>> {
    try {
      const percursosResult = await this.percursoRepo.findByLinhaId(percursoDTO.idLinha);
      const percursosDTOResult: Array<IPercursoDTO> = [];
      percursosResult.forEach((percurso) => {
        percursosDTOResult.push(PercursoMap.toDTO(percurso) as IPercursoDTO);
      });
      return Result.ok<Array<IPercursoDTO>>(percursosDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async listarPercursosOrdenadosPorLinha(): Promise<Result<Array<IPercursoDTO>>>{
    try {
      const percursosResult = await this.percursoRepo.findSortedByLinha();
      const percursosDTOResult: Array<IPercursoDTO> = [];
      percursosResult.forEach((percurso) => {
        percursosDTOResult.push(PercursoMap.toDTO(percurso));
      });
      return Result.ok<Array<IPercursoDTO>>(percursosDTOResult);
    } catch (error) {
      return Result.fail<Array<IPercursoDTO>>(error);
    }
  }

  public async listarPercursoDumaLinha2(percursoDTO: IPercursoDTO): Promise<Result<Array<IPercursoDTO>>> {
    try {
      const percursosResult = await this.percursoRepo.findByLinhaId(percursoDTO.id);
      const percursosDTOResult: Array<IPercursoDTO> = [];
      percursosResult.forEach((percurso) => {
        percursosDTOResult.push(PercursoMap.toDTO(percurso) as IPercursoDTO);
      });
      return Result.ok<Array<IPercursoDTO>>(percursosDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getPercursoById(percurso: IPercursoDTO) {
    try {
      const result = await this.percursoRepo.findByDomainId(percurso.id);
      const tipoTripulanteDTOResult = PercursoMap.toDTO(result) as IPercursoDTO;
      return Result.ok<IPercursoDTO>(tipoTripulanteDTOResult);
    } catch (e) {
      throw e;
    }
  }

}
