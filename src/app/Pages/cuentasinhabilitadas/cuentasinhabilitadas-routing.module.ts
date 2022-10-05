import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentasinhabilitadasPage } from './cuentasinhabilitadas.page';

const routes: Routes = [
  {
    path: '',
    component: CuentasinhabilitadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasinhabilitadasPageRoutingModule {}
