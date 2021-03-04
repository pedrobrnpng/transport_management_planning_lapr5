import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import config from '../config.js';
import Percurso from '../models/percurso';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import SegmentoRede from '../models/segmentoRede';
import Distancia from '../models/distancia';
import TempoViagem from '../models/tempoViagem';


@Injectable({
  providedIn: 'root'
})
export class PercursoService {


  segmentosAtuais: SegmentoRede[] = [];
  private PercursoUrl = config.mdrurl.percurso;
  private PercursoUrlTodos = config.mdrurl.allpercursos;
  private unidadesDistancias = ["m", "km"];
  private unidadesTempo = ["s", "m", "h"];
  private direcoes = ["ida", "volta"];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  validaSegmento(segmentoRede: SegmentoRede) {
    const length = this.segmentosAtuais.length;
    return !(segmentoRede.id.trim() == '' || segmentoRede.idNoInicio.trim() == '' || segmentoRede.idNoFim.trim() == '' ||
      segmentoRede.distancia.unidadeDistancia.trim() == '' || segmentoRede.tempoViagem.unidadeTempo.trim() == '' ||
      segmentoRede.distancia.value.toString() === NaN.toString() || segmentoRede.tempoViagem.value.toString() === NaN.toString()) &&
      (!this.segmentosAtuais.map(s => s.id).includes(segmentoRede.id)) && segmentoRede.idNoInicio != segmentoRede.idNoFim &&
      (length > 0 ? this.segmentosAtuais[this.segmentosAtuais.length - 1].idNoFim == segmentoRede.idNoInicio : true);
  }

  add(segmentoRede: SegmentoRede) {
    if (!this.validaSegmento(segmentoRede)) {
      this.messageService.log('Segmento de rede mal definido');
      return;
    }
    this.messageService.log(`Segmento de rede adicionado com código=${segmentoRede.id}`);
    this.segmentosAtuais.push(segmentoRede);
  }

  private validarPercurso(percurso: Percurso): boolean {
    return !(percurso.segmentosRede.length == 0 || percurso.id.trim() == '' || percurso.idLinha.trim() == '' || percurso.direcao.trim() == '');
  }

  adicionarPercurso(percurso: Percurso): Observable<Percurso> {
    percurso.segmentosRede = this.segmentosAtuais;
    if (!this.validarPercurso(percurso)) {
      this.messageService.log('Percurso mal definido')
      return;
    }
    return this.http.post<Percurso>(this.PercursoUrl, percurso, this.httpOptions).pipe(
      tap((newPercurso: Percurso) => this.messageService.log(`Percurso adicionado com código=${newPercurso.id}`)),
      catchError(this.messageService.handleError<Percurso>('Percurso'))
    );
  }

  percursosOrdenadosPorLinha(): Observable<Percurso[]> {
    return this.http.get<Percurso[]>(this.PercursoUrlTodos, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Percursos recebidos`)),
      catchError(this.messageService.handleError<Percurso[]>('get percursos'))
    );
  }

  clear() {
    this.segmentosAtuais = [];
  }

  verificaIdSegmento(sg: SegmentoRede) {
    return new Observable((observer) => {
      if (sg.id.trim() == '') {
        observer.error("O id do segmento não pode ser vazio");
      } else if (this.segmentosAtuais.map(s => s.id).includes(sg.id)) {
        observer.error("Esse segmento já foi definido");
      } else {
        observer.next();
      }
    });
  }

  verificaPercurso(percurso: Percurso): Observable<Percurso> {
    const url = this.PercursoUrl + '/' + percurso.id;
    return new Observable((observer) => {
      if (percurso.id === "") {
        observer.error(new Error('O código do percurso não pode ficar em branco'));
      }
      this.http.get<Percurso>(url).subscribe(
        res => {
          observer.error(new Error('O percurso não pode já estar definido'));
        }, err => {
          observer.next();
        }
      );
    });
  }

  verificaNoInicio(sg: SegmentoRede): Observable<SegmentoRede> {
    return new Observable((observer) => {
      if (this.segmentosAtuais.length > 0) {
        if (this.segmentosAtuais[this.segmentosAtuais.length - 1].idNoFim == sg.idNoInicio) {
          observer.next();
        } else {
          observer.error(new Error("No inicial tem de corresponder ao nó final do segmento anterior"));
        }
      }
      observer.next();
    });
  }

  verificaNo(sg: SegmentoRede): Observable<SegmentoRede> {
    return new Observable((observer) => {
      if (sg.idNoInicio === sg.idNoFim) {
        observer.error(new Error("Nó de inicio e nó de fim não podem ser iguais"));
      } else {
        observer.next();
      }
    });
  }

  getUnidadesDistancia(): string[] {
    return this.unidadesDistancias;
  }

  getUnidadesTempo(): string[] {
    return this.unidadesTempo;
  }

  verificaDistancia(distancia: Distancia): Observable<Distancia> {
    return new Observable((observer) => {
      if (distancia.value > 0) {
        observer.next();
      } else {
        observer.error(new Error('Valor da distâcia inválido'));
      }
    });
  }

  verificaTempo(tempo: TempoViagem): Observable<TempoViagem> {
    return new Observable((observer) => {
      if (tempo.value > 0) {
        observer.next();
      } else {
        observer.error(new Error('Tempo inválido'));
      }
    });
  }


  getDirecoes(): string[] {
    return this.direcoes;
  }

  getPercurso(id: string): Observable<Percurso> {
    const url = this.PercursoUrl + '/' + id;
    return new Observable((observer) => {
      this.http.get<Percurso>(url).pipe(
        tap(() => observer.next()),
        catchError(this.messageService.handleError<Percurso>('Percurso'))
      );
    });
  }

  getPercursosByLinha(idLinha: string) {
    var url= this.PercursoUrl+"/linhas/"+idLinha;
    return this.http.get<Percurso[]>(url, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Percursos recebidos`)),
      catchError(this.messageService.handleError<Percurso[]>('get percursos'))
    );
  }

}
