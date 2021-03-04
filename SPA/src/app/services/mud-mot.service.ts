import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../config';

@Injectable({
    providedIn: 'root'
  })
export class MudMotService {

    private apiUrl = config.mdrurl.mudMot;

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Origin': 'http://localhost:4200' })
    };

    constructor(private http: HttpClient, private messageService: MessageService) {}

    public getMelhorCaminho(noI:string,noF:string) : Observable<JSON> {
      var nos:JSON = <JSON><unknown> 
      {
      "noi":noI,
      "nof":noF 
      };
      return this.http.post<JSON>(this.apiUrl,nos).pipe(tap((res: JSON) => this.messageService.log(JSON.stringify(res))),
        catchError(this.messageService.handleError<JSON>('Mudança de motorista'))
      );
    }

    verificaNo(idNoInicio,idNoFim): Observable<string> {
      return new Observable((observer) => {
        if(idNoInicio === idNoFim) {
          observer.error(new Error("Nó de inicio e nó de fim não podem ser iguais"));
        }else {
          observer.next();
        }
      });
    }

}