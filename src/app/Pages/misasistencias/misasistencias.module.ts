import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisasistenciasPageRoutingModule } from './misasistencias-routing.module';

import { MisasistenciasPage } from './misasistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisasistenciasPageRoutingModule
  ],
  declarations: [MisasistenciasPage]
})
export class MisasistenciasPageModule {}
