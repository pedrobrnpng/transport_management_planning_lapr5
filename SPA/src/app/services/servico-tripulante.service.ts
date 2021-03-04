import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import config from '../config.js';
import ServicoTripulante from '../models/ServicoTripulante';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import BlocoTrabalho from '../models/blocoTrabalho';

@Injectable({
  providedIn: 'root'
})
export class ServicoTripulanteService {

  private ServicoTripulanteURL = config.mdvurl.servicosTripulante;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  adicionarServicoTripulante(servicoTripulante: ServicoTripulante) {
    return this.http.post<ServicoTripulante>(this.ServicoTripulanteURL, servicoTripulante, this.httpOptions).pipe(
      tap((newTripulante: ServicoTripulante) => this.messageService.log(`Serviço de Tripulante adicionado com código=${newTripulante.nome}`)),
      catchError(this.messageService.handleError<ServicoTripulante>('Serviço de Tripulante'))
    );
  }

  verificaCodigo(servico: ServicoTripulante) {
    const url = this.ServicoTripulanteURL + '/' + servico.nome;
    return new Observable((observer) => {
      if (servico.nome === "") {
        observer.error(new Error('O código do serviço de tripulante não pode ficar em branco'));
      }
      this.http.get<ServicoTripulante>(url).subscribe(
        res => {
          observer.error(new Error('O Serviço de tripulante não pode já estar definido'));
        }, err => {
          observer.next();
        }
      );
    });
  }

  verificaBlocosTrabalho(blocosTrabalho: BlocoTrabalho[]) {
    var tempo = (blocosTrabalho[0].horaFim - blocosTrabalho[0].horaInicio);
    return this.verificarBlocosTrabalho(blocosTrabalho, tempo);
  }

  getServicosTripulante() {
    return this.http.get<ServicoTripulante[]>(this.ServicoTripulanteURL, this.httpOptions).pipe(
      tap((_) => console.log(`Serviços de tripulante recebidos`)),
      catchError(this.messageService.handleError<ServicoTripulante[]>('get Serviços de tripulante'))
    );
  }

  getServicosTripulanteByDate(data:Date) {
    var dateStr=(data.getMonth()+1).toString()+"/"+data.getDate().toString()+"/"+data.getFullYear().toString();
    var dateJSON:JSON = <JSON><unknown>
      {
      "date":dateStr
      };    
    return this.http.post<ServicoTripulante[]>(this.ServicoTripulanteURL+"/AtDate", dateJSON, this.httpOptions).pipe(
      tap((_) => console.log('Serviços de tripulante recebidos')),
      catchError(this.messageService.handleError<ServicoTripulante[]>('get Serviços de tripulante'))
    );
  }

  private verificarBlocosTrabalho(blocosTrabalho: BlocoTrabalho[], tempo: number) {
    for (var i = 0; i < blocosTrabalho.length - 1; i++) {
      if (blocosTrabalho[i].horaFim != blocosTrabalho[i + 1].horaInicio) {
        if (blocosTrabalho[i].horaFim > blocosTrabalho[i + 1].horaInicio) {
          return new Observable((observer) => observer.error("Bloco de trabalho tem de ter um horário superior"))
        } else {
          return this.verificarBlocosTrabalho2(blocosTrabalho.slice(i + 1, blocosTrabalho.length), blocosTrabalho[i + 1].horaFim - blocosTrabalho[i + 1].horaInicio);
        }
      }
      tempo += blocosTrabalho[i + 1].horaFim - blocosTrabalho[i + 1].horaInicio;
    }
    return new Observable((observer) => {
      if (tempo > 14400) {
        observer.error("O tripulante não pode trabalhar mais de 4 horas seguidas");
      } else {
        observer.next();
      }
    });
  }

  private verificarBlocosTrabalho2(blocosTrabalho: BlocoTrabalho[], tempo: number) {
    return new Observable((observer) => {
      for (var i = 0; i < blocosTrabalho.length - 1; i++) {
        if (blocosTrabalho[i].horaFim != blocosTrabalho[i + 1].horaInicio) {
          observer.error("Blocos de trabalho mal definidos");
        }
        tempo += blocosTrabalho[i + 1].horaFim - blocosTrabalho[i + 1].horaInicio;
      }
      if (tempo > 14400) {
        observer.error("O tripulante não pode trabalhar mais de 4 horas seguidas");
      } else {
        observer.next();
      }
    });


  }
}
