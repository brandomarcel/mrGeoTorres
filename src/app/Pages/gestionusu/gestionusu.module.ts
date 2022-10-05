import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionusuPageRoutingModule } from './gestionusu-routing.module';

import { GestionusuPage } from './gestionusu.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionusuPageRoutingModule,
    PipesModule
  ],
  declarations: [GestionusuPage]
})
export class GestionusuPageModule {}
