import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


import config from '../config'
import Viatura from "../models/viatura";
import { MessageService } from "./message.service";
import { isLetter, isNumber } from "../utils/string";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ 
    providedIn: 'root'
})

export class ViaturaService {
    private ViaturaURL = config.mdvurl.viaturas;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    private validarViatura(viatura: Viatura) {
        const validadeTipoViatura = viatura.tipoViaturaId.length == 20;
        const validadeMatricula = this.validarMatricula(viatura.matricula);
        const validadeVin = this.validarVIN(viatura.vin);
        return validadeTipoViatura && validadeMatricula && validadeVin;
    }

    public verificarVIN(vin: string): Observable<void> {
        return new Observable((observer) => {
            if(vin === '' || vin === undefined || vin === null) {
                observer.error(new Error('Introduza um VIN.'));
            } else if(!this.validarVIN(vin)) {
                observer.error(new Error('O VIN introduzido é inválido'))
            } else {
                const v = {
                    matricula: '',
                    vin: vin,
                    dataEntrada: null,
                    tipoViaturaId: ''
                };
                this.getViaturaByVIN(v).subscribe(
                    res => {
                        observer.error(new Error('O VIN tem de ser único'));
                    },
                    err => {
                        observer.next();
                    }
                );
            }
        });
    }

    public verificarMatricula(matricula: string): Observable<void> {
        return new Observable((observer) => {
            if(matricula === '' || matricula === undefined || matricula === null) {
                observer.error(new Error('Introduza uma matricula.'));
            } else if(!this.validarMatricula(matricula)) {
                observer.error(new Error('A matricula é do formato AA-AA-00 ou AA-00-00.'))
            } else {
                const v = {
                    matricula: matricula,
                    vin: '',
                    dataEntrada: null,
                    tipoViaturaId: ''
                };
                this.getViaturaByMatricula(v).subscribe(
                    res => {
                        observer.error(new Error('A matrícula tem de ser única.'));
                    },
                    err => {
                        observer.next();
                    }
                );
            }
        });
    }
    public validarMatricula(matricula: string){
        if(!(matricula.match(/^[A-Z]{2}-[0-9]{2}-[0-9]{2}$/) || matricula.match(/^[0-9]{2}-[0-9]{2}-[A-Z]{2}$/) 
         || matricula.match(/^[0-9]{2}-[A-Z]{2}-[0-9]{2}$/) || matricula.match(/^[A-Z]{2}-[A-Z]{2}-[0-9]{2}$/) 
         || matricula.match(/^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$/) || matricula.match(/^[0-9]{2}-[A-Z]{2}-[A-Z]{2}$/))){
            return false;
        }
        return true;
    }

    /* public validarMatricula(matricula: string){
            if(matricula.length > 8)
                return false; 

            var numeros = 0;
            var letras = 0;

            var partes = matricula.split('-');
            if (partes.length == 3) {
                for(var i = 0; i < partes.length ; i++){
                    var chars = partes[i].split('');
                    if (chars.length == 2) {
                        console.log(chars);
                        //A5-55-55
                        // V && F || F && V
                        //    F   ||    F
                        //        F
                        if (!(isLetter(chars[0]) && isLetter(chars[1]))){
                            console.log("letras");
                            return false;
                        } else { letras++ };

                        if (!(isNumber(chars[0]) && isNumber(chars[1]))){
                            console.log("numeros");
                            return false;
                        } else { numeros++ };

                    } else
                        return false;
                }
            } else{
                return false;
            }
            

            if(letras === 3 || numeros === 3)
                return false;
            
            return true;
        } */


    public validarVIN(vin: string) {
        if (vin.length != 17)
            return false;
        
        var result = 0;
        var checkDigit = 0;
        var checkSum = 0;
        var weight = 0;
        var vinArray = vin.split('');

        for(var i = 0; i < vinArray.length ; i++){
  
            var character = vinArray[i].toString().toLowerCase();
            if (isNumber(character)){
                result = parseInt(character);}
            else {
                switch (character) {
                    case "a":
                    case "j":
                        result = 1;
                        break;
                    case "b":
                    case "k":
                    case "s":
                        result = 2;
                        break;
                    case "c":
                    case "l":
                    case "t":
                        result = 3;
                        break;
                    case "d":
                    case "m":
                    case "u":
                        result = 4;
                        break;
                    case "e":
                    case "n":
                    case "v":
                        result = 5;
                        break;
                    case "f":
                    case "w":
                        result = 6;
                        break;
                    case "g":
                    case "p":
                    case "x":
                        result = 7;
                        break;
                    case "h":
                    case "y":
                        result = 8;
                        break;
                    case "r":
                    case "z":
                        result = 9;
                        break;
                }
            }

            if ((i+1) >= 1 && (i+1) <= 7 || (i+1) == 9)
                weight = 9 - (i+1);
            else if ((i+1) == 8)
                weight = 10;
            else if ((i+1) >= 10 && (i+1) <= 17)
                weight = 19 - (i+1);
            if ((i+1) == 9) 
                checkDigit = character == "x" ? 10 : result;

            checkSum += (result * weight);
        }  
            return ((checkSum % 11) == checkDigit);
            
        }

        validarDataEntrada(dataEntrada: Date) {
            return new Observable((observer) => {
                const data = new Date(dataEntrada);
                const agora = new Date();
              if ( data > agora) {
                observer.error("A Data de entrada não pode ser superior ao dia de hoje.");
              } else {
                observer.next();
              }
            });
          }

        getViaturaByMatricula(viatura: Viatura): Observable<Viatura> {
            return this.http.get<Viatura>(this.ViaturaURL + '/matricula/' + viatura.matricula, this.httpOptions)
            .pipe(tap((v) => this.messageService.log(`Viatura ${v} recebido`)));
        }

        getViaturaByVIN(viatura: Viatura): Observable<Viatura> {
            return this.http.get<Viatura>(this.ViaturaURL + '/vin/' + viatura.vin, this.httpOptions)
            .pipe(tap((v) => this.messageService.log(`Viatura ${v} recebido`)));
        }

        adicionarViatura(viatura: Viatura): Observable<Viatura> {
            if(!this.validarViatura(viatura)){
                this.messageService.log('Viatura mal definida');
                return;
            }

            return this.http.post<Viatura>(this.ViaturaURL, viatura, this.httpOptions)
                    .pipe(tap((newViatura: Viatura) => this.messageService.log(`Viatura adicionada com matricula = ${newViatura.matricula}`)),
                    catchError(this.messageService.handleError<Viatura>('Viatura')));
      
        }

        public getViaturas() {
            return this.http.get<Viatura[]>(this.ViaturaURL, this.httpOptions).pipe(
              tap((_) => this.messageService.log(`Viaturas recebidas`)),
              catchError(this.messageService.handleError<Viatura[]>('get Viaturas'))
            );
          }


    }
