import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import config from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class ImportarDadosMDRService {

  private importarDadosUrl = config.mdrurl.importarDados;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  importarDados(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<string>(this.importarDadosUrl, formData).pipe(
      tap((result: string) => this.messageService.log(result.toString())),
      catchError(this.messageService.handleError<string>('Ficheiro'))
    );
  }
}

