import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ServicoViaturaComponent } from '../../../components/servico-viatura/servico-viatura.component';
import { ServicoViaturaService } from '../../../services/servico-viatura.service';
import ServicoViatura from '../../../models/servicoViatura';
import { Observable, of } from 'rxjs';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { ViaturaService } from 'src/app/services/viatura.service';
import { Renderer2 } from '@angular/core';

describe('ServicoViatura Component', () => {
  let vComponent: ServicoViaturaComponent;
  let fixture: ComponentFixture<ServicoViaturaComponent>;

  const servicoViaturaServiceSpy: jasmine.SpyObj<ServicoViaturaService> = jasmine.createSpyObj('servicoViaturaService', ['adicionarServicoViatura']);
  servicoViaturaServiceSpy.adicionarServicoViatura.and.returnValue(of({nome: "Teste",cor:"RDB(10,10,10)",depots:"Teste",viatura:"11-11-GH",blocos:["1"]} as ServicoViatura));
  const blocoTrabalhoService: jasmine.SpyObj<BlocoTrabalhoService> = jasmine.createSpyObj('blocoTrabalhoService', ['getBlocosTrabalhoSemSV']);
  blocoTrabalhoService.getBlocosTrabalhoSemSV.and.returnValue(of([]));
  const viaturaService: jasmine.SpyObj<ViaturaService> = jasmine.createSpyObj('viaturaService', ['getViaturas']);
  viaturaService.getViaturas.and.returnValue(of([]));
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ServicoViaturaComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: ServicoViaturaService,
          useValue: servicoViaturaServiceSpy
        },
        {
          provide: ViaturaService,
          useValue: viaturaService
        },{
          provide: BlocoTrabalhoService,
          useValue: blocoTrabalhoService
        },{
          provide: Renderer2,
          useValue: null
        }
      ],
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoViaturaComponent);
    vComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(vComponent).toBeTruthy();
  });

  it('ServicoViatura component should run', () => {
    const sv1 = {nome: "Teste",cor:"RDB(10,10,10)",depots:"Teste",viatura:"11-11-GH",blocos:["1"]} as ServicoViatura;
    vComponent.adicionarServicoViatura("11-11-GH","Teste","RGB(10,10,10)");
    expect(servicoViaturaServiceSpy.adicionarServicoViatura).toHaveBeenCalled();
  });

});
