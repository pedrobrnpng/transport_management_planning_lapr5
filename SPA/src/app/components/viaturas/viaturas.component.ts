import { Component, OnInit } from '@angular/core';
import TipoViatura from 'src/app/models/tipoViatura';
import Viatura from 'src/app/models/viatura';
import { MessageService } from 'src/app/services/message.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';
import { ViaturaService } from 'src/app/services/viatura.service';

@Component({
  selector: 'app-viaturas',
  templateUrl: './viaturas.component.html',
  styleUrls: ['./viaturas.component.css']
})

export class ViaturasComponent implements OnInit {

  viatura: Viatura = {
    vin: '',
    matricula: '',
    dataEntrada: null,
    tipoViaturaId: ''
  }

  validade = {
    vin: false,
    matricula: false,
    dataEntrada: false,
  }

  message = {
    vin: '',
    matricula: '',
    dataEntrada: '',
  }

  private valid = '✔';

  tiposViatura: TipoViatura[]=[];

  constructor(
    private viaturaService: ViaturaService,
    private messageService: MessageService,
    private tipoViaturaService: TipoViaturaService
  ) { }

  ngOnInit(): void {
    this.tipoViaturaService.getTiposViatura().subscribe(tvs => {
      this.tiposViatura = tvs;
      this.viatura.tipoViaturaId = this.tiposViatura[0].id;
    });
  }

  changeTipoViatura(value: string) {
    this.viatura.tipoViaturaId = value;
  }

  validarDataEntrada():void {
    this.viaturaService.validarDataEntrada(this.viatura.dataEntrada)
    .subscribe(() => {
        this.message.dataEntrada = this.valid;
        this.validade.dataEntrada = true;
      }, err => {
        this.message.dataEntrada = err;
        this.validade.dataEntrada = false;
      });
  }

  validarMatricula(): void {
    this.viaturaService.verificarMatricula(this.viatura.matricula)
    .subscribe(() => {
      this.message.matricula = this.valid;
      this.validade.matricula = true;
    }, err => {
      this.message.matricula = err;
      this.validade.matricula= false;
    });
  }

  validarVIN(): void {
    this.viaturaService.verificarVIN(this.viatura.vin)
    .subscribe(() => {
      this.message.vin = this.valid;
      this.validade.vin = true;
    }, err => {
      this.message.vin = err;
      this.validade.vin = false;
    });
  }

  adicionar(): void {    
    if(this.validade.matricula &&
       this.validade.vin && 
       this.validade.dataEntrada){
        this.viaturaService.adicionarViatura(this.viatura)
                                    .subscribe(() => { this.limpar() })    
       } else {
         this.messageService.log('Verifique os valores introduzidos.');
       }
                               
  }

  private limpar(): void {

    this.viatura= {
      vin: '',
      matricula: '',
      dataEntrada: null,
      tipoViaturaId: ''
    };
    this.message = {
      vin: '',
      matricula: '',
      dataEntrada: '',
    };
    this.validade = {
      vin: false,
      matricula: false,
      dataEntrada: false
    }
  }

}
