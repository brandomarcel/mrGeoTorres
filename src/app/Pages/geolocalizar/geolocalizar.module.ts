import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocalizarPageRoutingModule } from './geolocalizar-routing.module';

import { GeolocalizarPage } from './geolocalizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocalizarPageRoutingModule
  ],
  declarations: [GeolocalizarPage]
})
export class GeolocalizarPageModule {}
