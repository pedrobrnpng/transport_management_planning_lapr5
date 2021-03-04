import { Component, OnInit } from '@angular/core';
import ServicoTripulante from 'src/app/models/ServicoTripulante';
import BlocoTrabalho from 'src/app/models/blocoTrabalho';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { MessageService } from 'src/app/services/message.service';
import { ServicoTripulanteService } from 'src/app/services/servico-tripulante.service';

@Component({
  selector: 'app-list-st',
  templateUrl: './list-st.component.html',
  styleUrls: ['./list-st.component.css']
})
export class ListStComponent implements OnInit {
  data: Date = null;
  sts: ServicoTripulante[] = [];
  stsStr: string[] = [];
  message = {
    data: '',
    tabela: ''
  };

  constructor(private stService:ServicoTripulanteService, private messageService:MessageService, private btService:BlocoTrabalhoService) { }

  ngOnInit(): void {
    this.getServicosTripulante()
  }

  async getServicosTripulante() {
    this.message.tabela=''
    this.messageService.clear()
    this.stsStr=[]
    if (this.data==null) {
      this.sts=await this.getSTsSemData()
    } else {
      this.sts=await this.getSTsComData()
    }
    for (const st of this.sts) {
      var str = "Código: "+st.nome+", Tripulante: "+st.tripulanteDomainId
      if (st.blocosTrabalho.length!=0) {
        str+=", Blocos: "+st.blocosTrabalho+" "
        var horas = await this.getHoras(st)
        str+=horas
      }
      this.stsStr.push(str);
    }
  }

  setData(data:string) {
      if (data=="")
        this.data=null;
      else
        this.data=new Date(data);
  }

  async getHoras(st:ServicoTripulante) {
    var result=""
    if (st.blocosTrabalho.length==0)
      return result

    var blocoI=await this.getBlocoTrabalho(st.blocosTrabalho[0])
    var blocoF=await this.getBlocoTrabalho(st.blocosTrabalho[st.blocosTrabalho.length-1])
    var horaI=this.btService.parseHora(blocoI.horaInicio)
    var horaF=this.btService.parseHora(blocoF.horaFim)
    result="("+horaI+" - "+horaF+")"
    return result
  }

  async getSTsSemData() {
    return this.stService.getServicosTripulante().toPromise();
  }

  async getSTsComData() {
    return this.stService.getServicosTripulanteByDate(this.data).toPromise();
  }

  async getBlocoTrabalho(codigo:string) {
    return this.btService.getBlocoTrabalho(parseInt(codigo)).toPromise();
  }

}
