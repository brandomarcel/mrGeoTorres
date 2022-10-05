import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteasistenciascerradasPage } from './reporteasistenciascerradas.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteasistenciascerradasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteasistenciascerradasPageRoutingModule {}
