import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ImportMDRComponent } from '../../../components/importMDR/importMDR.component';
import { ImportarDadosMDRService } from '../../../services/importarDadosMDR.service';
import { of } from 'rxjs';

describe('Import Component', () => {
    let impComponent: ImportMDRComponent;
    let fixture: ComponentFixture<ImportMDRComponent>;

    const importarDadosServiceSpy: jasmine.SpyObj<ImportarDadosMDRService> = jasmine.createSpyObj('ImportarDadosMDRService', ['importarDados']);
    importarDadosServiceSpy.importarDados.and.returnValue(of("Adicionados/atualizados: - 0 Tipo(s) de Viatura; - 0 Nó(s); - 0 Percurso(s); - 0 Linha(s); - 0 Tipo(s) de Tripulante; Erros: 0"));
    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [
                ImportMDRComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                {
                    provide: ImportarDadosMDRService,
                    useValue: importarDadosServiceSpy
                }
            ],
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportMDRComponent);
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