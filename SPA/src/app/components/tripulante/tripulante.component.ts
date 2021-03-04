import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { TipoTripulante } from 'src/app/models/tipoTripulante';
import Tripulante from 'src/app/models/tripulante';
import { TipoTripulanteService } from 'src/app/services/tipo-tripulante.service';
import { TripulanteService } from 'src/app/services/tripulante.service';

@Component({
  selector: 'app-tripulante',
  templateUrl: './tripulante.component.html',
  styleUrls: ['./tripulante.component.css']
})
export class TripulanteComponent implements OnInit {

  tripulantes: Tripulante[] = [];
  tiposTripulante: TipoTripulante[] = [];
  turnos: string[] = [];

  message = {
    numeroMecanografico:'',
    nome: '',
    dataNascimento: '',
    numeroCartaoCidadao: '',
    nif: '',
    dataEntrada: '',
    dataSaida:''
  };

  validatePercurso = {
    numeroMecanografico:false,
    nome: false,
    dataNascimento: false,
    numeroCartaoCidadao: false,
    nif: false,
    tripulanteTurno: false,
    tipoTripulanteId: false,
    dataEntrada:false,
    dataSaida:false
  };

  private valide = '✔';

  constructor(private tripulanteService: TripulanteService,
    private tipoTripulanteService: TipoTripulanteService) { }

  ngOnInit(): void {
    this.getTiposTripulante();
    this.getTurnos();
  }

  adicionarTripulante(numeroMecanografico: string, nome: string, dataNascimento: Date, numeroCartaoCidadao: string, nif: string,
    turno: string, tipoTripulanteDomainId: string, dataEntrada: Date, dataSaida: Date): void {
    this.tripulanteService.adicionarTripulante({
      numeroMecanografico: parseInt(numeroMecanografico),
      nome: nome, dataNascimento: dataNascimento, numeroCartaoCidadao: parseInt(numeroCartaoCidadao),nif: parseInt(nif),
      turno: turno, tipoTripulanteId: tipoTripulanteDomainId, dataEntrada: dataEntrada, dataSaida: dataSaida
    } as Tripulante)
      .subscribe(tripulante => {
        this.tripulantes.push(tripulante);
      });
  }

  verificaNumeroMecanografico(numeroMecanografico: string): void {
    this.tripulanteService.verificaNumeroMecanografico({ numeroMecanografico: parseInt(numeroMecanografico) } as Tripulante).subscribe(
      () => {
        this.message.numeroMecanografico = this.valide;
        this.validatePercurso.numeroMecanografico = true;
      }, err => {
        this.message.numeroMecanografico = err;
        this.validatePercurso.numeroMecanografico = false;
      });
  }

  verificaNome(nome: string): void {
    this.tripulanteService.verificaNome({ nome: nome } as Tripulante).subscribe(
      () => {
        this.message.nome = this.valide;
        this.validatePercurso.nome = true;
      }, err => {
        this.message.nome = err;
        this.validatePercurso.nome = false;
      });
  }

  verificaDataNascimento(dataNascimento: Date):void {
    this.tripulanteService.verificaDataNascimento({ dataNascimento: dataNascimento } as Tripulante).subscribe(
      () => {
        this.message.dataNascimento = this.valide;
        this.validatePercurso.dataNascimento = true;
      }, err => {
        this.message.dataNascimento = err;
        this.validatePercurso.dataNascimento = false;
      });
  }

  verificaNumeroCartaoCidadao(numeroCartaoCidadao: string):void {
    this.tripulanteService.verificaNumeroCartaoCidadao({ numeroCartaoCidadao: parseInt(numeroCartaoCidadao) } as Tripulante).subscribe(
      () => {
        this.message.numeroCartaoCidadao = this.valide;
        this.validatePercurso.numeroCartaoCidadao = true;
      }, err => {
        this.message.numeroCartaoCidadao = err;
        this.validatePercurso.numeroCartaoCidadao = false;
      });
  }


  verificaNif(nif: string):void {
    this.tripulanteService.verificaNif({ nif: parseInt(nif) } as Tripulante).subscribe(
      () => {
        this.message.nif = this.valide;
        this.validatePercurso.nif = true;
      }, err => {
        this.message.nif = err;
        this.validatePercurso.nif = false;
      });
  }


  getTiposTripulante(): void {
    this.tipoTripulanteService.getTiposTripulante().subscribe(
      (tiposTripulante) => {
        this.tiposTripulante = tiposTripulante;
      }
    );
  }

  getTurnos(): void {
    this.turnos = this.tripulanteService.getTurnos();
  }

  verificaDataSaida(dataEntrada:Date,dataSaida: Date): void {
    this.tripulanteService.verificaDataSaida({dataEntrada:dataEntrada,dataSaida:dataSaida} as Tripulante).subscribe(
      () => {
        this.message.dataSaida = this.valide;
        this.validatePercurso.dataSaida = true;
      }, err => {
        this.message.dataSaida = err;
        this.validatePercurso.dataSaida = false;
      });
  }

  clearMessageTripulante() {
    this.message = {
      numeroMecanografico:'',
      nome: '',
      dataNascimento: '',
      numeroCartaoCidadao: '',
      nif:'',
      dataEntrada:'',
      dataSaida:''
    };
  }

}
