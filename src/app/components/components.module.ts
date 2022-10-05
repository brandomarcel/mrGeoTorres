import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PopoverProfileComponent } from './popover-profile/popover-profile.component';
import { MenuComponent } from './menu/menu.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { RouterModule } from '@angular/router';
import { ValorconsumoComponent } from './valorconsumo/valorconsumo.component';
import { MapaAsistenciaComponent } from './mapa-asistencia/mapa-asistencia.component';
import { DetalleasistenciaComponent } from './detalleasistencia/detalleasistencia.component';
import { ListaempleadosComponent } from './listaempleados/listaempleados.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetallependienteComponent } from './detallependiente/detallependiente.component';
import { DetallenoticiasComponent } from './detallenoticias/detallenoticias.component';
import { DetalleasistenciausuarioComponent } from './detalleasistenciausuario/detalleasistenciausuario.component';



@NgModule({
  entryComponents: [
MapaAsistenciaComponent,
DetalleasistenciaComponent,
ListaempleadosComponent,
DetalleasistenciausuarioComponent
  ],
  declarations: [HeaderComponent, PopoverProfileComponent, MenuComponent,MenuButtonComponent,
                 ValorconsumoComponent, MapaAsistenciaComponent, DetalleasistenciaComponent,
                 ListaempleadosComponent, DetallependienteComponent, DetallenoticiasComponent,
                 DetalleasistenciausuarioComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PipesModule
  ], exports: [
    HeaderComponent, PopoverProfileComponent, MenuComponent, MenuButtonComponent, ValorconsumoComponent,
    MapaAsistenciaComponent, DetalleasistenciaComponent, ListaempleadosComponent, DetallependienteComponent, 
    DetallenoticiasComponent, DetalleasistenciausuarioComponent
  ]
})
export class ComponentsModule { }
