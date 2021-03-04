import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Linha from '../models/linha';
import { MessageService } from './message.service';
import config from '../config';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LinhaService {

  private linhaUrl = config.mdrurl.linha;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private validateLinha(linha: Linha) {
    const validaCodigo = linha.id.length === 1;
    const validaNome = linha.nome.length >= 5 && linha.nome.length <= 20;

    return validaCodigo && validaNome;
  }

  adicionarLinha(linha: Linha): Observable<Linha> {
    if (!this.validateLinha(linha)) {
      this.messageService.log('Linha mal definido');
      return;
    }

    return this.http.post<Linha>(this.linhaUrl, linha, this.httpOptions)
        .pipe(tap((newLinha: Linha) => this.messageService.log(`Linha adicionado com êxito=${newLinha.id}`)),
        catchError(this.messageService.handleError<Linha>('Linha'))
        );
  }

  public verificarId(id: string): Observable<void> {
    return new Observable((observer) => {
      if (id === '' || id === undefined || id === null) {
        observer.error(new Error('Introduza um ID.'));
      } else if(id.length > 1) {
        observer.error(new Error('O ID tem de ser de 1 caracter'));
      }
      else {
        const l = {
          id: id,
          noInicial: '',
          noFinal: '',
          nome: '',
          idTiposTripulante: [],
          idTiposViatura: [],
          cor: ''
        };
        this.getLinha(l).subscribe(
          res => {
            observer.error(new Error('O ID tem de ser único.'));
          },
          err => {
            observer.next();
          }
        );
      }
    });
  }

  validarCodigo(codigo: string): Observable<void> {
    return new Observable((observer) => {
      if (codigo.length != 1) {
        observer.error(new Error('O código tem de ter 1 caracter'));
      } else if (codigo === '' || codigo === undefined || codigo === null) {
        observer.error(new Error('Insira um código'));
      } else {
        observer.next();
      }
    });
  }

  validarNome(nome: string): Observable<void> {
    return new Observable((observer) => {
      if (nome.length < 5 || nome.length > 20) {
        observer.error(new Error('O nome deve ter entre 5 e 20 caracteres'));
      } else if (nome === '' || nome === undefined || nome === null) {
        observer.error(new Error('Insira um nome'));
      } else {
        observer.next();
      }
    });
  }

  validarCor(cor: string): Observable<void> {
    return new Observable((observer) => {
      if (cor === '' || cor === undefined || cor === null) {
        observer.error(new Error('Introduza uma cor.'));
      } else {
        this.getLinhas().subscribe(
          res => {
            res.forEach(linha => {
              if (linha.cor === cor) {
                observer.error(new Error('A cor tem de ser única.'));
              }
            });
            observer.next();
          },
          err => {
            observer.error(err);
          }
        );
      }
    });
  }

  public getLinha(linha: Linha): Observable<Linha> {
    return this.http.get<Linha>(this.linhaUrl + '/' + linha.id, this.httpOptions).pipe(
      tap((tv) => this.messageService.log(`Linha '${tv}' recebido`))
    );
  }

  getLinhas():Observable<Linha[]> {
    return this.http.get<Linha[]>(this.linhaUrl).pipe(
      catchError(this.messageService.handleError<Linha[]>('Get Linhas'))
    );
  }
}
