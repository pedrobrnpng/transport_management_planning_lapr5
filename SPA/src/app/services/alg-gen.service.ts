import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import algGen from '../models/alg-gen';
import { MessageService } from './message.service';
import config from '../config';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlgGenService {

  private apiUrl = config.mdvurl.algGen;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  get(algGen: algGen) {
    var data: JSON = <JSON><unknown>
      {
        "sv": algGen.servicoVeiculo,
        "ng": algGen.novasGeracoes,
        "dm": algGen.dimensaoPopulacao,
        "pb": algGen.probabilidadeCruzamento,
        "pm": algGen.probabilidadeMutacao,
        "pi": algGen.percentagemIndividuosMelhores,
        "tempo": algGen.tempoAbsolutoParagem,
        "aval": algGen.avaliacaoTermino
      };
    return this.http.post<JSON>(this.apiUrl, data).pipe(tap((res: JSON) => this.messageService.log(JSON.stringify(res))),
      catchError(this.messageService.handleError<JSON>('Visualização do algoritmo genético'))
    );
  }

}
