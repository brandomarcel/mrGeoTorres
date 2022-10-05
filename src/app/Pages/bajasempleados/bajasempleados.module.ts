import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BajasempleadosPageRoutingModule } from './bajasempleados-routing.module';

import { BajasempleadosPage } from './bajasempleados.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BajasempleadosPageRoutingModule,
    PipesModule
  ],
  declarations: [BajasempleadosPage]
})
export class BajasempleadosPageModule {}
