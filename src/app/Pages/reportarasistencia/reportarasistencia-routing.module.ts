import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportarasistenciaPage } from './reportarasistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ReportarasistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportarasistenciaPageRoutingModule {}
