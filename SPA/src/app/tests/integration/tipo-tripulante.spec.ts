import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import { TipoTripulanteComponent } from 'src/app/components/tipo-tripulante/tipo-tripulante.component';
import { TipoTripulante } from '../../models/tipoTripulante';

import { TipoTripulanteService } from '../../services/tipo-tripulante.service';

describe('Service: TipoTripulante', () => {
    let tipoTripulanteComponent: TipoTripulanteComponent;
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
      tipoTripulanteComponent= new TipoTripulanteComponent(tipoTripulanteService);
    }));

    it('should be defined', () => {
      expect(tipoTripulanteComponent).toBeTruthy();
    });

    it('tipo tripulante component should run', () => {
        const tp1 = { id: "tp1", description: "Fala ingleês" } as TipoTripulante;
        tipoTripulanteComponent.adicionar(tp1.id, tp1.description);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
