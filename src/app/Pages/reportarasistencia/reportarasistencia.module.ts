import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportarasistenciaPageRoutingModule } from './reportarasistencia-routing.module';

import { ReportarasistenciaPage } from './reportarasistencia.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportarasistenciaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReportarasistenciaPage]
})
export class ReportarasistenciaPageModule {}
