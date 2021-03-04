import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import algGen from '../models/alg-gen';
import { MessageService } from './message.service';
import config from '../config';
import { catchError, delay, tap } from 'rxjs/operators';
import ServicoTripulante from '../models/ServicoTripulante';
import { ServicoTripulanteService } from './servico-tripulante.service';

@Injectable({
  providedIn: 'root'
})
export class GeraStService {


  private apiUrl = config.mdvurl.geraSt;
  private stUrl = config.mdvurl.servicosTripulante;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private messageService: MessageService, private servicoTripulanteService:ServicoTripulanteService) { }

  async geraStAutomaticamente() {
    var sts, split,split0, cont = 9000, list = [];
    var res = await this.http.get(this.apiUrl).toPromise();
    console.log(res);
    sts = JSON.stringify(res);
    split0 = sts.split("+");
    split = split0[1].split(",");
    for (var i = 1; i < split.length; i++) {
      list = [];
      var split2 = split[i].split("-");
      var split3 = split2[1].split(";");
      for (var j = 0; j < split3.length - 1; j++) {
        list.push(split3[j]);
      }
      const cont1= cont + i;
      var servicoTripulante = { tripulanteDomainId: split2[0], nome: cont1.toString(), cor: "RGB(10,10,10)", blocosTrabalho: list } as ServicoTripulante;

      this.servicoTripulanteService.adicionarServicoTripulante(servicoTripulante).subscribe(() => this.messageService.log("Gerador de serviços de tripulante efetuado com sucesso.\n"+split0[0].split("\"")[1]));
    }
    return split0[0];
  }

}


