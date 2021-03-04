import { Component, OnInit } from '@angular/core';
import ServicoViatura from 'src/app/models/servicoViatura';
import { MessageService } from 'src/app/services/message.service';
import { ServicoViaturaService } from 'src/app/services/servico-viatura.service';
import AlgGen from '../../models/alg-gen';
import { AlgGenService } from '../../services/alg-gen.service'

@Component({
  selector: 'app-alg-gen',
  templateUrl: './alg-gen.component.html',
  styleUrls: ['./alg-gen.component.css']
})
export class AlgGenComponent implements OnInit {

  message = {
    servicoVeiculo: ''
  };
  validadeTipoTripulante = {
    servicoVeiculo: false
  };
  private valide = '✔';

  constructor(private messageService: MessageService,private algGenService: AlgGenService, private svService: ServicoViaturaService) { }

  ngOnInit(): void {
  }

  get(servicoVeiculo: string): void {
    this.messageService.clear()
    if (this.validadeTipoTripulante.servicoVeiculo) {
      this.algGenService.get({
        servicoVeiculo: servicoVeiculo, novasGeracoes: 10, populacoesEstaveis: 5,
        dimensaoPopulacao: 10,
        probabilidadeCruzamento: 70, probabilidadeMutacao: 5,
        percentagemIndividuosMelhores: 70,
        tempoAbsolutoParagem: 1, avaliacaoTermino: 100
      } as AlgGen)
        .subscribe();
    } else {
      this.messageService.log("Tem que introduzir um serviço de viatura válido")
    }
  }

  verificarServico(servico:string) {
    this.svService.verificaCodigo({nome: servico} as ServicoViatura).subscribe(() => {
        this.message.servicoVeiculo = "Serviço de viatura não existe";
        this.validadeTipoTripulante.servicoVeiculo = false;
      }, err => {
        this.message.servicoVeiculo=this.valide;
        this.validadeTipoTripulante.servicoVeiculo=true;
    });
  }


  clearMessages() {
    this.message = {
      servicoVeiculo: ''
    };
  }
}
