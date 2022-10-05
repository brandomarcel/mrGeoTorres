import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BajasempleadosPage } from './bajasempleados.page';

const routes: Routes = [
  {
    path: '',
    component: BajasempleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BajasempleadosPageRoutingModule {}
