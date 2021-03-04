import { Injectable } from '@angular/core';
import TipoViatura from '../models/tipoViatura';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import config from '../config';

@Injectable({
    providedIn: 'root'
})
export class TipoViaturaService {
    private tipoViaturaUrl = config.mdrurl.tipoViatura;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    private validateTipoViatura(tipoViatura: TipoViatura) {
        const validaVelocidade = tipoViatura.velocidadeMedia > 0;
        const validaCodigo = tipoViatura.id.length === 20;
        const validaConsumo = tipoViatura.consumoMedio > 0;
        return validaCodigo && validaVelocidade && validaConsumo;
    }

    adicionarTipoViatura(tipoViatura: TipoViatura): Observable<TipoViatura> {
        if(!this.validateTipoViatura(tipoViatura)) {
            this.messageService.log('Tipo Viatura mal definido');
            return;
        }
        console.log(tipoViatura);
        return this.http.post<TipoViatura>(this.tipoViaturaUrl, tipoViatura, this.httpOptions)
        .pipe(tap((newTipoViatura: TipoViatura) => this.messageService.log(`Tipo de Viatura adicionado com êxito=${newTipoViatura.id}`)),
        catchError(this.messageService.handleError<TipoViatura>('Tipo de Viatura'))
        );
    }

    validarCodigo(codigo: string): Observable<void> {
      return new Observable((observer) => {
        if (codigo.length != 20) {
          observer.error(new Error('O código tem de ter 20 caracteres'));
        } else if (codigo === '' || codigo === undefined || codigo === null) {
          observer.error(new Error('Insira um código'));
        } else {
          observer.next();
        }
      });
    }

    validarDescricao(descricao: string): Observable<void> {
      return new Observable((observer) => {
         if (descricao === '' || descricao === undefined || descricao === null) {
          observer.error(new Error('Insira uma descrição'));
        } else {
          observer.next();
        }
      });
    }

    validarAutonomia(autonomia: number): Observable<void> {
      return new Observable((observer) => {
         if (autonomia < 0) {
          observer.error(new Error('A autonomia não pode ser negativa.'));
        } else if (autonomia === undefined || autonomia === null) {
          observer.error(new Error('Insira um valor para a autonomia.'));
        }else {
          observer.next();
        }
      });
    }

    validarVelocidade(velocidade: number): Observable<void> {
      return new Observable((observer) => {
         if (velocidade < 0) {
          observer.error(new Error('A velocidade não pode ser negativa.'));
        } else if (velocidade === undefined || velocidade === null) {
          observer.error(new Error('Insira um valor para a velocidade.'));
        }else {
          observer.next();
        }
      });
    }

    validarConsumo(consumo: number): Observable<void> {
      return new Observable((observer) => {
         if (consumo < 0) {
          observer.error(new Error('O consumo médio não pode ser negativo.'));
        } else if (consumo === undefined || consumo === null) {
          observer.error(new Error('Insira um valor para o consumo médio.'));
        }else {
          observer.next();
        }
      });
    }

    validarCusto(custo: number): Observable<void> {
      return new Observable((observer) => {
         if (custo < 0) {
          observer.error(new Error('O custo por km não pode ser negativo.'));
        } else if (custo === undefined || custo === null) {
          observer.error(new Error('Insira um valor para o custo por km.'));
        }else {
          observer.next();
        }
      });
    }

    public verificarId(id: string): Observable<void> {
        return new Observable((observer) => {
          if (id === '' || id === undefined || id === null) {
            observer.error(new Error('Introduza um ID.'));
          } else {
            const tv = {
                id: id, 
                descricao: '',
                combustivel: null,
                autonomia: null,
                velocidadeMedia: null,
                custoKM: {
                valor: null,
                moeda: ''
                },
                consumoMedio: null
            };
            this.getTipoViatura(tv).subscribe(
              res => {
                observer.error(new Error('O ID tem de ser único'));
              },
              err => {
                observer.next();
              }
            );
          }
        });
      }

      public getTiposViatura(): Observable<TipoViatura[]> {
        return this.http.get<TipoViatura[]>(this.tipoViaturaUrl, this.httpOptions).pipe(
          tap((_) => this.messageService.log('')),
          catchError(this.messageService.handleError<TipoViatura[]>('get tipos viatura'))
        );
      }

      public getTipoViatura(tipoViatura: TipoViatura): Observable<TipoViatura> {
        return this.http.get<TipoViatura>(this.tipoViaturaUrl + '/' + tipoViatura.id, this.httpOptions).pipe(
          tap((tv) => this.messageService.log(''))
        );
      }
}