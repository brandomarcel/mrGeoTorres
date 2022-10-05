import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionusuPage } from './gestionusu.page';

const routes: Routes = [
  {
    path: '',
    component: GestionusuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionusuPageRoutingModule {}
