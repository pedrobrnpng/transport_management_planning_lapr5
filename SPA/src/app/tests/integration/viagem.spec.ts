import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ViagemComponent } from 'src/app/components/viagem/viagem.component';
import Percurso from 'src/app/models/percurso';
import { LinhaService } from 'src/app/services/linha.service';
import { MessageService } from 'src/app/services/message.service';
import { PercursoService } from 'src/app/services/percurso.service';
import {Viagem} from '../../models/viagem';

import { ViagemService } from '../../services/viagem.service';

describe('Service: Viagem (integration)', () => {
    let viagemComponent: ViagemComponent;
    let viagemService: ViagemService;
    let percursoService: PercursoService;
    let linhaService: LinhaService;
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


    beforeEach(inject([ViagemService, LinhaService, PercursoService], 
      (service: ViagemService, service1: LinhaService, service2: PercursoService) => {
      viagemService = service;
      percursoService = service2;
      linhaService = service1;
      viagemComponent = new ViagemComponent(viagemService, new MessageService(), percursoService, linhaService);
    }));

    it('should be defined', () => {
      expect(viagemComponent).toBeTruthy();
    });

    it('nó component should run', () => {
        viagemComponent.viagem = viagem;
        viagemComponent.validadeViagem = {
          linha: true,
          idPercurso: true,
          horaInicio: true
        };
        viagemComponent.adicionarViagem();
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
