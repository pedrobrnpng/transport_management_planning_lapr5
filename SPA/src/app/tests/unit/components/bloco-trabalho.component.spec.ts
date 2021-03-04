import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BlocoTrabalhoComponent } from '../../../components/bloco-trabalho/bloco-trabalho.component';
import BlocoTrabalho from '../../../models/blocoTrabalho';
import { Observable, of } from 'rxjs';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { NoService } from 'src/app/services/no.service';
import { Renderer2 } from '@angular/core';

describe('BlocoTrabalho Component', () => {
  let bComponent: BlocoTrabalhoComponent;
  let fixture: ComponentFixture<BlocoTrabalhoComponent>;

  const blocoTrabalhoServiceSpy: jasmine.SpyObj<BlocoTrabalhoService> = jasmine.createSpyObj('blocoTrabalhoService', ['adicionarBlocoTrabalho', 'parseHora']);
  blocoTrabalhoServiceSpy.adicionarBlocoTrabalho.and.returnValue(of({codigo: 1,horaInicio: 1, horaFim: 2, noInicio:"1", noFim:"2",ctt:true} as BlocoTrabalho));
  const noService: jasmine.SpyObj<NoService> = jasmine.createSpyObj('noService', ['getNos']);
  noService.getNos.and.returnValue(of([]));
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        BlocoTrabalhoComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: NoService,
          useValue: noService
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
    fixture = TestBed.createComponent(BlocoTrabalhoComponent);
    bComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(bComponent).toBeTruthy();
  });

  it('BlocoTrabalho component should run', () => {
    const bt1 = {horaInicio: 1, horaFim: 2, noInicio:"1", noFim:"2",ctt:true} as BlocoTrabalho;
    bComponent.nBlocos=1;
    bComponent.horaI=1,
    bComponent.horaF=2,
    bComponent.noI="1",
    bComponent.noF="2",
    bComponent.validateBloco.nBlocos=true;
    bComponent.validateBloco.horaInicio=true;
    bComponent.validateBloco.horaFim=true;
    bComponent.validateBloco.noInicio=true;
    bComponent.validateBloco.noFim=true;
    bComponent.adicionarBloco();
    expect(blocoTrabalhoServiceSpy.adicionarBlocoTrabalho).toHaveBeenCalled();
  });

});
