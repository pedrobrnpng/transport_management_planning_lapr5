import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ViagemComponent } from '../../../components/viagem/viagem.component';
import { ViagemService } from '../../../services/viagem.service';
import {Viagem} from '../../../models/viagem';
import { of } from 'rxjs';

describe('Viagem Component', () => {
  let viagemComponent: ViagemComponent;
  let fixture: ComponentFixture<ViagemComponent>;
  const viagem: Viagem = {
    linha: '1',
    horaInicio: new Date(),
    idPercurso: '3'
  };
  const viagemServiceSpy: jasmine.SpyObj<ViagemService> = jasmine.createSpyObj('ViagemService', ['adicionarViagem','getViagens']);
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['get']);
  httpClientSpy.get.and.returnValue(of([]));
  viagemServiceSpy.adicionarViagem.and.returnValue(of(viagem));
  viagemServiceSpy.getViagens.and.returnValue(of([viagem]));
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ViagemComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: ViagemService,
          useValue: viagemServiceSpy
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViagemComponent);
    viagemComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(viagemComponent).toBeTruthy();
  });

  it('viagem component should run', () => {
    viagemComponent.validadeViagem = {
      linha: true,
      idPercurso: true,
      horaInicio: true
    };
    viagemComponent.viagem = viagem;
    viagemComponent.adicionarViagem();
    expect(viagemServiceSpy.adicionarViagem).toHaveBeenCalled();
  });

});
