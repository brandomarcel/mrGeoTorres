import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarNoticiasPage } from './ingresar-noticias.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarNoticiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarNoticiasPageRoutingModule {}
