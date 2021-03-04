import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs';
import No from '../../../models/no';
import { LinhaComponent } from 'src/app/components/linha/linha.component';
import Linha from 'src/app/models/linha';
import { LinhaService } from 'src/app/services/linha.service';
import { NoService } from 'src/app/services/no.service';
import { TipoTripulanteService } from 'src/app/services/tipo-tripulante.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';
import TipoViatura from 'src/app/models/tipoViatura';
import { TipoTripulante } from 'src/app/models/tipoTripulante';

describe('Linha Component', () => {
    let lComponent: LinhaComponent;
    let fixture: ComponentFixture<LinhaComponent>;

    const linhaServiceSpy: jasmine.SpyObj<LinhaService> = jasmine.createSpyObj('linhaService',['adicionarLinha','getLinhas']);
    const noServiceSpy: jasmine.SpyObj<NoService> = jasmine.createSpyObj('noService',['getNos']);
    const tipoViaturaServiceSpy: jasmine.SpyObj<TipoViaturaService> = jasmine.createSpyObj('tipoViaturaService',['getTiposViatura']);
    const tipoTripulanteServiceSpy: jasmine.SpyObj<TipoTripulanteService> = jasmine.createSpyObj('tipoTripulanteService',['getTiposTripulante']);

    linhaServiceSpy.adicionarLinha.and.returnValue(of({
            id: 'R',
            noInicial: 'PARED',
            noFinal: 'CRIST',
            nome: 'Location',
            idTiposTripulante: [],
            idTiposViatura: [],
            cor: 'RBG(1,1,1)'} as Linha));
    const no: No = {
        name: 'no1',
        id_abreviature: 'no1',
        xCoordinate: 50,
        yCoordinate: 50,
        type: 'paragem'
    };
    const tipo_v: TipoViatura = {
        id: "12345678901234567890",
        descricao: "Autocarros",
        combustivel: 23,
        autonomia: 200,
        velocidadeMedia: 30,
        custoKM: {valor: 10, moeda: 'EUR'},
        consumoMedio: 5
    }
    const tipo_t: TipoTripulante = { id: "tp1", description: "Fala ingleês" };
    noServiceSpy.getNos.and.returnValue(of([no]));
    linhaServiceSpy.getLinhas.and.returnValue(of([]));
    tipoViaturaServiceSpy.getTiposViatura.and.returnValue(of([tipo_v]));
    tipoTripulanteServiceSpy.getTiposTripulante.and.returnValue(of([tipo_t]));


    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                LinhaComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                {
                    provide: LinhaService,
                    useValue: linhaServiceSpy
                },{
                    provide: NoService,
                    useValue: noServiceSpy
                },{
                    provide: TipoViaturaService,
                    useValue: tipoViaturaServiceSpy
                },{
                    provide: TipoTripulanteService,
                    useValue: tipoTripulanteServiceSpy
                }
            ],
        })
    });

    beforeEach( () => {
        fixture = TestBed.createComponent(LinhaComponent);
        lComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(lComponent).toBeTruthy();
    });

    it('linha component should run', () => {
        lComponent.linha={
            id: 'r',
            noInicial: 'PARED',
            noFinal: 'CRIST',
            nome: 'Location',
            idTiposTripulante: [],
            idTiposViatura: [],
            cor: 'RBG(1,1,1)'} as Linha;
        lComponent.validade = {
            id: true,
            nome: true,
            cor: true
        };
        lComponent.adicionar();
        expect(linhaServiceSpy.adicionarLinha).toHaveBeenCalled();
    })
})
