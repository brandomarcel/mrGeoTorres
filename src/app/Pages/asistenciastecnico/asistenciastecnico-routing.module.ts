import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciastecnicoPage } from './asistenciastecnico.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciastecnicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciastecnicoPageRoutingModule {}
