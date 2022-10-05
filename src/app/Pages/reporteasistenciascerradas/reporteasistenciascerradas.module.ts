import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteasistenciascerradasPageRoutingModule } from './reporteasistenciascerradas-routing.module';

import { ReporteasistenciascerradasPage } from './reporteasistenciascerradas.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteasistenciascerradasPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ReporteasistenciascerradasPage]
})
export class ReporteasistenciascerradasPageModule {}
