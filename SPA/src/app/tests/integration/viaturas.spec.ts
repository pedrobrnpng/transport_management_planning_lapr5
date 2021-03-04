import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import { ViaturasComponent } from 'src/app/components/viaturas/viaturas.component';
import Viatura from '../../models/viatura';
import { ViaturaService } from 'src/app/services/viatura.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';
import { MessageService } from 'src/app/services/message.service';

describe('Integration: Linha', () => {
    let viaturaComp: ViaturasComponent;
    
    let tViaturaService: TipoViaturaService;
    let messageService: MessageService;
    let viaturaService: ViaturaService;
    
    let iDate = new Date("2020-12-23T00:00:00");
    
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({
            matricula: "TT-32-AA",
            tipoViaturaId: "11111111111111111111",
            vin: "1FDKF37G2VEB21095",
            dataEntrada: iDate
        } as Viatura));

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [ViaturaService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                }]
            });
        });

        beforeEach(inject([ViaturaService, TipoViaturaService, MessageService], (service: ViaturaService, mService: MessageService, tvService: TipoViaturaService) => {
            viaturaService = service;
            tViaturaService = tvService;
            messageService = mService;
            viaturaComp = new ViaturasComponent(viaturaService, messageService, tViaturaService);
        }));

        it('should be defined', () => {
            expect(viaturaComp).toBeTruthy();
        });

        it('linha post should run', () => {
            viaturaComp.viatura = {
                matricula: "TT-32-AA",
                tipoViaturaId: "11111111111111111111",
                vin: "1FDKF37G2VEB21095",
                dataEntrada: iDate
            };
            viaturaComp.validade = {
                matricula: true,
                vin: true,
                dataEntrada: true
            };
            viaturaComp.adicionar();
            expect(httpClientSpy.post).toHaveBeenCalled();
        })
});