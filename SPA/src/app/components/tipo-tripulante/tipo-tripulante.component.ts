import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { TipoTripulante } from 'src/app/models/tipoTripulante';
import { MessageService } from 'src/app/services/message.service';
import { TipoTripulanteService } from 'src/app/services/tipo-tripulante.service';

@Component({
  selector: 'app-tipo-tripulante',
  templateUrl: './tipo-tripulante.component.html',
  styleUrls: ['./tipo-tripulante.component.css']
})
export class TipoTripulanteComponent implements OnInit {

  tipoTripulantes: TipoTripulante[] = [];
  message = {
    id: '',
    description: ''
  };
  validadeTipoTripulante = {
    id: false,
    description: false
  };
  private valide = '✔';


  constructor(private tipoTripulanteService: TipoTripulanteService) { }

  ngOnInit(): void {
  }

  adicionar(id: string, description: string): void {
    this.tipoTripulanteService.adicionarTipoTripulante({ id, description } as TipoTripulante)
      .subscribe(tipoTripulante => {
        this.tipoTripulantes.push(tipoTripulante);
      });
  }

  verifica(id: string): void {
    this.tipoTripulanteService.verificaIdTipoTripulante({ id: id } as TipoTripulante)
      .subscribe(
        () => {
          this.message.id = this.valide;
          this.validadeTipoTripulante.id = true;
        }, err => {
          this.message.id = err;
          this.validadeTipoTripulante.id = false;
        });
  }

  verificaDescricao(descricao: string): void {
    this.tipoTripulanteService.verificaDescricao({ description: descricao } as TipoTripulante).subscribe(
      () => {
        this.message.description = this.valide;
        this.validadeTipoTripulante.description = true;
      }, err => {
        this.message.description = err;
        this.validadeTipoTripulante.description = false;
      }
    );
  }

  clearMessages() {
    this.message = {
      id: '',
      description: ''
    };
  }
}
