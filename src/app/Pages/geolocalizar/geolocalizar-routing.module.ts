import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocalizarPage } from './geolocalizar.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocalizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocalizarPageRoutingModule {}
