import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { RolesusuarioGuard } from '../../guards/rolesusuario.guard';
import { RolesoperativoGuard } from '../../guards/rolesoperativo.guard';
import { RolestecnicoGuard } from '../../guards/rolestecnico.guard';
import { AdminoperaGuard } from 'src/app/guards/adminopera.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'editprofile',
        loadChildren: () => import('../editprofile/editprofile.module').then( m => m.EditprofilePageModule),
         canActivate: [AuthGuard]
      },
      {
        path: 'noticias',
        loadChildren: () => import('../noticias/noticias.module').then( m => m.NoticiasPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'valorplanilla',
        loadChildren: () => import('../valorplanilla/valorplanilla.module').then( m => m.ValorplanillaPageModule),
         canActivate: [AuthGuard, RolesusuarioGuard]
      },
      {
        path: 'reportarasistencia',
        loadChildren: () => import('../reportarasistencia/reportarasistencia.module')
        .then( m => m.ReportarasistenciaPageModule), canActivate: [AuthGuard, RolesusuarioGuard]
      },
      {
        path: 'cerrarasistencia',
        loadChildren: () => import('../cerrar-asistencia/cerrar-asistencia.module')
        .then( m => m.CerrarAsistenciaPageModule), canActivate: [AuthGuard, RolesusuarioGuard]
      },
      {
        path: 'ingresoplanilla',
        loadChildren: () => import('..//ingresoplanilla/ingresoplanilla.module')
        .then( m => m.IngresoplanillaPageModule), canActivate: [AuthGuard, RolesoperativoGuard]
      },
      {
        path: 'ingresar-noticias',
        loadChildren: () => import('../ingresar-noticias/ingresar-noticias.module')
        .then( m => m.IngresarNoticiasPageModule), canActivate: [AuthGuard, AdminoperaGuard]
      },
      {
        path: 'asistenciamapa',
        loadChildren: () => import('../asistenciamapa/asistenciamapa.module')
        .then( m => m.AsistenciamapaPageModule), canActivate: [AuthGuard, AdminoperaGuard]
      },
      {
        path: 'registrar-empleado',
        loadChildren: () => import('../ingresar-empleado/ingresar-empleado.module')
        .then( m => m.IngresarEmpleadoPageModule), canActivate: [AuthGuard, RolesGuard]
      },
      {
        path: 'asignartarea',
        loadChildren: () => import('../asignartarea/asignartarea.module')
        .then( m => m.AsignartareaPageModule), canActivate: [AuthGuard, AdminoperaGuard]
      },
      {
        path: 'reporteasistenciascerradas',
        loadChildren: () => import('../reporteasistenciascerradas/reporteasistenciascerradas.module')
                            .then( m => m.ReporteasistenciascerradasPageModule), canActivate: [AuthGuard, RolesGuard]
      },
      {
        path: 'asistenciastecnico',
        loadChildren: () => import('../asistenciastecnico/asistenciastecnico.module')
                              .then( m => m.AsistenciastecnicoPageModule), canActivate: [AuthGuard, RolestecnicoGuard]
      },
      {
        path: 'geolocalizar',
        loadChildren: () => import('../geolocalizar/geolocalizar.module')
                              .then( m => m.GeolocalizarPageModule), canActivate: [AuthGuard, RolestecnicoGuard]
      },
      {
        path: 'noticiasgestion',
        loadChildren: () => import('../noticiasgestion/noticiasgestion.module')
                             .then( m => m.NoticiasgestionPageModule), canActivate: [AuthGuard, AdminoperaGuard]
      },
      {
        path: 'misasistencias',
        loadChildren: () => import('../misasistencias/misasistencias.module')
                            .then( m => m.MisasistenciasPageModule), canActivate: [AuthGuard, RolesusuarioGuard]
      },
      {
        path: 'bajasempleados',
        loadChildren: () => import('../bajasempleados/bajasempleados.module').then( m => m.BajasempleadosPageModule), canActivate: [AuthGuard, RolesGuard]
      },
      {
        path: 'gestionusu',
        loadChildren: () => import('../gestionusu/gestionusu.module').then( m => m.GestionusuPageModule), canActivate: [AuthGuard, RolesGuard]
      },
      {
        path: 'cuentasinhabilitadas',
        loadChildren: () => import('../cuentasinhabilitadas/cuentasinhabilitadas.module').then( m => m.CuentasinhabilitadasPageModule), canActivate: [AuthGuard, RolesGuard]
      },
      {
        path: '',
        redirectTo: 'sigeo/noticias',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'sigeo/noticias',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
