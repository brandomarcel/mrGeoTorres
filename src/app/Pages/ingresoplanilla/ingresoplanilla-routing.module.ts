import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoplanillaPage } from './ingresoplanilla.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoplanillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoplanillaPageRoutingModule {}
