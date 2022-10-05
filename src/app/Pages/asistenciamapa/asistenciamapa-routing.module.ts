import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciamapaPage } from './asistenciamapa.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciamapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciamapaPageRoutingModule {}
