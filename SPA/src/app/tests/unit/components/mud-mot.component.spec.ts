import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MudMotComponent } from '../../../components/mud-mot/mud-mot.component';
import { MudMotService } from '../../../services/mud-mot.service';
import { NoService } from '../../../services/no.service';
import No from '../../../models/no';
import { Observable, of } from 'rxjs';

describe('Mud-Mot Component', () => {
    let mudComponent: MudMotComponent;
    let fixture: ComponentFixture<MudMotComponent>;
    const no: No = {
        name: 'no1',
        id_abreviature: 'no1',
        xCoordinate: 50,
        yCoordinate: 50,
        type: 'paragem'
      };

    const mudMotServiceSpy: jasmine.SpyObj<MudMotService> = jasmine.createSpyObj('MudMotService', ['getMelhorCaminho']);
    const noServiceSpy: jasmine.SpyObj<NoService> = jasmine.createSpyObj('NoService', ['getNos']);
    mudMotServiceSpy.getMelhorCaminho.and.returnValue(of(<JSON><unknown>['PARED','MOURZ','SOBRO']));
    noServiceSpy.getNos.and.returnValue(of([no]));
    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [
                MudMotComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                {
                    provide: MudMotService,
                    useValue: mudMotServiceSpy
                },
                {
                    provide: NoService,
                    useValue: noServiceSpy
                }
            ],
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MudMotComponent);
        mudComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(mudComponent).toBeTruthy();
    });

    it('Mud-Mot component should run', () => {
        mudComponent.validateNos = {
            idNoInicio: true,
            idNoFim: true
        }
        mudComponent.planMudMot("PARED","SOBRO");
        expect(mudMotServiceSpy.getMelhorCaminho).toHaveBeenCalled();
    });
});
