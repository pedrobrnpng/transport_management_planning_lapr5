import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ViaturasComponent } from '../../../components/viaturas/viaturas.component';
import { ViaturaService } from '../../../services/viatura.service';
import Viatura from '../../../models/viatura';
import { Observable, of } from 'rxjs';
import { TipoViaturaService } from 'src/app/services/tipo-viatura.service';
import TipoViatura from 'src/app/models/tipoViatura';

describe('Viatura Component', () => {
  let vComponent: ViaturasComponent;
  let fixture: ComponentFixture<ViaturasComponent>;

  let iDate = new Date("2020-12-23T00:00:00");


  const viaturaServiceSpy: jasmine.SpyObj<ViaturaService> = jasmine.createSpyObj('viaturaService', ['adicionarViatura']);
  viaturaServiceSpy.adicionarViatura.and.returnValue(of({
            matricula: "TT-32-AA",
            tipoViaturaId: "11111111111111111111",
            vin: "1FDKF37G2VEB21095",
            dataEntrada: iDate
        } as Viatura));
  const tipoViaturaServiceSpy: jasmine.SpyObj<TipoViaturaService> = jasmine.createSpyObj('tipoViaturaService', ['getTiposViatura']);
  tipoViaturaServiceSpy.getTiposViatura.and.returnValue(of([{
    id: "12345678901234567890",
    descricao: "Autocarros",
    combustivel: 23,
    autonomia: 200,
    velocidadeMedia: 30,
    custoKM: {valor: 10, moeda: 'EUR'},
    consumoMedio: 5
} as TipoViatura  ]));
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ViaturasComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: ViaturaService,
          useValue: viaturaServiceSpy
        },
        {
            provide: TipoViaturaService,
            useValue: tipoViaturaServiceSpy
          }
      ],
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViaturasComponent);
    vComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(vComponent).toBeTruthy();
  });

  it('Viatura component should run', () => {
      vComponent.viatura = {
        matricula: "TT-32-AA",
        tipoViaturaId: "11111111111111111111",
        vin: "1FDKF37G2VEB21095",
        dataEntrada: iDate
        };
    vComponent.validade = {
        matricula: true,
        vin: true,
        dataEntrada: true
    }
    vComponent.adicionar();

    expect(viaturaServiceSpy.adicionarViatura).toHaveBeenCalled();
  });

});
