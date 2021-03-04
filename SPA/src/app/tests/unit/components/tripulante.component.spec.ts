import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { TripulanteComponent } from '../../../components/tripulante/tripulante.component';
import { TripulanteService } from '../../../services/tripulante.service';
import Tripulante from '../../../models/tripulante';
import { Observable, of } from 'rxjs';
import { TipoTripulanteService } from 'src/app/services/tipo-tripulante.service';
import { TipoTripulante } from 'src/app/models/tipoTripulante';

describe('Tripulante Component', () => {
  let tComponent: TripulanteComponent;
  let fixture: ComponentFixture<TripulanteComponent>;

  const tripulanteServiceSpy: jasmine.SpyObj<TripulanteService> = jasmine.createSpyObj('tripulanteService', ['adicionarTripulante','getTurnos']);
  tripulanteServiceSpy.adicionarTripulante.and.returnValue(of({
    numeroMecanografico: 123123123, nome: "Teste", dataNascimento: new Date("12/12/1975"), numeroCartaoCidadao: 12312312,
    nif: 123123123, turno: "diurno", tipoTripulanteId: "1", dataEntrada: new Date("12/12/2020")
  } as Tripulante));
  tripulanteServiceSpy.getTurnos.and.returnValue(null);
  const tipoTripulanteServiceSpy: jasmine.SpyObj<TipoTripulanteService> = jasmine.createSpyObj('tipoTripulanteService', ['getTiposTripulante']);
  tipoTripulanteServiceSpy.getTiposTripulante.and.returnValue(of([{ id: "1", description: "Fala ingleês" } as TipoTripulante]));
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        TripulanteComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: TripulanteService,
          useValue: tripulanteServiceSpy
        },
        {
          provide: TipoTripulanteService,
          useValue: tipoTripulanteServiceSpy
        }
      ],
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripulanteComponent);
    tComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(tComponent).toBeTruthy();
  });

  it('Tripulante component should run', () => {
    const t1 = {
      numeroMecanografico: 123123123, nome: "Teste", dataNascimento: new Date("12/12/1975"), numeroCartaoCidadao: 12312312,
      nif: 123123123, turno: "diurno", tipoTripulanteId: "1", dataEntrada: new Date("12/12/2020")
    } as Tripulante;
    tComponent.adicionarTripulante("123123123", "Teste", new Date("12/12/1975"), "12312312",
      "123123123", "diurno", "1", new Date("12/12/2020"), null);
    expect(tripulanteServiceSpy.adicionarTripulante).toHaveBeenCalled();
  });

});
