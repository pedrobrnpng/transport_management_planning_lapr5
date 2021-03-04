import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import config from '../config.js';
import ServicoViatura from '../models/servicoViatura';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import BlocoTrabalho from '../models/blocoTrabalho';

@Injectable({
  providedIn: 'root'
})
export class ServicoViaturaService {

  private servicoViaturaURL = config.mdvurl.servicosViatura;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  adicionarServicoViatura(servicoViatura: ServicoViatura) {
    return this.http.post<ServicoViatura>(this.servicoViaturaURL, servicoViatura, this.httpOptions).pipe(
      tap((newViatura: ServicoViatura) => this.messageService.log(`Serviço de Viatura adicionado com código=${newViatura.nome}`)),
      catchError(this.messageService.handleError<ServicoViatura>('Serviço de Viatura'))
    );
  }

  getServicosViatura() {
    return this.http.get<ServicoViatura[]>(this.servicoViaturaURL, this.httpOptions).pipe(
      tap((_) => console.log(`Serviços de viatura recebidos`)),
      catchError(this.messageService.handleError<ServicoViatura[]>('get Serviços de viatura'))
    );
  }

  getServicosViaturaByDate(data:Date) {
    var dateStr=(data.getMonth()+1).toString()+"/"+data.getDate().toString()+"/"+data.getFullYear().toString();
    var dateJSON:JSON = <JSON><unknown>
      {
      "date":dateStr
      };    
    return this.http.post<ServicoViatura[]>(this.servicoViaturaURL+"/AtDate", dateJSON, this.httpOptions).pipe(
      tap((_) => console.log('Serviços de viatura recebidos')),
      catchError(this.messageService.handleError<ServicoViatura[]>('get Serviços de viatura'))
    );
  }

  verificaCodigo(servico: ServicoViatura) {
    const url = this.servicoViaturaURL + '/' + servico.nome;
    return new Observable((observer) => {
      if (servico.nome === "") {
        observer.error(new Error('O código do Serviço de Viatura não pode ficar em branco'));
      }
      this.http.get<ServicoViatura>(url).subscribe(
        res => {
          observer.error(new Error('O Serviço de Viatura não pode já estar definido'));
        }, err => {
          observer.next();
        }
      );
    });
  }

  verificaBlocosTrabalho(blocosTrabalho: BlocoTrabalho[]) {
    var tempo = (blocosTrabalho[0].horaFim - blocosTrabalho[0].horaFim);
    return new Observable((observer) => {
      for (var i = 0; i < blocosTrabalho.length - 1; i++) {
        if (blocosTrabalho[i].horaFim != blocosTrabalho[i + 1].horaInicio) {
          observer.error("Blocos de trabalho mal definidos");
        }
        tempo += blocosTrabalho[i + 1].horaFim - blocosTrabalho[i + 1].horaInicio;
      }
      if (tempo > 14400) {
        observer.error("A viatura não pode trabalhar mais de 4 horas seguidas");
      } else {
        observer.next();
      }
    });

  }
}
