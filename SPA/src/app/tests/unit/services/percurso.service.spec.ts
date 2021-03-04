import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import Percurso  from '../../../models/percurso';
import SegmentoRede from '../../../models/segmentoRede';
import Distancia from '../../../models/distancia';

import { PercursoService } from '../../../services/percurso.service';

describe('Service: Percurso', () => {
    let percursoService: PercursoService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post','get']);
    const sg1= {id:"sg1",
    idNoInicio:"noi",idNoFim:"nof",
    distancia:{value:1,unidadeDistancia:"km"}as Distancia,
    tempoViagem:{value:1,unidadeTempo:"h"}} as SegmentoRede;
    httpClientSpy.post.and.returnValue(of({id:"p1",idLinha:"l1",direcao:"ida",segmentosRede:[sg1]}as Percurso));
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [PercursoService,
          {
            provide: HttpClient,
            useValue: httpClientSpy
          }]
      });
    });


    beforeEach(inject([PercursoService], (service: PercursoService) => {
      percursoService = service;
    }));

    it('should be defined', () => {
      expect(percursoService).toBeTruthy();
    });

    it('should post Percurso using http request', () => {
        const sg1= {id:"sg1",
        idNoInicio:"noi",idNoFim:"nof",
        distancia:{value:1,unidadeDistancia:"km"}as Distancia,
        tempoViagem:{value:1,unidadeTempo:"h"}} as SegmentoRede;
        const percurso= {id:"p1",idLinha:"l1",direcao:"ida"} as Percurso;
        var result !: Percurso;
        percursoService.add(sg1);
        percursoService.adicionarPercurso(percurso).subscribe(percurso=> {
            result=percurso;
        })
        percursoService.clear();
        expect(result).toEqual(percurso);
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
  });
