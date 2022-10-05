import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarNoticiasPageRoutingModule } from './ingresar-noticias-routing.module';

import { IngresarNoticiasPage } from './ingresar-noticias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarNoticiasPageRoutingModule
  ],
  declarations: [IngresarNoticiasPage]
})
export class IngresarNoticiasPageModule {}
