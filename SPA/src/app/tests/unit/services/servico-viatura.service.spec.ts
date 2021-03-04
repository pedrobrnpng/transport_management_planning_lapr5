import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import ServicoViatura  from '../../../models/servicoViatura';

import { ServicoViaturaService } from '../../../services/servico-viatura.service';

describe('Service: ServicoViatura', () => {
    let servicoViaturaService: ServicoViaturaService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({nome: "Teste",cor:"RDB(10,10,10)",depots:"Teste",viatura:"11-11-GH",blocos:["1"]} as ServicoViatura));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ServicoViaturaService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });


    beforeEach(inject([ServicoViaturaService], (service: ServicoViaturaService) => {
      servicoViaturaService = service;
    }));

    it('should be defined', () => {
      expect(servicoViaturaService).toBeTruthy();
    });

    it('should post ServicoViatura using http request', () => {
        const servicoViatura= {nome: "Teste",cor:"RDB(10,10,10)",depots:"Teste",viatura:"11-11-GH",blocos:["1"]} as ServicoViatura;
        var result !: ServicoViatura;
        servicoViaturaService.adicionarServicoViatura(servicoViatura).subscribe(servicoViatura=> {
            result=servicoViatura;
        })
        expect(result).toEqual(servicoViatura);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
