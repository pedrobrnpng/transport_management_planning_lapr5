import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expr } from 'jquery';
import { of } from 'rxjs';
import { LinhaComponent } from 'src/app/components/linha/linha.component';
import Linha from 'src/app/models/linha';
import { LinhaService } from 'src/app/services/linha.service';
import { MessageService } from 'src/app/services/message.service';
import { NoService } from 'src/app/services/no.service';
import { TipoTripulanteService } from 'src/app/services/tipo-tripulante.service';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';

describe('Integration: Linha', () => {
    let linhaComponent: LinhaComponent;
    let linhaService: LinhaService;
    let messageService: MessageService;
    let tviaturaService: TipoViaturaService;
    let ttripService: TipoTripulanteService;
    let nosService: NoService;
    const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['post']);
    httpClientSpy.post.and.returnValue(of({
        id: 'R',
        noInicial: 'PARED',
        noFinal: 'CRIST',
        nome: 'Location',
        idTiposTripulante: [],
        idTiposViatura: [],
        cor: 'RGB(1,1,1)'} as Linha));

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [LinhaService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                }]
            });
        });

        beforeEach(inject([LinhaService,MessageService,NoService,TipoTripulanteService,TipoViaturaService], (service: LinhaService,
                                                service2: MessageService,nService: NoService, tpService: TipoTripulanteService, tvService: TipoViaturaService) => {
            linhaService = service;
            messageService = service2;
            tviaturaService = tvService;
            ttripService = tpService;
            nosService = nService;
            linhaComponent = new LinhaComponent(linhaService, nosService,tviaturaService,ttripService,messageService);
        }));

        it('should be defined', () => {
            expect(linhaComponent).toBeTruthy();
        });

        it('linha post should run', () => {
            linhaComponent.linha = {
                id: 'R',
                noInicial: 'PARED',
                noFinal: 'CRIST',
                nome: 'Location',
                idTiposTripulante: [],
                idTiposViatura: [],
                cor: 'RBG(1,1,1)'};
            linhaComponent.validade = {
                id: true,
                nome: true,
                cor: true
            };
            linhaComponent.adicionar();
            expect(httpClientSpy.post).toHaveBeenCalled();
        })
});
