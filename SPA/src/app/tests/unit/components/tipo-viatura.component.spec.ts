import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TipoViaturaComponent } from 'src/app/components/tipo-viatura/tipo-viatura.component';
import TipoViatura from 'src/app/models/tipoViatura';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';

describe('Tipo de Viatura Component', () => {
    let tpComponent: TipoViaturaComponent;
    let fixture: ComponentFixture<TipoViaturaComponent>;

    const tipoViaturaServiceSpy: jasmine.SpyObj<TipoViaturaService> = jasmine.createSpyObj('tipoViaturaService', ['adicionarTipoViatura']);
    tipoViaturaServiceSpy.adicionarTipoViatura.and.returnValue(of({
        id: "12345678901234567890",
        descricao: "Autocarros",
        combustivel: 23,
        autonomia: 200,
        velocidadeMedia: 30,
        custoKM: {valor: 10, moeda: 'EUR'},
        consumoMedio: 5} as TipoViatura));
    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [
                TipoViaturaComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                {
                    provide: TipoViaturaService,
                    useValue: tipoViaturaServiceSpy
                }
            ],
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TipoViaturaComponent);
        tpComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(tpComponent).toBeTruthy();
    });

    it('tipo viatura component should run', () => {
        tpComponent.tipoViatura ={
            id: "12345678901234567890",
            descricao: "Autocarros",
            combustivel: 23,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: {valor: 10, moeda: 'EUR'},
            consumoMedio: 5};
        tpComponent.validade = {
            id: true,
            descricao: true,
            autonomia: true,
            velocidadeMedia: true,
            valor: true,
            consumoMedio: true
          };
        tpComponent.adicionar();
        expect(tipoViaturaServiceSpy.adicionarTipoViatura).toHaveBeenCalled();
    });

});
