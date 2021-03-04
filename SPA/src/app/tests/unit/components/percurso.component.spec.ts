import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PercursoComponent } from '../../../components/percurso/percurso.component';
import { PercursoService } from '../../../services/percurso.service';
import Percurso from '../../../models/percurso';
import { of } from 'rxjs';
import Distancia from 'src/app/models/distancia';
import SegmentoRede from 'src/app/models/segmentoRede';
import { LinhaService } from 'src/app/services/linha.service';
import { NoService } from 'src/app/services/no.service';
import No from 'src/app/models/no';

describe('Percurso Component', () => {
    let percursoComponent: PercursoComponent;
    let fixture: ComponentFixture<PercursoComponent>;
    const sg1= {id:"sg1",
    idNoInicio:"noi",idNoFim:"nof",
    distancia:{value:1,unidadeDistancia:"km"}as Distancia,
    tempoViagem:{value:1,unidadeTempo:"h"}} as SegmentoRede;
    const percursoServiceSpy: jasmine.SpyObj<PercursoService> = jasmine.createSpyObj('percursoService', ['add','adicionarPercurso',
    'percursosOrdenadosPorLinha','getDirecoes','getUnidadesTempo','getUnidadesDistancia','clear','getPercursosByLinha']);
    const noServiceSpy: jasmine.SpyObj<NoService> = jasmine.createSpyObj('noService', ['getNos']);
    const linhaServiceSpy: jasmine.SpyObj<LinhaService> = jasmine.createSpyObj('linhaService', ['getLinhas']);
    percursoServiceSpy.adicionarPercurso.and.returnValue(of({id:"p1",idLinha:"l1",direcao:"ida",segmentosRede:[sg1]}as Percurso));
    percursoServiceSpy.percursosOrdenadosPorLinha.and.returnValue(of([{id:"p1",idLinha:"l1",direcao:"ida",segmentosRede:[sg1]}]));
    percursoServiceSpy.getPercursosByLinha.and.returnValue(of([{id:"p1",idLinha:"l1",direcao:"ida",segmentosRede:[sg1]}]));
    noServiceSpy.getNos.and.returnValue(of([{name: 'No1',id_abreviature: 'No1',type: 'PR',xCoordinate: 10,yCoordinate: 20} as No]));
    linhaServiceSpy.getLinhas.and.returnValue(of([{id: 'l4',noInicial: 'PARED',noFinal: 'CRIST',codigo: 'R',nome: 'Location',idTiposTripulante: [],idTiposViatura: [], cor: 'RBG(1,1,1)'}]));
    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [
                PercursoComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                {
                    provide: PercursoService,
                    useValue: percursoServiceSpy
                },{
                    provide: LinhaService,
                    useValue: linhaServiceSpy
                }, {
                    provide: NoService,
                    useValue: noServiceSpy
                }
            ],
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PercursoComponent);
        percursoComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(percursoComponent).toBeTruthy();
    });

   it('percurso component should run', () => {
        const p1 = {id:"p1",idLinha:"l1",direcao:"ida",segmentosRede:[sg1]}as Percurso;
        percursoComponent.adicionarSegmento(sg1.id,sg1.idNoInicio,sg1.idNoFim,sg1.distancia.value.toString(),sg1.distancia.unidadeDistancia
            ,sg1.tempoViagem.value.toString(),sg1.tempoViagem.unidadeTempo);
        percursoComponent.adicionarPercurso(p1.id, p1.idLinha,p1.direcao);
        percursoComponent.clear();
        expect(percursoServiceSpy.adicionarPercurso).toHaveBeenCalled();
    });

});
