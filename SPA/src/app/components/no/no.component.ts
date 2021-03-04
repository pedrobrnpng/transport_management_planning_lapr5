import { MessageService } from 'src/app/services/message.service';
import { NoService } from './../../services/no.service';
import { Component, OnInit } from '@angular/core';
import No from '../../models/no';

@Component({
  selector: 'app-no',
  templateUrl: './no.component.html',
  styleUrls: ['./no.component.css']
})
export class NoComponent implements OnInit {

  no: No = {
    name: '',
    id_abreviature: '',
    type: '',
    xCoordinate: null,
    yCoordinate: null
  };

  validadeNo = {
    name: false,
    id_abreviature: false,
    type: false,
    xCoordinate: false,
    yCoordinate: false
  };

  message = {
    longitude: '',
    latitude: '',
    nome: '',
    abreviatura: '',
    tipo: ''
  };

  nos: No[];

  modelos: string[];

  noModelo = {
    no: null,
    modelo: ''
  };

  validadeNoModelo = {
    no: false,
    modelo: false
  };

  messageNoModelo = {
    no: '',
    modelo: ''
  };

  private valide = '✔';

  readonly assets = '../../../assets/3dmodels/';

  constructor(public noService: NoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.preencherNos();
    //this.preencherModelos();
  }

  adicionar(): void {
    if (this.validadeNo.id_abreviature &&
      this.validadeNo.name &&
      this.validadeNo.type &&
      this.validadeNo.xCoordinate &&
      this.validadeNo.yCoordinate) {
      this.noService.adicionarNo(this.no).subscribe(() => this.esvaziar());
    } else {
      this.messageService.log('Todos os valores necessitam de estar válidos');
    }
  }

  adicionarModelo(): void {
    this.verificarNo();
    this.verificarModelo();
    if (this.validadeNoModelo.modelo === true && this.validadeNoModelo.no === true) {
      this.noService.alterarModelo(this.noModelo.no, this.noModelo.modelo).subscribe(() => { this.esvaziarNoModelo(); }
      );
    }
  }

  verificarAbreviatura(): void {
    this.noService.verificarAbreviatura(this.no.id_abreviature).subscribe(
      () => {
        this.message.abreviatura = this.valide;
        this.validadeNo.id_abreviature = true;
      }, err => {
        this.message.abreviatura = err;
        this.validadeNo.id_abreviature = false;
      });
  }

  verificarNome(): void {
    this.noService.verificarNome(this.no.name).subscribe(
      () => {
        this.message.nome = this.valide;
        this.validadeNo.name = true;
      }, err => {
        this.message.nome = err;
        this.validadeNo.name = false;
      });
  }

  verificarTipo(): void {
    if (this.no.type) {
      this.message.tipo = this.valide;
      this.validadeNo.type = true;
    }
    else {
      this.message.tipo = `Tipo inválido: é necessário selecionar um tipo de nó`;
      this.validadeNo.type = false;
    }
  }

  verificarLongitude(): void {
    this.noService.verificarLongitude(this.no.yCoordinate).subscribe(
      () => {
        this.message.longitude = this.valide;
        this.validadeNo.yCoordinate = true;
      }, err => {
        this.message.longitude = err;
        this.validadeNo.yCoordinate = false;
      });
  }

  verificarLatitude(): void {
    this.noService.verificarLatitude(this.no.xCoordinate).subscribe(
      () => {
        this.message.latitude = this.valide;
        this.validadeNo.xCoordinate = true;
      }, err => {
        this.message.latitude = err;
        this.validadeNo.xCoordinate = false;
      });
  }

  preencherNos(): void {
    this.noService.getNos().subscribe(nos => this.nos = nos);
  }

  // preencherModelos(): void {
  //   const fs = require('fs');
  //   fs.readdir(this.assets, (_, files) => this.modelos = files);
  // }

  verificarNo(): void {
    this.noService.verificarNoModelo(this.noModelo.no).subscribe(
      () => {
        this.validadeNoModelo.no = true;
        this.messageNoModelo.no = this.valide;
      }, err => {
        this.validadeNoModelo.no = false;
        this.messageNoModelo.no = err;
      });
  }

  verificarModelo(): void {
    this.noService.verificarNoModelo(this.noModelo.modelo).subscribe(
      () => {
        this.validadeNoModelo.modelo = true;
        this.messageNoModelo.modelo = this.valide;
      }, err => {
        this.validadeNoModelo.modelo = false;
        this.messageNoModelo.modelo = err;
      });
  }



  private esvaziar(): void {
    this.no = {
      name: '',
      id_abreviature: '',
      type: '',
      xCoordinate: null,
      yCoordinate: null
    };
    this.message = {
      longitude: '',
      latitude: '',
      nome: '',
      abreviatura: '',
      tipo: ''
    };
    this.validadeNo = {
      name: false,
      id_abreviature: false,
      type: false,
      xCoordinate: false,
      yCoordinate: false
    };
  }

  private esvaziarNoModelo(): void {
    this.noModelo = {
      no: null,
      modelo: ''
    };
    this.messageNoModelo = {
      no: '',
      modelo: ''
    };
    this.validadeNoModelo = {
      no: false,
      modelo: false
    };
  }

}
