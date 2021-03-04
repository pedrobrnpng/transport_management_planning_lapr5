import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {Viagem} from '../../../models/viagem';

import { ViagemService } from '../../../services/viagem.service';

describe('Service: Viagem', () => {
  let viagemService: ViagemService;
  const viagem: Viagem = {
    linha: '1',
    horaInicio: new Date(),
    idPercurso: '3'
  };
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
  httpClientSpy.post.and.returnValue(of(viagem));
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViagemService,
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }]
    });
  });


  beforeEach(inject([ViagemService], (service: ViagemService) => {
    viagemService = service;
  }));

  it('should be defined', () => {
    expect(viagemService).toBeTruthy();
  });

  it('should post Viagem using http request', () => {
    let result !: Viagem;
    viagemService.adicionarViagem(viagem).subscribe(newViagem => {
      result = newViagem;
    });
    expect(result).toEqual(viagem);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});
