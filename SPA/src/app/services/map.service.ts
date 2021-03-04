import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import config from '../config';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import No from '../models/no';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private NosUrl = config.mdrurl.no;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

    getNos(): Observable<No[]> {
        return this.http.get<No[]>(this.NosUrl)
        .pipe(retry(3), catchError(this.messageService.handleError<No[]>('getNos',[])));
    }

}