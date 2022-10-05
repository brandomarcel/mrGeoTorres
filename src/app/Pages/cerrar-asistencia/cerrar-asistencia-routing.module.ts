import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CerrarAsistenciaPage } from './cerrar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: CerrarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CerrarAsistenciaPageRoutingModule {}
