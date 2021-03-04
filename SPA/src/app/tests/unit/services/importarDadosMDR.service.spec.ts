import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';

import { ImportarDadosMDRService } from '../../../services/importarDadosMDR.service';

describe('Service: ImportarDados', () => {
    let importarService: ImportarDadosMDRService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of("Adicionados/atualizados: - 0 Tipo(s) de Viatura; - 0 Nó(s); - 0 Percurso(s); - 0 Linha(s); - 0 Tipo(s) de Tripulante; Erros: 0"));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ImportarDadosMDRService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });
  
  
    beforeEach(inject([ImportarDadosMDRService], (service: ImportarDadosMDRService) => {
        importarService = service;
    }));
  
    it('should be defined', () => {
      expect(importarService).toBeTruthy();
    });
  
    it('should post file using http request', () => {
        const expected= "Adicionados/atualizados: - 0 Tipo(s) de Viatura; - 0 Nó(s); - 0 Percurso(s); - 0 Linha(s); - 0 Tipo(s) de Tripulante; Erros: 0";
        var result !: string;
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