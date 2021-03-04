import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ServicoTripulanteComponent } from '../../../components/servico-tripulante/servico-tripulante.component';
import { ServicoTripulanteService } from '../../../services/servico-tripulante.service';
import ServicoTripulante from '../../../models/servicoTripulante';
import { Observable, of } from 'rxjs';
import { BlocoTrabalhoService } from 'src/app/services/bloco-trabalho.service';
import { TripulanteService } from 'src/app/services/tripulante.service';
import { Renderer2 } from '@angular/core';

describe('ServicoTripulante Component', () => {
  let tComponent: ServicoTripulanteComponent;
  let fixture: ComponentFixture<ServicoTripulanteComponent>;

  const servicoTripulanteServiceSpy: jasmine.SpyObj<ServicoTripulanteService> = jasmine.createSpyObj('servicoTripulanteService', ['adicionarServicoTripulante','getTurnos']);
  servicoTripulanteServiceSpy.adicionarServicoTripulante.and.returnValue(of({tripulanteDomainId: "1",nome: "Teste",cor:"RDB(10,10,10)"} as ServicoTripulante));
  const blocoTrabalhoService: jasmine.SpyObj<BlocoTrabalhoService> = jasmine.createSpyObj('blocoTrabalhoService', ['getBlocosTrabalhoSemST']);
  blocoTrabalhoService.getBlocosTrabalhoSemST.and.returnValue(of([]));
  const tripulantesService: jasmine.SpyObj<TripulanteService> = jasmine.createSpyObj('tripulanteService', ['getTripulantes']);
  tripulantesService.getTripulantes.and.returnValue(of([]));
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ServicoTripulanteComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: ServicoTripulanteService,
          useValue: servicoTripulanteServiceSpy
        },
        {
          provide: TripulanteService,
          useValue: tripulantesService
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
    fixture = TestBed.createComponent(ServicoTripulanteComponent);
    tComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(tComponent).toBeTruthy();
  });

  it('ServicoTripulante component should run', () => {
    const st1 = {tripulanteDomainId: "1",nome: "Teste",cor:"RGB(10,10,10)"} as ServicoTripulante;
    tComponent.adicionarServicoTripulante("1","Teste","RGB(10,10,10)");
    expect(servicoTripulanteServiceSpy.adicionarServicoTripulante).toHaveBeenCalled();
  });

});
