import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NoComponent } from 'src/app/components/no/no.component';
import { MessageService } from 'src/app/services/message.service';
import No from '../../models/no';

import { NoService } from '../../services/no.service';

describe('Service: No (integration)', () => {
    let noComponent: NoComponent;
    let noService: NoService;
    const no: No = {
        name: 'no1',
        id_abreviature: 'no1',
        xCoordinate: 50,
        yCoordinate: 50,
        type: 'paragem'
      };
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of(no));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [NoService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });


    beforeEach(inject([NoService], (service: NoService) => {
      noService = service;
      noComponent = new NoComponent(noService, new MessageService());
    }));

    it('should be defined', () => {
      expect(noComponent).toBeTruthy();
    });

    it('nó component should run', () => {
        noComponent.no = no;
        noComponent.validadeNo = {
            name: true,
            id_abreviature: true,
            type: true,
            xCoordinate: true,
            yCoordinate: true
          };
        noComponent.adicionar();
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
