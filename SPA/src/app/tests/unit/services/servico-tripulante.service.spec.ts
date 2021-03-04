import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import ServicoTripulante  from '../../../models/servicoTripulante';

import { ServicoTripulanteService } from '../../../services/servico-tripulante.service';

describe('Service: ServicoTripulante', () => {
    let servicoTripulanteService: ServicoTripulanteService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({tripulanteDomainId: "1",nome: "Teste",cor:"RGB(10,10,10)"} as ServicoTripulante));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ServicoTripulanteService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });


    beforeEach(inject([ServicoTripulanteService], (service: ServicoTripulanteService) => {
      servicoTripulanteService = service;
    }));

    it('should be defined', () => {
      expect(servicoTripulanteService).toBeTruthy();
    });

    it('should post ServicoTripulante using http request', () => {
        const servicoTripulante= {tripulanteDomainId: "1",nome: "Teste",cor:"RGB(10,10,10)"} as ServicoTripulante;
        var result !: ServicoTripulante;
        servicoTripulanteService.adicionarServicoTripulante(servicoTripulante).subscribe(servicoTripulante=> {
            result=servicoTripulante;
        })
        expect(result).toEqual(servicoTripulante);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
