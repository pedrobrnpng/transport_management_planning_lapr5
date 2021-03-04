import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import Linha from 'src/app/models/linha';
import { MessageService } from 'src/app/services/message.service';
import { NoService } from 'src/app/services/no.service';
import { TipoTripulanteService } from 'src/app/services/tipo-tripulante.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';

import { LinhaService } from '../../../services/linha.service';

describe('LinhaService', () => {
  let lService: LinhaService;
  let messageService: MessageService;
  let tviaturaService: TipoViaturaService;
  let ttripService: TipoTripulanteService;
  let nosService: NoService;
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient',['post']);
  httpClientSpy.post.and.returnValue(of({
        id: 'R',
        noInicial: 'PARED',
        noFinal: 'CRIST',
        nome: 'Location',
        idTiposTripulante: [],
        idTiposViatura: [],
        cor: 'RBG(1,1,1)'} as Linha));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinhaService,
      {
        provide: HttpClient,
        useValue: httpClientSpy
      }]
    });
  });

  beforeEach(inject([LinhaService,MessageService,NoService,TipoTripulanteService,TipoViaturaService], (service: LinhaService,
    service2: MessageService,nService: NoService, tpService: TipoTripulanteService, tvService: TipoViaturaService) => {
    lService = service;
    messageService = service2;
    tviaturaService = tvService;
    ttripService = tpService;
    nosService = nService;
  }));

  it('should be defined', () => {
    expect(lService).toBeTruthy();
  });

  it('should post Linha using an http request', () => {
    const linha = {
      id: 'R',
      noInicial: 'PARED',
      noFinal: 'CRIST',
      nome: 'Location',
      idTiposTripulante: [],
      idTiposViatura: [],
      cor: 'RBG(1,1,1)'} as Linha;
      var result !: Linha;
      lService.adicionarLinha(linha).subscribe(linha => {result = linha;})
      expect(result).toEqual(linha);
      expect(httpClientSpy.post).toHaveBeenCalled();
  });

});
