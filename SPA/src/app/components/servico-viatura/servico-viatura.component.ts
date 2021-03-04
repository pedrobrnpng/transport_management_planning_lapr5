import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import BlocoTrabalho from 'src/app/models/blocoTrabalho';
import Viatura from 'src/app/models/viatura';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { ServicoViaturaService } from 'src/app/services/servico-viatura.service';
import { ViaturaService } from 'src/app/services/viatura.service';
import ServicoViatura from '../../models/servicoViatura';

@Component({
  selector: 'app-servico-viatura',
  templateUrl: './servico-viatura.component.html',
  styleUrls: ['./servico-viatura.component.css']
})
export class ServicoViaturaComponent implements OnInit {

  viaturas: Viatura[] = [];
  blocosTrabalho: BlocoTrabalho[] = [];
  servicosViatura: ServicoViatura[] = [];
  userSelectsString = '';
  blocosTrabalhoSelecionados = [];
  message = {
    nome: '',
    cor: '',
    viaturaId: '',
    listaBlocosTrabalho: ''
  };

  validateSViatura = {
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

  constructor(private servicoViaturaService: ServicoViaturaService,
    private viaturaService: ViaturaService,
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
    this.getViaturas();
  }

  adicionarServicoViatura(viaturaId: string, codigo: string,
    cor: string) {
    var tstr:string=cor.toString()
    var rs=tstr.substring(1,3)
    var gs=tstr.substring(5,7)
    var bs=tstr.substring(3,5)
    var r=parseInt(rs,16)
    var g=parseInt(gs,16)
    var b=parseInt(bs,16)
    var rgb="RGB("+r+","+b+","+g+")"
    this.servicoViaturaService.adicionarServicoViatura({
      nome: codigo,
      cor: rgb, depots: "isDepot", viatura: viaturaId, blocos: this.blocosTrabalhoSelecionados.map(b => b.codigo)
    } as ServicoViatura).subscribe(servicoViatura => {
      this.servicosViatura.push(servicoViatura);
      this.getBlocosTrabalho();
    });
  }

  verificaCodigo(nome: string): void {
    this.servicoViaturaService.verificaCodigo({ nome: nome } as ServicoViatura).subscribe(
      () => {
        this.message.nome = this.valide;
        this.validateSViatura.nome = true;
      }, err => {
        this.message.nome = err;
        this.validateSViatura.nome = false;
      });
  }

  getBlocosTrabalho(): void {
    this.blocoTrabalhoService.getBlocosTrabalhoSemSV().subscribe(
      (blocos) => {
        this.blocosTrabalho = blocos;
      }
    );
  }

  getViaturas() {
    this.viaturaService.getViaturas().subscribe(
      (viaturas) => {
        this.viaturas = viaturas;
      }
    );
  }

  clearMessage() {
    this.message = {
      nome: '',
      cor: '',
      viaturaId: '',
      listaBlocosTrabalho: ''
    };
    this.blocosTrabalhoSelecionados=[];
  }

  isSelected(s: any) {
    return this.blocosTrabalhoSelecionados.findIndex((item) => item.codigo === s.codigo) > -1 ? true : false;
  }

  selectSuggestion(s) {
    this.blocosTrabalhoSelecionados.find((item) => item.codigo === s.codigo) ?
      this.blocosTrabalhoSelecionados = this.blocosTrabalhoSelecionados.filter((item) => item.codigo !== s.codigo) :
      this.blocosTrabalhoSelecionados.push(s);
  }

  deleteSelects(s) {
    this.blocosTrabalhoSelecionados = this.blocosTrabalhoSelecionados.filter((item) => item.codigo !== s.codigo);
    this.servicoViaturaService.verificaBlocosTrabalho(this.blocosTrabalhoSelecionados).subscribe(
      () => {
        this.message.listaBlocosTrabalho = this.valide;
        this.validateSViatura.listaBlocosTrabalho = true;
      }, err => {
        this.message.listaBlocosTrabalho = err;
        this.validateSViatura.listaBlocosTrabalho = false;
      });
  }

}
