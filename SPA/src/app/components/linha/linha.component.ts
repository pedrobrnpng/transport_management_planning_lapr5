import { Component, OnInit } from '@angular/core';
import Linha from 'src/app/models/linha';
import No from 'src/app/models/no';
import { TipoTripulante } from 'src/app/models/tipoTripulante';
import TipoViatura from 'src/app/models/tipoViatura';
import { LinhaService } from 'src/app/services/linha.service';
import { MessageService } from 'src/app/services/message.service';
import { NoService } from 'src/app/services/no.service';
import { TipoTripulanteService } from 'src/app/services/tipo-tripulante.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';

@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.css']
})
export class LinhaComponent implements OnInit {

  linha: Linha = {
    id: '',
    noInicial: '',
    noFinal: '',
    nome: '',
    idTiposTripulante: [],
    idTiposViatura: [],
    cor: 'RGB(255,0,0)'
  };

  validade = {
    id: false,
    nome: false,
    cor: true
  };

  message = {
    id: '',
    nome: '',
    cor: ''
  };

  private valid = '✔';

  linhas: Linha[]=[];
  nos: No[]=[];
  tViatura: TipoViatura[]=[];
  tTripulante: TipoTripulante[]=[];

  constructor(
      private linhaService: LinhaService,
      private noService: NoService,
      private tipoViaturaService: TipoViaturaService,
      private tiposTripulanteService: TipoTripulanteService,
      private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.noService.getNos().subscribe(nos => {
      this.nos = nos;
      this.linha.noInicial = nos[0].name;
    });
    this.tipoViaturaService.getTiposViatura().subscribe(tvs => {
      this.tViatura = tvs;
    });
    this.tiposTripulanteService.getTiposTripulante().subscribe(tps => {
      this.tTripulante = tps;
    });
    this.linhaService.getLinhas().subscribe(l => {
      this.linhas = l;
    })
  }

  changeNoInicial(value) {
    this.linha.noInicial = value;
  }

  changeNoFinal(value) {
    this.linha.noFinal = value;
  }

  addTipoViatura(value) {
    this.linha.idTiposViatura.push(value); 
  }

  addTipoTripulante(value) {
    this.linha.idTiposTripulante.push(value);
  }

  changeCor(value) {
    var tstr:string=value.toString()
    var rs=tstr.substring(1,3)
    var gs=tstr.substring(5,7)
    var bs=tstr.substring(3,5)
    var r=parseInt(rs,16)
    var g=parseInt(gs,16)
    var b=parseInt(bs,16)
    var rgb="RGB("+r+","+b+","+g+")"
    this.linha.cor=rgb
  }

  validarID(): void {
    this.linhaService.verificarId(this.linha.id)
    .subscribe(() => {
      this.message.id = this.valid;
      this.validade.id = true;
    }, err => {
      this.message.id = err;
      this.validade.id = false;
    });
  }

  validarNome(): void {
    this.linhaService.validarNome(this.linha.nome)
    .subscribe(() => {
      this.message.nome = this.valid;
      this.validade.nome = true;
    }, err => {
      this.message.nome = err;
      this.validade.nome = false;
    });
  }

  validarCor(): void {
    this.linhaService.validarCor(this.linha.cor)
    .subscribe(() => {
      this.message.cor = this.valid;
      this.validade.cor = true;
    }, err => {
      this.message.cor = err;
      this.validade.cor = false;
    });
  }

  adicionar(): void {    
    if(this.validade.id &&
       this.validade.nome && this.validade.cor){
        this.linhaService.adicionarLinha(this.linha)
                                    .subscribe(() => { this.limpar() })    
       } else {
         this.messageService.log('Verifique os valores introduzidos.');
       }
                               
  }

  private limpar(): void {
    this.linha= {
      id: '',
      noInicial: '',
      noFinal: '',
      nome: '',
      idTiposTripulante: [],
      idTiposViatura: [],
      cor: ''
    };
    this.message = {
      id: '',
      nome: '',
      cor: ''
    };
  }
}
