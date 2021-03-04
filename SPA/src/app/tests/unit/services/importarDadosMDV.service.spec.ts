import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';

import ImportMDV from '../../../models/importMDV'
import { ImportarDadosMDVService } from '../../../services/importarDadosMDV.service';

describe('Service: ImportarDados', () => {
    let importarService: ImportarDadosMDVService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({input:"Adicionados/atualizados: - 0 Viagem(s); - 0 Bloco(s) de Trabalho; - 0 Serviço(s) de Tripulante; - 0 Serviço(s) de Viatura; Erros: 0"} as ImportMDV));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ImportarDadosMDVService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });
  
  
    beforeEach(inject([ImportarDadosMDVService], (service: ImportarDadosMDVService) => {
        importarService = service;
    }));
  
    it('should be defined', () => {
      expect(importarService).toBeTruthy();
    });
  
    it('should post file using http request', () => {
        const expected= {input:"Adicionados/atualizados: - 0 Viagem(s); - 0 Bloco(s) de Trabalho; - 0 Serviço(s) de Tripulante; - 0 Serviço(s) de Viatura; Erros: 0"} as ImportMDV;
        var result !: ImportMDV;
        var file:File=new File(["foo"], "foo.txt", {
          type: "text/plain",
        });;
        importarService.importarDados(file).subscribe(str=> {
            result=str;
        })
        expect(result).toEqual(expected);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });