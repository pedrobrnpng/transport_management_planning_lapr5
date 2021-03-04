import { Component, OnInit } from '@angular/core';
import { ImportarDadosMDRService } from 'src/app/services/importarDadosMDR.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-importMDR',
  templateUrl: './importMDR.component.html',
  styleUrls: ['./importMDR.component.css']
})
export class ImportMDRComponent implements OnInit {

  fileToUpload:File=null
  importString:string=""

  constructor(private importarDadosService: ImportarDadosMDRService,public messageService:MessageService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  importarDados() {
    if (!this.fileToUpload.name.endsWith(".glx")) this.messageService.log("São só permitidos ficheiros .glx. Por favor selecione um ficherio válido.")
    else 
      this.importarDadosService.importarDados(this.fileToUpload)
      .subscribe(str => this.importString=str, error => { console.log(error) });
  }
}
