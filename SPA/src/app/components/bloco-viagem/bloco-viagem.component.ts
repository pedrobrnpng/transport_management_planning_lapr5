import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import BlocoViagens from 'src/app/models/blocoViagens';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { ViagemService } from 'src/app/services/viagem.service';
import BlocoTrabalho from 'src/app/models/blocoTrabalho';

@Component({
  selector: 'app-bloco-viagem',
  templateUrl: './bloco-viagem.component.html',
  styleUrls: ['./bloco-viagem.component.css']
})
export class BlocoViagemComponent implements OnInit {
  blocos: BlocoTrabalho[] = [];
  bloco: BlocoTrabalho = {
    codigo: 0,
    horaInicio: 0,
    horaFim: 0,
    noInicio: '',
    noFim: '',
    ctt: true
  };
  viagens: number[] = [];
  viagensStr: string[] = [];
  viagem = 0;
  blocoViagens: BlocoViagens = {
    viagens: []
  };
  blocoViagensStr: string[] = []
  message = {
    viagem: ''
  };

  validateBlocoViagem = {
    viagem: false
  };


  constructor(private blocoService: BlocoTrabalhoService, private viagemService: ViagemService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getBlocos();
  }

  getBlocos(): void {
    this.blocoService.getBlocosTrabalho().subscribe((blocos) => {
      this.blocos = blocos;
    });
  }

  setCodigo(str: string) {
    this.bloco.codigo = parseInt(str.split(":")[1].trim());
  }

  setViagemCodigo(codigo: number) {
    this.viagem = codigo;
  }

  async fillTable() {
    this.blocoViagensStr=[]
    this.viagensStr=[]
    this.blocoViagens.viagens = await this.getBlocoViagens();
    await this.getViagens();

    for (const blocoViagem of this.blocoViagens.viagens) {
      var str=""
      var viagem = await this.getViagem(blocoViagem)
      if (viagem != null) {
        str+="Código: "+viagem.codigo+", Hora início: "+viagem.horaInicio+", Linha: "+viagem.linha+", Percurso: "+viagem.idPercurso
      }
      this.blocoViagensStr.push(str)
    }

    for (const viagem of this.viagens) {
      var str=""
      var viagemFull = await this.getViagem(viagem)
      if (viagemFull != null) {
        str+="Código: "+viagemFull.codigo+", Hora início: "+viagemFull.horaInicio+", Linha: "+viagemFull.linha+", Percurso: "+viagemFull.idPercurso
      }
      this.viagensStr.push(str)
    }
  }

  async getBlocoViagens() {
    var blocoViagens = await this.blocoService.getBlocosViagens(this.bloco.codigo).toPromise();
    if (blocoViagens != null) {
      return blocoViagens.viagens
    }
    else {
      return [];
    }
  }

  async getViagens() {
    this.viagens = [];
    var viagens = await this.blocoService.getViagensPossiveis(this.bloco.codigo).toPromise()
    viagens.viagens.forEach(viagem => {
      if (!this.blocoViagens.viagens.includes(viagem)) {
        this.viagens.push(viagem);
      }
    });
  }

  async getViagem(codigo:number) {
    return await this.viagemService.getViagem(codigo).toPromise();
  }

  async adicionarBlocoViagem(viagem: string) {
    
    var index=this.viagensStr.indexOf(viagem)
    if (index==-1) {
      this.messageService.log('Erro na criação de bloco de viagem');
      return
    }

    var viagemCod = this.viagens[index]
    if (viagemCod != 0) {
      var result= await this.blocoService.adicionarViagemABloco(this.bloco.codigo, viagemCod).toPromise()
      if (result!=null) {
        this.messageService.log('Viagem adicionada com sucesso');
        this.removeOptions(document.getElementById('idViagem'));
      } else {
        this.messageService.log('Erro na criação de bloco de viagem');
      }
    } else {
        this.messageService.log('Todos os valores necessitam de estar válidos');
    }
    await this.fillTable()
  }

  removeOptions(selectElement) {
    let i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
  }

  parseHora(hora:number) {
    return this.blocoService.parseHora(hora)
  }
}
