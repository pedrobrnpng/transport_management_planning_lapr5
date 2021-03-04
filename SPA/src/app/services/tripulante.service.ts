import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Tripulante from '../models/tripulante';
import { MessageService } from './message.service';
import config from '../config.js';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripulanteService {

  private TripulanteURL = config.mdvurl.tripulantes;
  private turnos = ["diurno", "noturno"];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private validarTripulante(tripulante: Tripulante) {
    if (tripulante.dataSaida.toString() == "") {
      tripulante.dataSaida = new Date("01/01/0001 00:00:00");
    }
    return tripulante.nome.trim().length > 0 &&
      ((Date.now() - new Date(tripulante.dataNascimento).getTime()) / (1000 * 3600 * 24) >= 6570) &&
      (tripulante.numeroMecanografico.toString().length == 9) &&
      (tripulante.numeroCartaoCidadao.toString().length == 8) &&
      (tripulante.nif.toString().length == 9);
  }

  adicionarTripulante(tripulante: Tripulante): Observable<Tripulante> {
    if (!this.validarTripulante(tripulante)) {
      this.messageService.log('Tripulante mal definido')
      return;
    }
    return this.http.post<Tripulante>(this.TripulanteURL, tripulante, this.httpOptions).pipe(
      tap((newTripulante: Tripulante) => this.messageService.log(`Tripulante adicionado com número mecanografico=${newTripulante.numeroMecanografico}`)),
      catchError(this.messageService.handleError<Tripulante>('Tripulante'))
    );
  }

  verificaNumeroMecanografico(tripulante: Tripulante) {

    return new Observable((observer) => {
      const url = this.TripulanteURL + '/' + tripulante.numeroMecanografico;
      if (tripulante.numeroMecanografico.toString().length != 9) {
        observer.error("O número mecanográfico tem de ter 9 digitos");
      }
      this.http.get<Tripulante>(url).subscribe(
        res => {
          observer.error(new Error('O número de cartão de cidadão não pode já estar definido'));
        }, err => {
          observer.next();
        }
      );
    });
  }

  verificaNome(tripulante: Tripulante) {
    return new Observable((observer) => {
      if (tripulante.nome.trim() == '') {
        observer.error("O nome não pode ficar vazio");
      } else {
        observer.next();
      }
    });
  }

  verificaDataNascimento(tripulante: Tripulante) {
    return new Observable((observer) => {
      if (((Date.now() - new Date(tripulante.dataNascimento).getTime()) / (1000 * 3600 * 24) < 6570)) {
        observer.error("O tripulante tem de ter mais de 18 anos");
      } else {
        observer.next();
      }
    });
  }

  verificaNumeroCartaoCidadao(tripulante: Tripulante) {
    const url = this.TripulanteURL + '/cartaocidadao/' + tripulante.numeroCartaoCidadao;
    return new Observable((observer) => {
      if (tripulante.numeroCartaoCidadao.toString().length != 8) {
        observer.error(new Error('O número da cartão de cidadão tem de ter 8 digitos'));
      }
      this.http.get<Tripulante>(url).subscribe(
        res => {
          observer.error(new Error('O número de cartão de cidadão não pode já estar definido'));
        }, err => {
          observer.next();
        }
      );
    });
  }

  verificaNif(tripulante: Tripulante) {
    const url = this.TripulanteURL + '/nif/' + tripulante.nif;
    return new Observable((observer) => {
      if (tripulante.nif.toString().length != 9) {
        observer.error(new Error('O nif tem de ter 9 digitos'));
      }
      this.http.get<Tripulante>(url).subscribe(
        res => {
          observer.error(new Error('O nif não pode já estar definido'));
        }, err => {
          observer.next();
        }
      );
    });
  }

  getTurnos() {
    return this.turnos;
  }

  verificaDataSaida(tripulante: Tripulante) {
    return new Observable((observer) => {
      if (tripulante.dataEntrada.toString() == "") {
        observer.error(new Error('A data de entrada tem de ser definida'));
      }
      if (tripulante.dataEntrada.toString() != "" && tripulante.dataSaida.toString() != "") {
        if ((new Date(tripulante.dataSaida).getTime()) < (new Date(tripulante.dataEntrada).getTime())) {
          observer.error(new Error('A data de saida tem de ser posterior a data de entrada'));
        } else {
          observer.next();
        }
      } else {
        observer.next();
      }

    });
  }

  getTripulantes(): Observable<Tripulante[]> {
    return this.http.get<Tripulante[]>(this.TripulanteURL, this.httpOptions).pipe(
      tap((_) => this.messageService.log(`Tripulantes recebidos`)),
      catchError(this.messageService.handleError<Tripulante[]>('get tripulantes'))
    );
  }

}
