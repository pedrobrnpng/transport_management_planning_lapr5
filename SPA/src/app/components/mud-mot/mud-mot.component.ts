import { Component, OnInit } from '@angular/core';
import { MudMotService } from 'src/app/services/mud-mot.service';
import { NoService } from 'src/app/services/no.service';
import No from 'src/app/models/no';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-mud-mot',
  templateUrl: './mud-mot.component.html',
  styleUrls: ['./mud-mot.component.css']
})
export class MudMotComponent implements OnInit {

  paths:JSON[]=[]
  nos: No[] = [];
  nocheck: No = {
    name: '',
    id_abreviature: '',
    type: '',
    xCoordinate: null,
    yCoordinate: null
  };

  message = {
    idNoInicio: '',
    idNoFim: ''
  };

  validateNos = {
    idNoInicio: false,
    idNoFim: false
  };

  private valide = '✔';

  constructor(private mudMotService: MudMotService, private noService: NoService) { }

  ngOnInit(): void {
    this.getNos();
  }

  planMudMot(noI:string,noF:string): void {
    if (this.validateNos.idNoInicio && this.validateNos.idNoFim) {
      this.mudMotService.getMelhorCaminho(noI,noF)
      .subscribe(path => {
        this.paths.push(path);
      });
    }
  }

  getNos(): void {
    this.noService.getNos().subscribe((nos) => {
      this.nos = nos;
    });
  }

  verificaNoInicio(idNoInicio: string, idNoFim: string): void {
    this.mudMotService.verificaNo(idNoInicio, idNoFim).subscribe(
      () => {
        this.nocheck.id_abreviature=idNoInicio
        this.noService.getNo(this.nocheck).subscribe((no) => {
          this.nocheck = no;
          if (this.nocheck.type=="estacaorecolha" || this.nocheck.type=="pontorendicao") {
            this.message.idNoInicio = this.valide;
            this.validateNos.idNoInicio = true;
          } else {
            this.message.idNoInicio = "Nó não é estação de recolha ou ponto de rendição";
            this.validateNos.idNoInicio = false;
          }
        });
      }, err => {
        this.message.idNoInicio = err;
        this.validateNos.idNoInicio = false;
      });
  }

  verificaNoFim(idNoFim: string): void {
    this.nocheck.id_abreviature=idNoFim
    this.noService.getNo(this.nocheck).subscribe((no) => {
      this.nocheck = no;
      if (this.nocheck.type=="estacaorecolha" || this.nocheck.type=="pontorendicao") {
        this.message.idNoFim = this.valide;
        this.validateNos.idNoFim = true;
      } else {
        this.message.idNoFim = "Nó não é estação de recolha ou ponto de rendição";
        this.validateNos.idNoFim = false;
      }
    });
  }

}
