import { Component, OnInit } from '@angular/core';
import Linha from 'src/app/models/linha';
import Percurso from 'src/app/models/percurso';
import { Viagem } from 'src/app/models/viagem';
import { LinhaService } from 'src/app/services/linha.service';
import { PercursoService } from 'src/app/services/percurso.service';
import { ViagemService } from 'src/app/services/viagem.service';

@Component({
  selector: 'app-list-horarios',
  templateUrl: './list-horarios.component.html',
  styleUrls: ['./list-horarios.component.css']
})
export class ListHorariosComponent implements OnInit {

  viagensList: Viagem[] = [];
  linhas: Linha[] = [];
  percursosList: Percurso[] = [];

  constructor(private viagemService: ViagemService, private percursoService: PercursoService, private linhaService: LinhaService) { }

  ngOnInit(): void {
    this.getLinhas();
    this.getViagens();
    this.getPercursos();
  }

  getViagens(): void {
    this.viagemService.getViagens().subscribe(
      (viagens) => {
        this.viagensList = viagens.sort((x, y) => { return x.codigo - y.codigo });
      }
    )
  }

  getLinhaAux(idLinha: string): String {
    var nome;
    this.linhas.forEach(element => {
      if (element.id == idLinha)
        nome = element.nome;
    });
    return nome;
  }

  getPercursoAux(idPercurso: string): String {
    var nome;
    this.percursosList.forEach(element => {
      if (element.id == idPercurso)
        nome = this.getSegmentos(element);
    });
    return nome;
  }

  getSegmentos(percurso: Percurso): string {
    var str = '';
    for (let sg of percurso.segmentosRede) {
      str += sg.idNoInicio + ' - ';
    }
    str += percurso.segmentosRede[percurso.segmentosRede.length - 1].idNoFim;
    return str;
  }

  getLinhas(): void {
    this.linhaService.getLinhas().subscribe(
      (linhas) => {
        this.linhas = linhas;
      }
    );
  }

  getPercursos(): void {
    this.percursoService.percursosOrdenadosPorLinha().subscribe(
      (percursos) => {
        this.percursosList = percursos;
        this.viagensList.sort((x,y) => (this.getLinhaAux(x.linha) > this.getLinhaAux(y.linha)) ? -1 : 1)
      }
    );
  }

}
