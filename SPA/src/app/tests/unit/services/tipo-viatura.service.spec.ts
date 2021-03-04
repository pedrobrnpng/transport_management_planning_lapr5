import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import TipoViatura from 'src/app/models/tipoViatura';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';

describe('Service: TipoViatura', () => {
    let tipoViaturaService: TipoViaturaService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({
    id: "12345678901234567890",
    descricao: "Autocarros",
    combustivel: 23,
    autonomia: 200,
    velocidadeMedia: 30,
    custoKM: {valor: 10, moeda: 'EUR'},
    consumoMedio: 5} as TipoViatura));

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [TipoViaturaService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                }]
        });
    });

    beforeEach(inject([TipoViaturaService], (service: TipoViaturaService) => {
        tipoViaturaService = service;
    }));

    it('should be defined', () => {
        expect(tipoViaturaService).toBeTruthy();
    });

    it('should post TipoViatura using an http request', () => {
        const tipoViatura = {
            id: "12345678901234567890",
            descricao: "Autocarros",
            combustivel: 23,
            autonomia: 200,
            velocidadeMedia: 30,
            custoKM: {valor: 10, moeda: 'EUR'},
            consumoMedio: 5} as TipoViatura;
            var result !: TipoViatura;
            tipoViaturaService.adicionarTipoViatura(tipoViatura).subscribe(tipoViatura => {result = tipoViatura;})
            expect(result).toEqual(tipoViatura);
            expect(httpClientSpy.post).toHaveBeenCalled();
        });
    });
