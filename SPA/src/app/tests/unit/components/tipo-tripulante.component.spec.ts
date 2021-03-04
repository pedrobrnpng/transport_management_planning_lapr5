import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { TipoTripulanteComponent } from '../../../components/tipo-tripulante/tipo-tripulante.component';
import { TipoTripulanteService } from '../../../services/tipo-tripulante.service';
import { TipoTripulante } from '../../../models/tipoTripulante';
import { of } from 'rxjs';

describe('Tipo de tripulante Component', () => {
    let tpComponent: TipoTripulanteComponent;
    let fixture: ComponentFixture<TipoTripulanteComponent>;

    const tipoTripulanteServiceSpy: jasmine.SpyObj<TipoTripulanteService> = jasmine.createSpyObj('tipoTripulanteService', ['adicionarTipoTripulante']);
    tipoTripulanteServiceSpy.adicionarTipoTripulante.and.returnValue(of({ id: "tp1", description: "Fala ingleês" } as TipoTripulante));
    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [
                TipoTripulanteComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                {
                    provide: TipoTripulanteService,
                    useValue: tipoTripulanteServiceSpy
                }
            ],
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TipoTripulanteComponent);
        tpComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(tpComponent).toBeTruthy();
    });

    it('tipo tripulante component should run', () => {
        const tp1 = { id: "tp1", description: "Fala ingleês" } as TipoTripulante;
        tpComponent.adicionar(tp1.id, tp1.description);
        expect(tipoTripulanteServiceSpy.adicionarTipoTripulante).toHaveBeenCalled();
    });

});
