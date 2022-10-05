import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarEmpleadoPageRoutingModule } from './ingresar-empleado-routing.module';

import { IngresarEmpleadoPage } from './ingresar-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarEmpleadoPageRoutingModule
  ],
  declarations: [IngresarEmpleadoPage]
})
export class IngresarEmpleadoPageModule {}
