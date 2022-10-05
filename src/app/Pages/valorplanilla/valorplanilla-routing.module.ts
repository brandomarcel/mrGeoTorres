import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValorplanillaPage } from './valorplanilla.page';

const routes: Routes = [
  {
    path: '',
    component: ValorplanillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValorplanillaPageRoutingModule {}
