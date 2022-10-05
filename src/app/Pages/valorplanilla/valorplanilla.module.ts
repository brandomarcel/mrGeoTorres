import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValorplanillaPageRoutingModule } from './valorplanilla-routing.module';

import { ValorplanillaPage } from './valorplanilla.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValorplanillaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ValorplanillaPage]
})
export class ValorplanillaPageModule {}
