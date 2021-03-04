import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import ImportMDV from '../models/importMDV'
import config from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class ImportarDadosMDVService {

  private importarDadosUrl = config.mdvurl.importarDados;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  importarDados(file: File): Observable<ImportMDV> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<ImportMDV>(this.importarDadosUrl, formData).pipe(
      tap((result: ImportMDV) => this.messageService.log(result.input)),
      catchError(this.messageService.handleError<ImportMDV>('Ficheiro'))
    );
  }
}

