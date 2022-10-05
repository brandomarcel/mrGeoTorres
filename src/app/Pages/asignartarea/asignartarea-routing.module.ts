import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignartareaPage } from './asignartarea.page';

const routes: Routes = [
  {
    path: '',
    component: AsignartareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignartareaPageRoutingModule {}
