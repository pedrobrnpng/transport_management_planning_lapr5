import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import No from '../../../models/no';

import { NoService } from '../../../services/no.service';

describe('Service: No', () => {
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
  }));

  it('should be defined', () => {
    expect(noService).toBeTruthy();
  });

  it('should post No using http request', () => {
    let result !: No;
    noService.adicionarNo(no).subscribe(newNo => {
      result = newNo;
    });
    expect(result).toEqual(no);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});
