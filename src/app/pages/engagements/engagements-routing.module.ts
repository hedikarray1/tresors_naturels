import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngagementsPage } from './engagements.page';

const routes: Routes = [
  {
    path: '',
    component: EngagementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngagementsPageRoutingModule {}
