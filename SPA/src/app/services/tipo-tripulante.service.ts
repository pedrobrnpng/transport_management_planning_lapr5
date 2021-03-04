import { Injectable } from '@angular/core';
import { TipoTripulante } from '../models/tipoTripulante';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import config from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class TipoTripulanteService {

  private tipoTripulanteUrl = config.mdrurl.tipoTripulante;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private validateTipoTripulante(tipoTripulante: TipoTripulante) {
    const description = tipoTripulante.description;
    return (description.trim() == '' || description.length === 0 || description.length > 250) ? false : true;
  }

  adicionarTipoTripulante(tipoTripulante: TipoTripulante): Observable<TipoTripulante> {
    if (!this.validateTipoTripulante(tipoTripulante)) {
      this.messageService.log('Tipo de tripulante mal definido');
      return;
    }
    return this.http.post<TipoTripulante>(this.tipoTripulanteUrl, tipoTripulante, this.httpOptions).pipe(
      tap((newTipoTripulante: TipoTripulante) => this.messageService.log(`Tipo Tripulante adicionado com código=${newTipoTripulante.id}`)),
      catchError(this.messageService.handleError<TipoTripulante>('Tipo de tripulante'))
    );
  }

  verificaIdTipoTripulante(tipoTripulante: TipoTripulante): Observable<TipoTripulante> {
    const url = this.tipoTripulanteUrl + '/' + tipoTripulante.id;
    return new Observable((observer) => {
      if (tipoTripulante.id === "") {
        observer.error(new Error('O id não pode ficar vazio'));
      }
      this.http.get<TipoTripulante>(url).subscribe(
        res => {
          observer.error(new Error('O id tem de ser único'));
        }, err => {
          observer.next();
        }
      )
    });
  }

  verificaDescricao(tipoTripulante: TipoTripulante): Observable<TipoTripulante> {
    return new Observable((observer) => {
      if (tipoTripulante.description.trim() == '' || tipoTripulante.description.length > 255) {
        observer.error(new Error('A descrição é inválida'));
      }else{
        observer.next();
      }
    });
  }

  public getTiposTripulante(): Observable<TipoTripulante[]> {
    return this.http.get<TipoTripulante[]>(this.tipoTripulanteUrl, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Tipo Tripulantes recebidos`)),
      catchError(this.messageService.handleError<TipoTripulante[]>('get tipos tripulante'))
    );
  }
}

