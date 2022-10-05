import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiasgestionPageRoutingModule } from './noticiasgestion-routing.module';

import { NoticiasgestionPage } from './noticiasgestion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiasgestionPageRoutingModule
  ],
  declarations: [NoticiasgestionPage]
})
export class NoticiasgestionPageModule {}
