import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../config';
import No from '../models/no';

enum TipoNoEnum {
  paragem = 'paragem',
  estacaorecolha = 'estacaorecolha',
  pontorendicao = 'pontorendicao'
}

@Injectable({
  providedIn: 'root'
})
export class NoService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private apiUrl = config.mdrurl.no;
  private modelUrl = config.mdrurl.modelo;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams()
  };

  public alterarModelo(id: string, modelo: string): Observable<No> {
    return this.http.post<No>(this.modelUrl, { id_abreviature: id, modelo }, this.httpOptions).pipe(
      tap((newNo: No) => this.messageService.log(`Nó '${newNo.id_abreviature}' alterado com sucesso`)),
      catchError(this.messageService.handleError<No>('Alterar Modelo do Nó'))
    );
  }

  public verificarNoModelo(abrev: string): Observable<void> {
    return new Observable((observer) => {
      if (abrev === '' || abrev === undefined || abrev === null) {
        observer.error(new Error('o nó não pode ser vazio'));
      } else {
        observer.next();
      }
    });
  }

  public verificarModelo(modelo: string): Observable<void> {
    return new Observable((observer) => {
      if (modelo === '' || modelo === undefined || modelo === null) {
        observer.error(new Error('o modelo não pode ser vazio'));
      } else {
        observer.next();
      }
    });
  }

  public verificarAbreviatura(abrev: string): Observable<void> {
    return new Observable((observer) => {
      if (abrev === '' || abrev === undefined || abrev === null) {
        observer.error(new Error('a abreviatura não pode ser vazia'));
      } else if (abrev.length > 20) {
        observer.error(new Error('a abreviatura não pode ter mais que 20 carateres'));
      } else {
        const no = {
          id_abreviature: abrev,
          name: '',
          type: '',
          xCoordinate: null,
          yCoordinate: null
        };
        this.getNo(no).subscribe(
          res => {
            observer.error(new Error('a abreviatura tem de ser única'));
          },
          err => {
            observer.next();
          }
        );
      }
    });
  }

  public verificarNome(nome: string): Observable<void> {
    return new Observable((observer) => {
      if (nome.length > 200) {
        observer.error(new Error('o nome não pode ter mais que 200 carateres'));
      } else if (nome === '' || nome === undefined || nome === null) {
        observer.error(new Error('o nome não pode ser vazio'));
      } else {
        observer.next();
      }
    });
  }

  public verificarLatitude(latitude: number): Observable<void> {
    return new Observable((observer) => {
      if (latitude >= -90 && latitude <= 90) {
        observer.next();
      } else {
        observer.error(new Error('a latitude tem de ser entre -90 e 90'));
      }
    });
  }

  public verificarLongitude(logintude: number): Observable<void> {
    return new Observable((observer) => {
      if (logintude >= -180 && logintude <= 180) {
        observer.next();
      } else {
        observer.error(new Error('a longitude tem de ser entre -180 e 180'));
      }
    });
  }

  public adicionarNo(no: No): Observable<No> {
    if (!this.validateNo(no)) {
      this.messageService.log('Nó mal definido');
      return;
    }
    return this.http.post<No>(this.apiUrl, no, this.httpOptions).pipe(
      tap((newNo: No) => this.messageService.log(`Nó '${newNo.id_abreviature}' adicionado com sucesso`)),
      catchError(this.messageService.handleError<No>('Adicionar Nó'))
    );
  }

  private validateNo(no: No): boolean {
    const abrev = no.id_abreviature;
    const name = no.name;
    const type = no.type;
    const xCoordinate = no.xCoordinate;
    const yCoordinate = no.yCoordinate;
    return abrev.length <= 20 &&
      name.length <= 200 &&
      Object.keys(TipoNoEnum).includes(type.toLowerCase()) &&
      xCoordinate >= -90 && xCoordinate <= 90 &&
      yCoordinate >= -180 && yCoordinate <= 180;
  }

  public getNos(): Observable<No[]> {
    return this.http.get<No[]>(this.apiUrl, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Nós recebidos`)),
      catchError(this.messageService.handleError<No[]>('get nós'))
    );
  }

  public getNo(no: No): Observable<No> {
    return this.http.get<No>(this.apiUrl + '/' + no.id_abreviature, this.httpOptions).pipe(
      tap((newNo) => this.messageService.log(`Nó '${newNo.id_abreviature}' recebido`))
    );
  }

  verificaNo(idNoInicio: string, idNoFim: string): Observable<string> {
    return new Observable((observer) => {
      if (idNoInicio === idNoFim) {
        observer.error(new Error('Nó de inicio e nó de fim não podem ser iguais'));
      } else {
        observer.next();
      }
    });
  }
}
