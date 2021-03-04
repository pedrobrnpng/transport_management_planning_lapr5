import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import ImportMDV from '../../../models/importMDV';
import { ImportMDVComponent } from '../../../components/importMDV/importMDV.component';
import { ImportarDadosMDVService } from '../../../services/importarDadosMDV.service';
import { of } from 'rxjs';

describe('Import Component', () => {
    let impComponent: ImportMDVComponent;
    let fixture: ComponentFixture<ImportMDVComponent>;

    const importarDadosServiceSpy: jasmine.SpyObj<ImportarDadosMDVService> = jasmine.createSpyObj('ImportarDadosMDVService', ['importarDados']);
    importarDadosServiceSpy.importarDados.and.returnValue(of({input: "Adicionados/atualizados: - 0 Viagem(s); - 0 Bloco(s) de Trabalho; - 0 Serviço(s) de Tripulante; - 0 Serviço(s) de Viatura; Erros: 0"} as ImportMDV));
    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [
                ImportMDVComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                {
                    provide: ImportarDadosMDVService,
                    useValue: importarDadosServiceSpy
                }
            ],
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportMDVComponent);
        impComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(impComponent).toBeTruthy();
    });

    it('import component should run', () => {
        var file:File=new File(["foo"], "foo.glx", {
            type: "text/plain",
          });;
        impComponent.fileToUpload=file;
        console.log(file)
        impComponent.importarDados();
        expect(importarDadosServiceSpy.importarDados).toHaveBeenCalled();
    });

});