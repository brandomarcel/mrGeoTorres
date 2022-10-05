import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentasinhabilitadasPageRoutingModule } from './cuentasinhabilitadas-routing.module';

import { CuentasinhabilitadasPage } from './cuentasinhabilitadas.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentasinhabilitadasPageRoutingModule,
    PipesModule
  ],
  declarations: [CuentasinhabilitadasPage]
})
export class CuentasinhabilitadasPageModule {}
