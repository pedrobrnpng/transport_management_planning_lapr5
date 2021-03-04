import { Component, OnInit } from '@angular/core';
import TipoViatura from 'src/app/models/tipoViatura';
import { Combustivel } from '../../models/combustivel';
import { Moeda } from '../../models/moeda';
import { MessageService } from 'src/app/services/message.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';

@Component({
  selector: 'app-tipo-viatura',
  templateUrl: './tipo-viatura.component.html',
  styleUrls: ['./tipo-viatura.component.css']
})

export class TipoViaturaComponent implements OnInit {
  
  combustivel = "Gasolina";
  moeda = "EUR";
  tCombustivel = Combustivel;
  keysCombustivel = [];
  moedas = [];
  tMoeda = Moeda;

  tipoViatura: TipoViatura = {
    id: '',
    descricao: '',
    combustivel: 23,
    autonomia: null,
    velocidadeMedia: null,
    custoKM: {
      valor: null,
      moeda: 'EUR'
    },
    consumoMedio: null
  };

  validade = {
    id: false,
    descricao: false,
    autonomia: false,
    velocidadeMedia: false,
    valor: false,
    consumoMedio: false
  };

  message = {
    id: '',
    descricao: '',
    autonomia: '',
    velocidadeMedia: '',
    valor: '',
    consumoMedio: ''
  };

  private valid = '✔';
  
  constructor(
    private tipoViaturaService: TipoViaturaService, 
    public messageService: MessageService
  ) {
    this.keysCombustivel = Object.keys(this.tCombustivel).filter(f => !isNaN(Number(f)));
    this.moedas = Object.values(this.tMoeda);
   }

  ngOnInit(): void {
  }

  changeCombustivel(value: string) {
    this.tipoViatura.combustivel = parseInt(value);
  }

  changeMoeda(value: string) {
    this.tipoViatura.custoKM.moeda = value;
  }

  validarID(): void {
    this.tipoViaturaService.verificarId(this.tipoViatura.id)
    .subscribe(() => {
      this.message.id = this.valid;
      this.validade.id = true;
    }, err => {
      this.message.id = err;
      this.validade.id = false;
    });
  }

  validarCodigo(): void {
    this.tipoViaturaService.validarCodigo(this.tipoViatura.id)
    .subscribe( () => {
      this.message.id = this.valid;
      this.validade.id = true;
    }, err => {
      this.message.id = err;
      this.validade.id = false;
    })
  }

  validarDescricao(): void {
    this.tipoViaturaService.validarDescricao(this.tipoViatura.descricao)
    .subscribe( () => {
      this.message.descricao = this.valid;
      this.validade.descricao = true;
    }, err => {
      this.message.descricao = err;
      this.validade.descricao = false;
    })
  }

  validarAutonomia(): void {
    this.tipoViaturaService.validarAutonomia(this.tipoViatura.autonomia)
    .subscribe( () => {
      this.message.autonomia = this.valid;
      this.validade.autonomia = true;
    }, err => {
      this.message.autonomia = err;
      this.validade.autonomia = false;
    })
  }

  validarVelocidade(): void {
    this.tipoViaturaService.validarVelocidade(this.tipoViatura.velocidadeMedia)
    .subscribe( () => {
      this.message.velocidadeMedia = this.valid;
      this.validade.velocidadeMedia = true;
    }, err => {
      this.message.velocidadeMedia = err;
      this.validade.velocidadeMedia = false;
    })
  }

  validarConsumo(): void {
    this.tipoViaturaService.validarConsumo(this.tipoViatura.consumoMedio)
    .subscribe( () => {
      this.message.consumoMedio = this.valid;
      this.validade.consumoMedio = true;
    }, err => {
      this.message.consumoMedio = err;
      this.validade.consumoMedio = false;
    })
  }

  validarValor(): void {
    this.tipoViaturaService.validarCusto(this.tipoViatura.custoKM.valor)
    .subscribe( () => {
      this.message.valor = this.valid;
      this.validade.valor = true;
    }, err => {
      this.message.valor = err;
      this.validade.valor = false;
    })
  }

  adicionar(): void {
    if(this.validade.id &&
       this.validade.descricao &&
       this.validade.autonomia &&
       this.validade.velocidadeMedia &&
       this.validade.valor &&
       this.validade.consumoMedio) {
         console.log(this.tipoViatura);
        this.tipoViaturaService.adicionarTipoViatura(this.tipoViatura).subscribe( () => this.limpar());
       } else {
         this.messageService.log('Verifique os valores introduzidos');
       }
    
  }

  private limpar(): void {
    this.tipoViatura= {
      id: '',
      descricao: '',
      combustivel: null,
      autonomia: null,
      velocidadeMedia: null,
      custoKM: {
        valor: null,
        moeda: ''
      },
      consumoMedio: null
    };
    this.message = {
      id: '',
      descricao: '',
      autonomia: '',
      velocidadeMedia: '',
      valor: '',
      consumoMedio: ''
    };
  }

}
