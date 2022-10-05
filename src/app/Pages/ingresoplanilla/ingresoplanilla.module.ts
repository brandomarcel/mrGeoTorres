import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoplanillaPageRoutingModule } from './ingresoplanilla-routing.module';

import { IngresoplanillaPage } from './ingresoplanilla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoplanillaPageRoutingModule
  ],
  declarations: [IngresoplanillaPage]
})
export class IngresoplanillaPageModule {}
