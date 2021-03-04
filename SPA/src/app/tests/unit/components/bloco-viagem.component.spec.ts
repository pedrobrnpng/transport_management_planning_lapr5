import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BlocoViagemComponent } from '../../../components/bloco-viagem/bloco-viagem.component';
import BlocoTrabalho from '../../../models/blocoTrabalho';
import BlocoViagem from '../../../models/blocoViagem';
import BlocoViagens from '../../../models/blocoViagens';
import {Viagem} from '../../../models/viagem';
import { Observable, of } from 'rxjs';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { ViagemService } from 'src/app/services/viagem.service';
import { Renderer2 } from '@angular/core';

describe('BlocoViagem Component', () => {
  let bvComponent: BlocoViagemComponent;
  let fixture: ComponentFixture<BlocoViagemComponent>;

  const blocoTrabalhoServiceSpy: jasmine.SpyObj<BlocoTrabalhoService> = jasmine.createSpyObj('blocoTrabalhoService', ['getBlocosTrabalho', 'getBlocosViagens', 'getViagensPossiveis', 'adicionarViagemABloco', 'parseHora']);
  blocoTrabalhoServiceSpy.getBlocosTrabalho.and.returnValue(of([{codigo: 1,horaInicio: 1, horaFim: 2, noInicio:"1", noFim:"2",ctt:true} as BlocoTrabalho]));
  blocoTrabalhoServiceSpy.getBlocosViagens.and.returnValue(of({ viagens: [1] } as BlocoViagens));
  blocoTrabalhoServiceSpy.getViagensPossiveis.and.returnValue(of({ viagens: [1] } as BlocoViagens));
  blocoTrabalhoServiceSpy.adicionarViagemABloco.and.returnValue(of({ bloco: "1", viagem: 1 } as BlocoViagem));
  const viagemService: jasmine.SpyObj<ViagemService> = jasmine.createSpyObj('viagemService', ['getViagens']);
  viagemService.getViagens.and.returnValue(of([{ codigo:1, horaInicio:new Date("2020-12-23T00:00:00"), linha:"1", idPercurso:"1" } as Viagem]));
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        BlocoViagemComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: ViagemService,
          useValue: viagemService
        },{
          provide: BlocoTrabalhoService,
          useValue: blocoTrabalhoServiceSpy
        },{
          provide: Renderer2,
          useValue: null
        }
      ],
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocoViagemComponent);
    bvComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(bvComponent).toBeTruthy();
  });

  it('BlocoViagem component should run', () => {
    bvComponent.bloco.codigo=1,
    bvComponent.viagensStr.push("1")
    bvComponent.adicionarBlocoViagem("1");
    expect(blocoTrabalhoServiceSpy.adicionarViagemABloco).toHaveBeenCalled();
  });

});
