import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BlocoTrabalho from '../models/blocoTrabalho'
import BlocoViagem from '../models/blocoViagem'
import BlocoViagens from '../models/blocoViagens'
import config from '../config';

@Injectable({
    providedIn: 'root'
  })
export class BlocoTrabalhoService {

    private apiUrl = config.mdvurl.blocosTrabalho;

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Origin': 'http://localhost:4200' })
    };

    constructor(private http: HttpClient, private messageService: MessageService) {}

    private validarBlocoTrabalho(bloco: BlocoTrabalho) {
      return (bloco.horaInicio >= 0) &&
        (bloco.horaFim >= 0) &&
        (bloco.horaInicio <= 86400) &&
        (bloco.horaFim <= 86400);
    }

    adicionarBlocoTrabalho(bloco: BlocoTrabalho) : Observable<BlocoTrabalho> {
      if (!this.validarBlocoTrabalho(bloco)) {
        this.messageService.log('Bloco de trabalho mal definido')
        return;
      }
      return this.http.post<BlocoTrabalho>(this.apiUrl, bloco, this.httpOptions).pipe(
        tap((newBloco: BlocoTrabalho) => this.messageService.log(`Bloco de Trabalho adicionado com código = ${newBloco.codigo}`)),
        catchError(this.messageService.handleError<BlocoTrabalho>('Bloco de Trabalho'))
      );
    }

    adicionarBlocosTrabalho(blocos: Array<BlocoTrabalho>) : Observable<Array<BlocoTrabalho>> {
      blocos.forEach(bloco => {
        if (!this.validarBlocoTrabalho(bloco)) {
          this.messageService.log('Bloco de trabalho mal definido')
          return;
        }
      });
      return this.http.post<Array<BlocoTrabalho>>(this.apiUrl+'/List', blocos, this.httpOptions).pipe(
        tap((newBloco: Array<BlocoTrabalho>) => this.messageService.log(`Blocos de Trabalho adicionados de código ${newBloco[0].codigo} a ${newBloco[newBloco.length-1].codigo}`)),
        catchError(this.messageService.handleError<Array<BlocoTrabalho>>('Blocos de Trabalho'))
      );
    }

    getBlocosTrabalho() {
      return this.http.get<BlocoTrabalho[]>(this.apiUrl, this.httpOptions).pipe(
        tap((_) => console.log(`Blocos de trabalho recebidos`)),
        catchError(this.messageService.handleError<BlocoTrabalho[]>('get Blocos de Trabalho'))
      );
    }

    getBlocoTrabalho(codigo:number) {
      return this.http.get<BlocoTrabalho>(this.apiUrl+"/"+codigo, this.httpOptions).pipe(
        tap((_) => console.log(`Bloco de trabalho recebido`)),
        catchError(this.messageService.handleError<BlocoTrabalho>('get Bloco de Trabalho'))
      );
    }

    getBlocosTrabalhoSemST() {
      return this.http.get<BlocoTrabalho[]>(this.apiUrl+'/NoST', this.httpOptions).pipe(
        tap((_) => console.log(`Blocos de trabalho recebidos`)),
        catchError(this.messageService.handleError<BlocoTrabalho[]>('get Blocos de Trabalho'))
      );
    }

    getBlocosTrabalhoSemSV() {
      return this.http.get<BlocoTrabalho[]>(this.apiUrl+'/NoSV', this.httpOptions).pipe(
        tap((_) => console.log(`Blocos de trabalho recebidos`)),
        catchError(this.messageService.handleError<BlocoTrabalho[]>('get Blocos de Trabalho'))
      );
    }

    verificaCodigo(bloco: BlocoTrabalho) {
      const url = this.apiUrl + '/' + bloco.codigo;
      return new Observable((observer) => {
        if (bloco.codigo === 0) {
          observer.error(new Error('O código do Bloco de Trabalho não pode ficar em branco'));
        }
        this.http.get<BlocoTrabalho>(url).subscribe(
          res => {
            observer.error(new Error('O Bloco de Trabalho não pode já estar definido'));
          }, err => {
            observer.next();
          }
        );
      });
    }

    getBlocosViagens(codigo: number) {
      return this.http.get<BlocoViagens>(this.apiUrl+"/"+codigo+"/Viagens", this.httpOptions).pipe(
        tap((_) => this.messageService.log(`Viagens de bloco de trabalho recebidas`)),
        catchError(this.messageService.handleError<BlocoViagens>('Bloco não tem viagens associadas'))
      );
    }

    getViagensPossiveis(codigo: number) {
      return this.http.get<BlocoViagens>(this.apiUrl+"/"+codigo+"/ViagensPossiveis", this.httpOptions).pipe(
        tap((_) => this.messageService.log(`Viagens recebidas`)),
        catchError(this.messageService.handleError<BlocoViagens>('Bloco não tem viagens possíveis'))
      );
    }

    adicionarViagemABloco(bloco: number, viagem: number) : Observable<BlocoViagem> {
      var viagemJSON:JSON = <JSON><unknown>
      {
      "viagemId":viagem
      };
      return this.http.post<BlocoViagem>(this.apiUrl+"/"+bloco+"/AdicionarViagem", viagemJSON, this.httpOptions).pipe(
        tap((newBlocoViagem: BlocoViagem) => this.messageService.log(`Viagem adicionada a bloco de trabalho com sucesso`)),
        catchError(this.messageService.handleError<BlocoViagem>('Bloco Viagem'))
      );
    }

    parseHora(hora:number) {
      var result=""
      var horas=Math.floor(hora/3600);
      var minutos=Math.floor((hora%3600)/60)
      var segundos=(hora%3600)%60
      
      if (horas<10)
        result+="0"+horas+":"
      else
        result+=horas+":"
  
      if (minutos<10)
        result+="0"+minutos+":"
      else
        result+=minutos+":"
  
      if (segundos<10)
        result+="0"+segundos
      else
        result+=segundos
  
      return result
    }

}
