import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciamapaPageRoutingModule } from './asistenciamapa-routing.module';

import { AsistenciamapaPage } from './asistenciamapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciamapaPageRoutingModule
  ],
  declarations: [AsistenciamapaPage]
})
export class AsistenciamapaPageModule {}
