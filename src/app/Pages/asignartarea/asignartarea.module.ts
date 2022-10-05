import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignartareaPageRoutingModule } from './asignartarea-routing.module';

import { AsignartareaPage } from './asignartarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignartareaPageRoutingModule
  ],
  declarations: [AsignartareaPage]
})
export class AsignartareaPageModule {}
