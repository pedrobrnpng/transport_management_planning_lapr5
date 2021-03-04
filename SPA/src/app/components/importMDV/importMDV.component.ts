import { Component, OnInit } from '@angular/core';
import { ImportarDadosMDVService } from 'src/app/services/importarDadosMDV.service';
import { MessageService } from 'src/app/services/message.service';
import importMDV from '../../models/importMDV';

@Component({
  selector: 'app-importMDV',
  templateUrl: './importMDV.component.html',
  styleUrls: ['./importMDV.component.css']
})
export class ImportMDVComponent implements OnInit {

  fileToUpload:File=null
  importString:string=""
  loading = false

  constructor(private importarDadosService: ImportarDadosMDVService,public messageService:MessageService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  importarDados() {
    this.loading=true;
    if (!this.fileToUpload.name.endsWith(".glx")) this.messageService.log("São só permitidos ficheiros .glx. Por favor selecione um ficherio válido.")
    else 
      this.importarDadosService.importarDados(this.fileToUpload)
      .subscribe(str => { this.importString=str.input; this.loading=false; }, error => { console.log(error); this.loading=false; });
  }
}
