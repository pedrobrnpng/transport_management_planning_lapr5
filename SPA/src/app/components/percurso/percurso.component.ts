import { Component, OnInit } from '@angular/core';
import Percurso from 'src/app/models/percurso';
import { PercursoService } from 'src/app/services/percurso.service';
import SegmentoRede from '../../models/segmentoRede';
import Distancia from '../../models/distancia';
import TempoViagem from '../../models/tempoViagem';
import { LinhaService } from 'src/app/services/linha.service';
import Linha from 'src/app/models/linha';
import { NoService } from 'src/app/services/no.service';
import No from 'src/app/models/no';

@Component({
  selector: 'app-percurso',
  templateUrl: './percurso.component.html',
  styleUrls: ['./percurso.component.css']
})
export class PercursoComponent implements OnInit {

  percursos: Percurso[] = [];
  linhas: Linha[] = [];
  nos: No[] = [];
  direcoes: string[] = [];
  unidadesDistancia: string[]=[];
  unidadesTempo: string[]=[];
  message = {
    idSegmento: '',
    idNoInicio: '',
    idNoFim: '',
    distancia: '',
    unidadeDistancia: '',
    tempoViagem: '',
    unidadeTempoViagem: '',
    idPercurso: '',
    idLinha: '',
    direcao: ''
  };

  validatePercurso = {
    idSegmento: false,
    idNoInicio: false,
    idNoFim: false,
    distancia: false,
    unidadeDistancia: false,
    tempoViagem: false,
    unidadeTempoViagem: false,
    idPercurso: false,
    idLinha: false,
    direcao: false
  };

  private valide = '✔';

  constructor(private percursoService: PercursoService,
    private linhaService: LinhaService,
    private noService: NoService) { }

  ngOnInit(): void {
    this.getLinhas();
    this.getNos();
    this.getDirecoes();
    this.getUnidadesDistancia();
    this.getUnidadesTempo();
  }

  adicionarSegmento(id: string, idNoInicio: string, idNoFim: string,
    distancia: string, unidadeDistancia: string, tempoViagem: string, unidadeTempoViagem: string) {
    this.percursoService.add({
      id: id, idNoInicio: idNoInicio, idNoFim: idNoFim,
      distancia: { value: parseInt(distancia), unidadeDistancia: unidadeDistancia } as Distancia,
      tempoViagem: { value: parseInt(tempoViagem), unidadeTempo: unidadeTempoViagem } as TempoViagem
    } as SegmentoRede);
  }

  adicionarPercurso(id: string, idLinha: string, direcao: string): void {
    this.percursoService.adicionarPercurso({ id, idLinha, direcao } as Percurso)
      .subscribe(percurso => {
        this.getPercursosByLinha(percurso.idLinha);
      });
  }


  verificaPercurso(id: string): void {
    this.percursoService.verificaPercurso({ id: id } as Percurso).subscribe(
      () => {
        this.message.idPercurso = this.valide;
        this.validatePercurso.idPercurso = true;
      }, err => {
        this.message.idPercurso = err;
        this.validatePercurso.idPercurso = false;
      });
  }


  getLinhas(): void {
    this.linhaService.getLinhas().subscribe((linhas) => {
      this.linhas = linhas;
      this.getPercursosByLinha(this.linhas[0].id);
    });
  }

  verificaIdSegmento(id: string): void {
    this.percursoService.verificaIdSegmento({ id: id } as SegmentoRede).subscribe(
      () => {
        this.message.idSegmento = this.valide;
        this.validatePercurso.idSegmento = true;
      }, err => {
        this.message.idSegmento = err;
        this.validatePercurso.idSegmento = false;
      });
  }

  getNos(): void {
    this.noService.getNos().subscribe((nos) => {
      this.nos = nos; console.log(this.nos[0].id_abreviature);
    });
  }

  verificaNoInicio(idNoInicio: string, idNoFim: string): void {
    this.percursoService.verificaNoInicio({ idNoInicio: idNoInicio } as SegmentoRede).subscribe(
      () => {
        this.percursoService.verificaNo({ idNoInicio: idNoInicio, idNoFim: idNoFim } as SegmentoRede).subscribe(
          () => {
            this.message.idNoInicio = this.valide;
            this.validatePercurso.idNoInicio = true;
          }, err => {
            this.message.idNoInicio = err;
            this.validatePercurso.idNoInicio = false;
          });
      }, err => {
        this.message.idNoInicio = err;
        this.validatePercurso.idNoInicio = false;
      });
  }

  verificaNoFim(idNoInicio: string, idNoFim: string): void {
    this.percursoService.verificaNo({ idNoInicio: idNoInicio, idNoFim: idNoFim } as SegmentoRede).subscribe(
      () => {
        this.message.idNoFim = this.valide;
        this.validatePercurso.idNoFim = true;
      }, err => {
        this.message.idNoFim = err;
        this.validatePercurso.idNoFim = false;
      });
  }

  verificaDistancia(value: string) {
    this.percursoService.verificaDistancia({ value: parseInt(value) } as Distancia).subscribe(
      () => {
        this.message.distancia = this.valide;
        this.validatePercurso.distancia = true;
      }, err => {
        this.message.distancia = err;
        this.validatePercurso.distancia = false;
      });
  }

  verificaTempo(value: string) {
    this.percursoService.verificaTempo({ value: parseInt(value) } as TempoViagem).subscribe(
      () => {
        this.message.tempoViagem = this.valide;
        this.validatePercurso.tempoViagem = true;
      }, err => {
        this.message.tempoViagem = err;
        this.validatePercurso.tempoViagem = false;
      });
  }

  getUnidadesDistancia() {
    this.unidadesDistancia=this.percursoService.getUnidadesDistancia();
  }

  getUnidadesTempo() {
    this.unidadesTempo=this.percursoService.getUnidadesTempo();
  }

  getDirecoes(): void {
    this.direcoes=this.percursoService.getDirecoes();
  }

  getPercursos(): void {
    this.percursoService.percursosOrdenadosPorLinha().subscribe(
      (percursos) => {
        this.percursos = percursos;
      }
    );
  }

  getPercursosByLinha(idLinha: string): void {
    console.log(idLinha);
    this.percursoService.getPercursosByLinha(idLinha).subscribe(
      (percursos) => {
        this.percursos= percursos;
      }
    );
  }

  getLinha(idLinha: string) : void {
    var linha;
    this.linhas.forEach(element => {
      if(element.id==idLinha)
        linha=element.noInicial+" - "+element.noFinal;
    });
    return linha;
  }

  getSegmentos(percurso: Percurso): string {
    var str = '';
    for (let sg of percurso.segmentosRede) {
      str += sg.idNoInicio + ' - ';
    }
    str += percurso.segmentosRede[percurso.segmentosRede.length - 1].idNoFim;
    return str;
  }

  clearMessageSegmento() {
    this.message = {
      idSegmento: '',
      idNoInicio: '',
      idNoFim: '',
      distancia: '',
      unidadeDistancia: '',
      tempoViagem: '',
      unidadeTempoViagem: '',
      idPercurso: this.message.idPercurso,
      idLinha: this.message.idLinha,
      direcao: this.message.direcao
    };
  }

  clearMessagePercurso() {
    this.message = {
      idSegmento: '',
      idNoInicio: '',
      idNoFim: '',
      distancia: '',
      unidadeDistancia: '',
      tempoViagem: '',
      unidadeTempoViagem: '',
      idPercurso: '',
      idLinha: '',
      direcao: ''
    };
  }

  clear() {
    this.percursoService.clear();
  }
}
