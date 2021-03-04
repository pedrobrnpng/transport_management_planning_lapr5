import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import BlocoTrabalho from 'src/app/models/blocoTrabalho';
import No from 'src/app/models/no';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { NoService } from 'src/app/services/no.service';

@Component({
  selector: 'app-bloco-trabalho',
  templateUrl: './bloco-trabalho.component.html',
  styleUrls: ['./bloco-trabalho.component.css']
})
export class BlocoTrabalhoComponent implements OnInit {

  nos: No[] = [];
  nBlocos:number=1;
  horaI:number;
  horaF:number;
  codigo:number;
  noI:string;
  noF:string;
  message = {
    nBlocos:'',
    horaInicio: '',
    horaFim: '',
    noInicio: '',
    noFim: ''
  };

  validateBloco = {
    nBlocos: false,
    horaInicio: false,
    horaFim: false,
    noInicio: false,
    noFim: false
  };

  blocos: Array<BlocoTrabalho> = new Array<BlocoTrabalho>();

  private valide = '✔';

  constructor(private blocoService: BlocoTrabalhoService, private noService: NoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getNos();
  }

  getNos(): void {
    this.noService.getNos().subscribe((nos) => {
      this.nos = nos;
    });
  }

  verificaNBlocos(nBlocos: number): void {
    if (nBlocos>0) {  
      this.message.nBlocos = this.valide;
      this.validateBloco.nBlocos = true;
      this.nBlocos = nBlocos;
    } else {
      this.message.nBlocos = "Número tem que ser positivo";
      this.validateBloco.nBlocos = false;
    }
  }

  verificaNos(idNoInicio: string, idNoFim: string): void {
    this.noService.verificaNo(idNoInicio, idNoFim).subscribe(
      () => {
        this.message.noInicio = this.valide;
        this.validateBloco.noInicio = true;
        this.message.noFim = this.valide;
        this.validateBloco.noFim = true;
        this.noI = idNoInicio;
        this.noF = idNoFim;
      }, err => {
        this.message.noInicio = err;
        this.message.noFim = '';
        this.validateBloco.noInicio = false;
        this.validateBloco.noFim = false;
      });
  }

  verificaHoras(horaI:string, horaF:string) {
    if (horaI=="") {
      this.message.horaInicio = "Hora de início não pode estar vazia";
      this.validateBloco.horaInicio = false;
    }
    else if (horaF=="") {
      this.message.horaFim = "Hora de fim não pode estar vazia";
      this.validateBloco.horaFim = false;
    } 
    else {
      this.horaI=Number.parseInt(horaI.substring(0,2))*3600+Number.parseInt(horaI.substring(3))*60;
      this.horaF=Number.parseInt(horaF.substring(0,2))*3600+Number.parseInt(horaF.substring(3))*60;
      if (this.horaI>=this.horaF) {
        this.message.horaInicio = "";
        this.validateBloco.horaInicio = false;
        this.message.horaFim = "Hora de início não pode ser depois ou igual à hora de fim";
        this.validateBloco.horaFim = false;
      } else {
        this.message.horaInicio = this.valide;
        this.validateBloco.horaInicio = true;
        this.message.horaFim = this.valide;
        this.validateBloco.horaFim = true;
      }
    }
  }

  adicionarBloco() {
    if (this.validateBloco.nBlocos &&
    this.validateBloco.horaInicio && 
    this.validateBloco.horaFim && this.validateBloco.noInicio && 
    this.validateBloco.noFim) {
      if (this.nBlocos==1) {
        this.blocos.push({ horaInicio:this.horaI, horaFim:this.horaF, noInicio:this.noI, noFim:this.noF, ctt:true } as BlocoTrabalho);
        this.blocoService.adicionarBlocoTrabalho(this.blocos[0]).subscribe(
          () => { this.esvaziar() },
          err => {
            this.messageService.log('Erro na criação de bloco de trabalho');
        });
        return;
      }
      var dur = Math.floor((this.horaF - this.horaI)/this.nBlocos);
      if (dur > 14400) {
        this.messageService.log('Intervalo de horas demasiado grande');
        return;
      }

      var horaInicio;
      var horaFim;
      for (var i=this.nBlocos;i>0;i--) {
        if (i==this.nBlocos) {
          horaInicio=this.horaI;
          horaFim=horaInicio+dur;
        } else if (i==0) {
          horaFim=this.horaF;
        }
        this.blocos.push({ horaInicio:horaInicio, horaFim:horaFim, noInicio:this.noI, noFim:this.noF, ctt:true } as BlocoTrabalho);
        horaInicio=horaFim;
        horaFim+=dur;
      }
      this.blocoService.adicionarBlocosTrabalho(this.blocos).subscribe(
        () => { this.esvaziar() },
        err => {
          this.messageService.log('Erro na criação de blocos de trabalho');
      });
    } else {
        this.messageService.log('Todos os valores necessitam de estar válidos');
    }
  }

  private esvaziar(): void {
    this.blocos=[];
    this.message = {
      nBlocos: '',
      horaInicio: '',
      horaFim: '',
      noInicio: '',
      noFim: ''
    };
    this.validateBloco = {
      nBlocos: false,
      horaInicio: false,
      horaFim: false,
      noInicio: false,
      noFim: false
    };
  }
}
