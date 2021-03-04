import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TipoTripulanteComponent } from './components/tipo-tripulante/tipo-tripulante.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './components/message/message.component';
import { PercursoComponent } from './components/percurso/percurso.component';
import { MapComponent } from './components/map/map.component';
import { NoComponent } from './components/no/no.component';
import { TipoViaturaComponent } from './components/tipo-viatura/tipo-viatura.component';
import { ImportMDRComponent } from './components/importMDR/importMDR.component';
import { LinhaComponent } from './components/linha/linha.component';
import { MudMotComponent } from './components/mud-mot/mud-mot.component';
import { BlocoTrabalhoComponent } from './components/bloco-trabalho/bloco-trabalho.component';
import { TripulanteComponent } from './components/tripulante/tripulante.component';
import { ServicoTripulanteComponent } from './components/servico-tripulante/servico-tripulante.component';
import { ServicoViaturaComponent } from './components/servico-viatura/servico-viatura.component';
import { ViaturasComponent } from './components/viaturas/viaturas.component';
import { BlocoViagemComponent } from './components/bloco-viagem/bloco-viagem.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViagemComponent } from './components/viagem/viagem.component';
import { AlgGenComponent } from './components/alg-gen/alg-gen.component';
import { ImportMDVComponent } from './components/importMDV/importMDV.component';
import { ListSvComponent } from './components/list-sv/list-sv.component';
import { ListStComponent } from './components/list-st/list-st.component';
import { GeraStComponent } from './components/gera-st/gera-st.component';
import { ListHorariosComponent } from './components/list-horarios/list-horarios.component';


@NgModule({
  declarations: [
    AppComponent,
    TipoTripulanteComponent,
    MessageComponent,
    PercursoComponent,
    MapComponent,
    NoComponent,
    ImportMDRComponent,
    TipoViaturaComponent,
    LinhaComponent,
    MudMotComponent,
    BlocoTrabalhoComponent,
    TripulanteComponent,
    ServicoTripulanteComponent,
    ServicoViaturaComponent,
    ViaturasComponent,
    BlocoViagemComponent,
    ViagemComponent,
    AlgGenComponent,
    ImportMDVComponent,
    ListSvComponent,
    ListStComponent,
    GeraStComponent,
    ListHorariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
