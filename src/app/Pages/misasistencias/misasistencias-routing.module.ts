import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisasistenciasPage } from './misasistencias.page';

const routes: Routes = [
  {
    path: '',
    component: MisasistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisasistenciasPageRoutingModule {}
