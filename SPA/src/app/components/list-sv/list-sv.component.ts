import { Component, OnInit } from '@angular/core';
import ServicoViatura from 'src/app/models/servicoViatura';
import BlocoTrabalho from 'src/app/models/blocoTrabalho';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { MessageService } from 'src/app/services/message.service';
import { ServicoViaturaService } from 'src/app/services/servico-viatura.service';

@Component({
  selector: 'app-list-sv',
  templateUrl: './list-sv.component.html',
  styleUrls: ['./list-sv.component.css']
})
export class ListSvComponent implements OnInit {
  data: Date = null;
  svs: ServicoViatura[] = [];
  svsStr: string[] = [];
  message = {
    data: '',
    tabela: ''
  };

  constructor(private svService:ServicoViaturaService, private messageService:MessageService, private btService:BlocoTrabalhoService) { }

  ngOnInit(): void {
    this.getServicosViatura()
  }

  async getServicosViatura() {
    this.message.tabela=''
    this.messageService.clear()
    this.svsStr=[]
    if (this.data==null) {
      this.svs=await this.getSVsSemData()
    } else {
      this.svs=await this.getSVsComData()
    }
    for (const sv of this.svs) {
      var str = "Código: "+sv.nome+", Viatura: "+sv.viatura
      if (sv.blocos.length!=0) {
        str+=", Blocos: "+sv.blocos+" "
        var horas = await this.getHoras(sv)
        str+=horas
      }
      this.svsStr.push(str);
    }
  }

  setData(data:string) {
      if (data=="")
        this.data=null;
      else
        this.data=new Date(data);
  }

  async getHoras(st:ServicoViatura) {
    var result=""
    if (st.blocos.length==0)
      return result

    var blocoI=await this.getBlocoTrabalho(st.blocos[0])
    var blocoF=await this.getBlocoTrabalho(st.blocos[st.blocos.length-1])
    var horaI=this.parseHora(blocoI.horaInicio)
    var horaF=this.parseHora(blocoF.horaFim)
    result="("+horaI+" - "+horaF+")"
    return result
  }

  parseHora(hora:number) {
    var result=""
    var horas=Math.floor(hora/3600);
    var minutos=Math.floor((hora%3600)/60)
    var segundos=(hora%3600)%60
    
    if (horas<10)
      result+="0"+horas+":"
    else
      result+=horas+":"

    if (minutos<10)
      result+="0"+minutos+":"
    else
      result+=minutos+":"

    if (segundos<10)
      result+="0"+segundos
    else
      result+=segundos

    return result
  }

  async getSVsSemData() {
    return this.svService.getServicosViatura().toPromise();
  }

  async getSVsComData() {
    return this.svService.getServicosViaturaByDate(this.data).toPromise();
  }

  async getBlocoTrabalho(codigo:string) {
    return this.btService.getBlocoTrabalho(parseInt(codigo)).toPromise();
  }

}
