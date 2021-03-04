import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import Percurso from '../../models/percurso';
import SegmentoRede from '../../models/segmentoRede';
import Distancia from '../../models/distancia';

import { PercursoService } from '../../services/percurso.service';
import { PercursoComponent } from 'src/app/components/percurso/percurso.component';
import { LinhaService } from 'src/app/services/linha.service';
import { NoService } from 'src/app/services/no.service';

describe('Service: Percurso', () => {
    let percursoComponent: PercursoComponent;
    let percursoService: PercursoService;
    let linhaService: LinhaService;
    let noService: NoService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    const sg1 = {
        id: "sg1",
        idNoInicio: "noi", idNoFim: "nof",
        distancia: { value: 1, unidadeDistancia: "km" } as Distancia,
        tempoViagem: { value: 1, unidadeTempo: "h" }
    } as SegmentoRede;
    httpClientSpy.post.and.returnValue(of({ id: "p1", idLinha: "l1", direcao: "ida", segmentosRede: [sg1] } as Percurso));
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
        percursoComponent= new PercursoComponent(percursoService,linhaService,noService);
    }));

    it('should create', () => {
        expect(percursoComponent).toBeTruthy();
    });

    it('percurso component should run', () => {
        const p1 = { id: "p1", idLinha: "l1", direcao: "ida", segmentosRede: [sg1] } as Percurso;
        percursoComponent.adicionarSegmento(sg1.id, sg1.idNoInicio, sg1.idNoFim, sg1.distancia.value.toString(), sg1.distancia.unidadeDistancia
            , sg1.tempoViagem.value.toString(), sg1.tempoViagem.unidadeTempo);
        percursoComponent.adicionarPercurso(p1.id, p1.idLinha, p1.direcao);
        percursoComponent.clear();
        expect(httpClientSpy.post).toHaveBeenCalled();
    });
});
