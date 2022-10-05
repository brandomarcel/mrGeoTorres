import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarEmpleadoPage } from './ingresar-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarEmpleadoPageRoutingModule {}
