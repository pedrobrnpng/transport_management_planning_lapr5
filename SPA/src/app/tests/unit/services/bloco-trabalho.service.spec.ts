import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import BlocoTrabalho  from '../../../models/blocoTrabalho';

import { BlocoTrabalhoService } from '../../../services/bloco-trabalho.service';

describe('Service: BlocoTrabalho', () => {
    let blocoTrabalhoService: BlocoTrabalhoService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({codigo: 1,horaInicio: 1, horaFim: 2, noInicio:"1", noFim:"2",ctt:true} as BlocoTrabalho));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [BlocoTrabalhoService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });


    beforeEach(inject([BlocoTrabalhoService], (service: BlocoTrabalhoService) => {
        blocoTrabalhoService = service;
    }));

    it('should be defined', () => {
      expect(blocoTrabalhoService).toBeTruthy();
    });

    it('should post BlocoTrabalho using http request', () => {
        const blocoTrabalho= {codigo: 1,horaInicio: 1, horaFim: 2, noInicio:"1", noFim:"2",ctt:true} as BlocoTrabalho;
        var result !: BlocoTrabalho;
        blocoTrabalhoService.adicionarBlocoTrabalho(blocoTrabalho).subscribe(blocoTrabalho=> {
            result=blocoTrabalho;
        })
        expect(result).toEqual(blocoTrabalho);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
