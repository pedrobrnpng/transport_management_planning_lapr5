import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import { TipoViaturaComponent } from 'src/app/components/tipo-viatura/tipo-viatura.component';
import TipoViatura from 'src/app/models/tipoViatura';
import { MessageService } from 'src/app/services/message.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';

describe('Integration: TipoViatura', () => {
    let tipoViaturaComponent: TipoViaturaComponent;
    let tipoViaturaService: TipoViaturaService;
    let messageService: MessageService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({
        id: "12345678901234567890",
        descricao: "Autocarros",
        combustivel: 23,
        autonomia: 200,
        velocidadeMedia: 30,
        custoKM: {valor: 10, moeda: 'EUR'},
        consumoMedio: 5} as TipoViatura));

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [TipoViaturaService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                }]
            });
        });

        beforeEach(inject([TipoViaturaService,MessageService], (service: TipoViaturaService, service2: MessageService) => {
            tipoViaturaService = service;
            messageService = service2;
            tipoViaturaComponent = new TipoViaturaComponent(tipoViaturaService, messageService);
        }));

        it('should be defined', () => {
            expect(tipoViaturaComponent).toBeTruthy();
        });

        it('tipo viatura post should run', () => {
            tipoViaturaComponent.tipoViatura = {
                id: "12345678901234567890",
                descricao: "Autocarros",
                combustivel: 23,
                autonomia: 200,
                velocidadeMedia: 30,
                custoKM: {valor: 10, moeda: 'EUR'},
                consumoMedio: 5};
            tipoViaturaComponent.validade = {
                id: true,
                descricao: true,
                autonomia: true,
                velocidadeMedia: true,
                valor: true,
                consumoMedio: true
            };
            tipoViaturaComponent.adicionar();
            expect(httpClientSpy.post).toHaveBeenCalled();
        })
});
