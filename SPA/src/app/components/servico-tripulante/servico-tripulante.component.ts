import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import BlocoTrabalho from 'src/app/models/blocoTrabalho';
import Tripulante from 'src/app/models/tripulante';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { ServicoTripulanteService } from 'src/app/services/servico-tripulante.service';
import { TripulanteService } from 'src/app/services/tripulante.service';
import ServicoTripulante from '../../models/ServicoTripulante';

@Component({
  selector: 'app-servico-tripulante',
  templateUrl: './servico-tripulante.component.html',
  styleUrls: ['./servico-tripulante.component.css']
})
export class ServicoTripulanteComponent implements OnInit {

  tripulantes: Tripulante[] = [];
  blocosTrabalho: BlocoTrabalho[] = [];
  servicosTripulante: ServicoTripulante[] = [];
  userSelectsString = '';
  blocosTrabalhoSelecionados = [];
  message = {
    tripulanteId: '',
    nome: '',
    cor: '',
    listaBlocosTrabalho: ''
  };

  validatePercurso = {
    tripulanteId: false,
    nome: false,
    cor: false,
    listaBlocosTrabalho: false
  };

  show: boolean = false;

  suggest() {
    this.show = true;
  }

  private valide = '✔';

  @ViewChild('elem ') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  constructor(private servicoTripulanteService: ServicoTripulanteService,
    private tripulantesService: TripulanteService,
    private blocoTrabalhoService: BlocoTrabalhoService,
    private rend: Renderer2) {
    this.rend.listen('window', 'click', (e: Event) => {
      if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
        this.show = false;
      }
    });
  }

  ngOnInit(): void {
    this.getBlocosTrabalho();
    this.getTripulantes();
  }

  adicionarServicoTripulante(tripulanteTid: string, codigo: string,
    cor: string) {
    var tstr: string = cor.toString()
    var rs = tstr.substring(1, 3)
    var gs = tstr.substring(5, 7)
    var bs = tstr.substring(3, 5)
    var r = parseInt(rs, 16)
    var g = parseInt(gs, 16)
    var b = parseInt(bs, 16)
    var rgb = "RGB(" + r + "," + b + "," + g + ")"
    this.servicoTripulanteService.adicionarServicoTripulante({
      tripulanteDomainId: tripulanteTid, nome: codigo,
      cor: rgb, blocosTrabalho: this.blocosTrabalhoSelecionados.map(b => b.codigo)
    } as ServicoTripulante).subscribe(servicoTripulante => {
      this.servicosTripulante.push(servicoTripulante);
      this.getBlocosTrabalho();
    });
  }

  verificaCodigo(nome: string): void {
    this.servicoTripulanteService.verificaCodigo({ nome: nome } as ServicoTripulante).subscribe(
      () => {
        this.message.nome = this.valide;
        this.validatePercurso.nome = true;
      }, err => {
        this.message.nome = err;
        this.validatePercurso.nome = false;
      });
  }

  getBlocosTrabalho(): void {
    this.blocoTrabalhoService.getBlocosTrabalhoSemST().subscribe(
      (blocos) => {
        this.blocosTrabalho = blocos;
      }
    );
  }

  getTripulantes() {
    this.tripulantesService.getTripulantes().subscribe(
      (tripulantes) => {
        this.tripulantes = tripulantes;
      }
    );
  }

  clearMessage() {
    this.message = {
      tripulanteId: '',
      nome: '',
      cor: '',
      listaBlocosTrabalho: ''
    };
    this.blocosTrabalhoSelecionados = [];
  }

  isSelected(s: any) {
    return this.blocosTrabalhoSelecionados.findIndex((item) => item.codigo === s.codigo) > -1 ? true : false;
  }

  selectSuggestion(s) {
    this.blocosTrabalhoSelecionados.find((item) => item.codigo === s.codigo) ?
      this.blocosTrabalhoSelecionados = this.blocosTrabalhoSelecionados.filter((item) => item.codigo !== s.codigo) :
      this.blocosTrabalhoSelecionados.push(s);
    this.servicoTripulanteService.verificaBlocosTrabalho(this.blocosTrabalhoSelecionados).subscribe(
      () => {
        this.message.listaBlocosTrabalho = this.valide;
        this.validatePercurso.listaBlocosTrabalho = true;
      }, err => {
        this.message.listaBlocosTrabalho = err;
        this.validatePercurso.listaBlocosTrabalho = false;
      });
  }

  deleteSelects(s) {
    this.blocosTrabalhoSelecionados = this.blocosTrabalhoSelecionados.filter((item) => item.codigo !== s.codigo);
    this.servicoTripulanteService.verificaBlocosTrabalho(this.blocosTrabalhoSelecionados).subscribe(
      () => {
        this.message.listaBlocosTrabalho = this.valide;
        this.validatePercurso.listaBlocosTrabalho = true;
      }, err => {
        this.message.listaBlocosTrabalho = err;
        this.validatePercurso.listaBlocosTrabalho = false;
      });
  }

}
