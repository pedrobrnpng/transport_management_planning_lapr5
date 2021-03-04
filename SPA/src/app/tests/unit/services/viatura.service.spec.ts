import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import Viatura from 'src/app/models/viatura';
import { ViaturaService } from 'src/app/services/viatura.service';

describe('Service: TipoViatura', () => {
    let viaturaService: ViaturaService;

    let iDate = new Date("2020-12-23T00:00:00");

    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({
        matricula: "TT-32-AA",
        tipoViaturaId: "11111111111111111111",
        vin: "1FDKF37G2VEB21095",
        dataEntrada: iDate
    } as Viatura));

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [ViaturaService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                }]
        });
    });

    beforeEach(inject([ViaturaService], (service: ViaturaService) => {
        viaturaService = service;
    }));

    it('should be defined', () => {
        expect(viaturaService).toBeTruthy();
    });

    it('should post TipoViatura using an http request', () => {
        const viatura = {
            matricula: "TT-32-AA",
            tipoViaturaId: "11111111111111111111",
            vin: "1FDKF37G2VEB21095",
            dataEntrada: iDate
        } as Viatura;
            var result !: Viatura;
            viaturaService.adicionarViatura(viatura).subscribe(viatura => {result = viatura;})
            expect(result).toEqual(viatura);
            expect(httpClientSpy.post).toHaveBeenCalled();
        });
    });
