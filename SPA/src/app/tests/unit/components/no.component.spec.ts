import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NoComponent } from '../../../components/no/no.component';
import { NoService } from '../../../services/no.service';
import No from '../../../models/no';
import { of } from 'rxjs';

describe('Nó Component', () => {
  let noComponent: NoComponent;
  let fixture: ComponentFixture<NoComponent>;
  const no: No = {
    name: 'no1',
    id_abreviature: 'no1',
    xCoordinate: 50,
    yCoordinate: 50,
    type: 'paragem'
  };
  let nos: No[] = [no];
  const noServiceSpy: jasmine.SpyObj<NoService> = jasmine.createSpyObj('noService', ['adicionarNo', 'getNos']);
  noServiceSpy.adicionarNo.and.returnValue(of(no));
  noServiceSpy.getNos.and.returnValue(of(nos));
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NoComponent,
      ],
      imports: [
        BrowserModule,
      ],
      providers: [
        {
          provide: NoService,
          useValue: noServiceSpy
        }
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoComponent);
    noComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(noComponent).toBeTruthy();
  });

  it('nó component should run', () => {
    noComponent.validadeNo = {
      name: true,
      id_abreviature: true,
      type: true,
      xCoordinate: true,
      yCoordinate: true
    };
    noComponent.adicionar();
    expect(noServiceSpy.adicionarNo).toHaveBeenCalled();
  });

});
