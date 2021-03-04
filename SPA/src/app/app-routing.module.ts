import { ViagemComponent } from './components/viagem/viagem.component';
import { NoComponent } from './components/no/no.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth_guard';
import { AdminGuard } from './helpers/admin_guard';
import { GestorGuard } from './helpers/gestor_guard';
import { PercursoComponent } from './components/percurso/percurso.component';
import { TipoTripulanteComponent } from './components/tipo-tripulante/tipo-tripulante.component';
import { MapComponent } from './components/map/map.component';
import { TipoViaturaComponent } from './components/tipo-viatura/tipo-viatura.component';
import { ImportMDRComponent } from './components/importMDR/importMDR.component';
import { ImportMDVComponent } from './components/importMDV/importMDV.component';
import { LinhaComponent } from './components/linha/linha.component';
import { MudMotComponent } from './components/mud-mot/mud-mot.component';
import { BlocoTrabalhoComponent } from './components/bloco-trabalho/bloco-trabalho.component';
import { TripulanteComponent } from './components/tripulante/tripulante.component';
import { ServicoTripulanteComponent } from './components/servico-tripulante/servico-tripulante.component';
import { ListStComponent } from './components/list-st/list-st.component';
import { ServicoViaturaComponent } from './components/servico-viatura/servico-viatura.component';
import { ListSvComponent } from './components/list-sv/list-sv.component';
import { ViaturasComponent } from './components/viaturas/viaturas.component';
import { BlocoViagemComponent } from './components/bloco-viagem/bloco-viagem.component';
import { AlgGenComponent } from './components/alg-gen/alg-gen.component';
import { GeraStComponent } from './components/gera-st/gera-st.component';
import { ListHorariosComponent } from './components/list-horarios/list-horarios.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {path: '', redirectTo: '/map',pathMatch: 'full'},
  {path: 'account', loadChildren: accountModule },
  {path: 'tipoTripulante', component: TipoTripulanteComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'tipoViatura', component: TipoViaturaComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'percurso', component: PercursoComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'linha', component: LinhaComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'no', component: NoComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
  {path: 'listHorarios', component:ListHorariosComponent, canActivate: [AuthGuard]},
  {path: 'importMDR', component: ImportMDRComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'importMDV', component: ImportMDVComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'bloco-trabalho', component: BlocoTrabalhoComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'tripulante', component: TripulanteComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'servicoTripulante', component:ServicoTripulanteComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'listServicoTripulante', component:ListStComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'servicoViatura', component:ServicoViaturaComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'listServicoViatura', component:ListSvComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'viaturas', component:ViaturasComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'bloco-viagem', component: BlocoViagemComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'mud-mot', component: MudMotComponent, canActivate: [AuthGuard, GestorGuard]},
  {path: 'viagem', component: ViagemComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'alg-gen', component: AlgGenComponent, canActivate: [AuthGuard, GestorGuard]},
  {path: 'gera-st', component: GeraStComponent, canActivate: [AuthGuard, GestorGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
