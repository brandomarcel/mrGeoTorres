import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CerrarAsistenciaPageRoutingModule } from './cerrar-asistencia-routing.module';

import { CerrarAsistenciaPage } from './cerrar-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CerrarAsistenciaPageRoutingModule
  ],
  declarations: [CerrarAsistenciaPage]
})
export class CerrarAsistenciaPageModule {}
