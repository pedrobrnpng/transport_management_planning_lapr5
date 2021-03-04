import { Component, OnInit } from '@angular/core';
import Percurso from 'src/app/models/percurso';
import Linha from 'src/app/models/linha';
import { Viagem, Viagens } from 'src/app/models/viagem';
import { MessageService } from 'src/app/services/message.service';
import { PercursoService } from 'src/app/services/percurso.service';
import { ViagemService } from 'src/app/services/viagem.service';
import { LinhaService } from 'src/app/services/linha.service';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {

  percursos: Percurso[] = [];

  percursosIda: Percurso[] = [];

  percursosVolta: Percurso[] = [];

  linhas: Linha[] = [];

  viagensList: Viagem[] = [];

  percursosList: Percurso[] = [];

  viagem: Viagem = {
    horaInicio: new Date(),
    linha: '',
    idPercurso: '',
  };

  validadeViagem = {
    horaInicio: false,
    linha: false,
    idPercurso: false,
  };

  messageViagem = {
    horaInicio: '',
    linha: '',
    idPercurso: '',
  };

  viagens: Viagens = {
    horaInicio: new Date(),
    frequencia: null,
    nViagens: null,
    idPercursoIda: null,
    idPercursoVolta: null
  };

  validadeViagens = {
    horaInicio: false,
    frequencia: false,
    nViagens: false,
    idPercursoIda: false,
    idPercursoVolta: false
  };

  messageViagens = {
    horaInicio: '',
    frequencia: '',
    nViagens: '',
    idPercursoIda: '',
    idPercursoVolta: ''
  };

  private valide = '✔';

  constructor(public viagemService: ViagemService,
    private messageService: MessageService,
    private percursoService: PercursoService,
    private linhaService: LinhaService) { }

  ngOnInit(): void {
    this.getLinhas();
    this.getPercursosViagens();
    this.getViagens();
    this.getAllPercursos();
  }

  adicionarViagem(): void {
    if (this.validadeViagem.horaInicio &&
      this.validadeViagem.linha &&
      this.validadeViagem.idPercurso) {
      this.viagemService.adicionarViagem(this.viagem).subscribe(
        (viagem) => {
          this.viagensList.push(viagem)
          this.esvaziarViagem()
        }
      );
    } else {
      this.messageService.log('Todos os valores necessitam de estar válidos');
    }
  }

  adicionarViagens(): void {
    if (this.validadeViagens.horaInicio &&
      this.validadeViagens.frequencia &&
      this.validadeViagens.nViagens) {
      this.viagemService.adicionarViagens(this.viagens).subscribe(() => this.esvaziarViagens());
    } else {
      this.messageService.log('Todos os valores necessitam de estar válidos');
    }
  }

  verificarHorarioViagem(): void {
    this.viagemService.verificarHoraInicio(this.viagem.horaInicio).subscribe(
      () => {
        this.messageViagem.horaInicio = this.valide;
        this.validadeViagem.horaInicio = true;
      }, err => {
        this.messageViagem.horaInicio = err;
        this.validadeViagem.horaInicio = false;
      });
  }

  verificarHorarioViagens(): void {
    this.viagemService.verificarHoraInicio(this.viagens.horaInicio).subscribe(
      () => {
        this.messageViagens.horaInicio = this.valide;
        this.validadeViagens.horaInicio = true;
      }, err => {
        this.messageViagens.horaInicio = err;
        this.validadeViagens.horaInicio = false;
      });
  }

  verificarFrequencia(): void {
    this.viagemService.verificarFrequencia(this.viagens.frequencia).subscribe(
      () => {
        this.messageViagens.frequencia = this.valide;
        this.validadeViagens.frequencia = true;
      }, err => {
        this.messageViagens.frequencia = err;
        this.validadeViagens.frequencia = false;
      });
  }

  verificarNViagens(): void {
    this.viagemService.verificarNViagens(this.viagens.nViagens).subscribe(
      () => {
        this.messageViagens.nViagens = this.valide;
        this.validadeViagens.nViagens = true;
      }, err => {
        this.messageViagens.nViagens = err;
        this.validadeViagens.nViagens = false;
      });
  }

  verificarLinha(): void {
    this.viagemService.verificarLinha(this.viagem.linha).subscribe(
      () => {
        this.messageViagem.linha = this.valide;
        this.validadeViagem.linha = true;
      }, err => {
        this.messageViagem.linha = err;
        this.validadeViagem.linha = false;
      });
  }

  verificarPercurso(): void {
    this.viagemService.verificarPercurso(this.viagem.idPercurso).subscribe(
      () => {
        this.messageViagem.idPercurso = this.valide;
        this.validadeViagem.idPercurso = true;
      }, err => {
        this.messageViagem.idPercurso = err;
        this.validadeViagem.idPercurso = false;
      });
  }

  verificarPercursoIda(): void {
    this.viagemService.verificarPercurso(this.viagens.idPercursoIda).subscribe(
      () => {
        this.messageViagens.idPercursoIda = this.valide;
        this.validadeViagens.idPercursoIda = true;
      }, err => {
        this.messageViagens.idPercursoIda = err;
        this.validadeViagens.idPercursoIda = false;
      });
  }

  verificarPercursoVolta(): void {
    this.viagemService.verificarPercurso(this.viagens.idPercursoVolta).subscribe(
      () => {
        this.messageViagens.idPercursoVolta = this.valide;
        this.validadeViagens.idPercursoVolta = true;
      }, err => {
        this.messageViagens.idPercursoVolta = err;
        this.validadeViagens.idPercursoVolta = false;
      });
  }

  getPercursos(): void {
    this.percursoService.percursosOrdenadosPorLinha().subscribe(
      (percursos) => {
        percursos.forEach((value) => {
          if (value.idLinha === this.viagem.linha) {
            this.percursos.push(value);
          }
        });
      }
    );
  }

  getPercursosViagens(): void {
    this.percursoService.percursosOrdenadosPorLinha().subscribe(
      (percursos) => {
        percursos.forEach((value) => {
          if (value.direcao === 'ida') {
            this.percursosIda.push(value);
          }
          if (value.direcao === 'volta') {
            this.percursosVolta.push(value);
          }
        });
      }
    );
  }

  getLinhas(): void {
    this.linhaService.getLinhas().subscribe(
      (linhas) => {
        this.linhas = linhas;
      }
    );
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

  getAllPercursos(): void {
    this.percursoService.percursosOrdenadosPorLinha().subscribe(
      (percursos) => {
        this.percursosList = percursos;
      }
    );
  }

  private esvaziarViagem(): void {
    this.viagem = {
      horaInicio: new Date(),
      linha: '',
      idPercurso: '',
    };

    this.validadeViagem = {
      horaInicio: false,
      linha: false,
      idPercurso: false,
    };

    this.messageViagem = {
      horaInicio: '',
      linha: '',
      idPercurso: '',
    };
  }

  private esvaziarViagens(): void {
    this.viagens = {
      horaInicio: new Date(),
      frequencia: null,
      nViagens: null,
      idPercursoIda: null,
      idPercursoVolta: null
    };

    this.validadeViagens = {
      horaInicio: false,
      frequencia: false,
      nViagens: false,
      idPercursoIda: false,
      idPercursoVolta: false
    };

    this.messageViagens = {
      horaInicio: '',
      frequencia: '',
      nViagens: '',
      idPercursoIda: '',
      idPercursoVolta: ''
    };
  }

}
