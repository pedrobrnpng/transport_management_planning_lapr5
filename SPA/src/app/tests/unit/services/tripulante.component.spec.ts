import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import Tripulante from '../../../models/tripulante';

import { TripulanteService } from '../../../services/tripulante.service';

describe('Service: Tripulante', () => {
  let tripulanteService: TripulanteService;
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
  httpClientSpy.post.and.returnValue(of({
    numeroMecanografico: 123123123, nome: "Teste", dataNascimento: new Date("12/12/1975"), numeroCartaoCidadao: 12312312,
    nif: 123123123, turno: "diurno", tipoTripulanteId: "1", dataEntrada: new Date("12/12/2018"), dataSaida:new Date("12/12/2020")
  } as Tripulante));
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripulanteService,
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }]
    });
  });


  beforeEach(inject([TripulanteService], (service: TripulanteService) => {
    tripulanteService = service;
  }));

  it('should be defined', () => {
    expect(tripulanteService).toBeTruthy();
  });

  it('should post Tripulante using http request', () => {
    const tripulante = {
      numeroMecanografico: 123123123, nome: "Teste", dataNascimento: new Date("12/12/1975"), numeroCartaoCidadao: 12312312,
      nif: 123123123, turno: "diurno", tipoTripulanteId: "1", dataEntrada: new Date("12/12/2018"), dataSaida:new Date("12/12/2020")
    } as Tripulante as Tripulante;
    var result !: Tripulante;
    tripulanteService.adicionarTripulante(tripulante).subscribe(tripulante => {
      result = tripulante;
    })
    expect(result).toEqual(tripulante);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});
