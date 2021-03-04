import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import { TipoTripulante } from '../../../models/tipoTripulante';

import { TipoTripulanteService } from '../../../services/tipo-tripulante.service';

describe('Service: TipoTripulante', () => {
    let tipoTripulanteService: TipoTripulanteService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({id:"tp1",description:"Fala inglês"} as TipoTripulante));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TipoTripulanteService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });


    beforeEach(inject([TipoTripulanteService], (service: TipoTripulanteService) => {
      tipoTripulanteService = service;
    }));

    it('should be defined', () => {
      expect(tipoTripulanteService).toBeTruthy();
    });

    it('should post TipoTripulante using http request', () => {
        const tipoTripulante= {id:"tp1",description:"Fala inglês"} as TipoTripulante;
        var result !: TipoTripulante;
        tipoTripulanteService.adicionarTipoTripulante(tipoTripulante).subscribe(tipoTripulante=> {
            result=tipoTripulante;
        })
        expect(result).toEqual(tipoTripulante);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
