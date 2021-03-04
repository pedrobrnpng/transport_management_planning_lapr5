import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MudMotService } from '../../../services/mud-mot.service';

describe('Service: MudMot', () => {
    let mudMotService: MudMotService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of(['PARED','MOURZ','SOBRO']));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [MudMotService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });
  
  
    beforeEach(inject([MudMotService], (service: MudMotService) => {
        mudMotService = service;
    }));
  
    it('should be defined', () => {
      expect(mudMotService).toBeTruthy();
    });
  
    it('should post Nodes and return path', () => {
        const expected= '["PARED","MOURZ","SOBRO"]';
        var result !: string;
        mudMotService.getMelhorCaminho("PARED","SOBRO").subscribe(json=> {
            result=JSON.stringify(json);
        })
        expect(result).toEqual(expected);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });