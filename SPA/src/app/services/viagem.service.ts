import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viagem, Viagens } from '../models/viagem';
import Linha from '../models/linha';
import config from '../config';
import { LinhaService } from './linha.service';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {

  private viagemURL = config.mdvurl.viagens;
  private viagensURL = config.mdvurl.viagens_set;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private linhaService: LinhaService) { }

  private validarViagem(viagem: Viagem): boolean {
    return viagem.horaInicio !== null &&
      viagem.idPercurso !== '' &&
      viagem.linha !== '';
  }

  private validarViagens(viagens: Viagens): boolean {
    return viagens.horaInicio !== null &&
      viagens.frequencia > 0 &&
      viagens.nViagens > 0;
  }

  adicionarViagem(viagem: Viagem): Observable<Viagem> {
    if (!this.validarViagem(viagem)) {
      this.messageService.log('Viagem mal definida');
      return;
    }
    return this.http.post<Viagem>(this.viagemURL, viagem, this.httpOptions).pipe(
      tap((newViagem: Viagem) => this.messageService.log(`Viagem adicionada com código = ${newViagem.codigo}`)),
      catchError(this.messageService.handleError<Viagem>('Viagem'))
    );
  }

  adicionarViagens(viagens: Viagens): Observable<Viagem[]> {
    if (!this.validarViagens(viagens)) {
      this.messageService.log('Valores mal definidos');
      return;
    }
    return this.http.post<Viagem[]>(this.viagensURL, viagens, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Viagens adicionadas com sucesso`)),
      catchError(this.messageService.handleError<Viagem[]>('Viagem'))
    );
  }

  getViagens(): Observable<Viagem[]> {
    return this.http.get<Viagem[]>(this.viagemURL, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Viagens recebidas`)),
      catchError(this.messageService.handleError<Viagem[]>('get Viagens'))
    );
  }

  getViagem(codigo:number): Observable<Viagem> {
    return this.http.get<Viagem>(this.viagemURL+"/"+codigo, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Viagem recebidas`)),
      catchError(this.messageService.handleError<Viagem>('get Viagem'))
    );
  }

  verificaCodigo(viagem: Viagem): Observable<Viagem> {
    const url = this.viagemURL + '/' + viagem.codigo;
    return new Observable((observer) => {
      if (viagem.codigo === null || viagem.codigo === 0) {
        observer.error(new Error('O código da Viagem não pode ficar em branco'));
      }
      this.http.get<Viagem>(url).subscribe(
        res => {
          observer.error(new Error('O Viagem não pode já estar definida'));
        }, err => {
          observer.next();
        }
      );
    });
  }

  verificarHoraInicio(horaInicio: Date): Observable<void> {
    return new Observable((observer) => {
      if (Date.now() > new Date(horaInicio).getTime()) {
        observer.error(new Error('a hora de inicio tem de ser superior a hora atual'));
      } else if (horaInicio === undefined || horaInicio === null) {
        observer.error(new Error('a hora de inicio não pode ser vazio'));
      } else {
        observer.next();
      }
    });
  }

  verificarLinha(linha: string): Observable<void> {
    return new Observable((observer) => {
      if (linha !== '' && linha !== null && linha !== undefined) {
        observer.next();
      } else {
        observer.error(new Error('a linha não é válida'));
      }
    });
  }

  verificarPercurso(percurso: string): Observable<void> {
    return new Observable((observer) => {
      if (percurso !== '' && percurso !== null && percurso !== undefined) {
        observer.next();
      } else {
        observer.error(new Error('o percurso não é válido'));
      }
    });
  }

  public verificarFrequencia(frequancia: number): Observable<void> {
    return new Observable((observer) => {
      if (frequancia > 0) {
        observer.next();
      } else {
        observer.error(new Error('a frequancia tem de ser superior a 0'));
      }
    });
  }

  public verificarNViagens(nViagens: number): Observable<void> {
    return new Observable((observer) => {
      if (nViagens > 0) {
        observer.next();
      } else {
        observer.error(new Error('a nViagens tem de ser superior a 0'));
      }
    });
  }

}
