import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuiSommesNousPage } from './qui-sommes-nous.page';

const routes: Routes = [
  {
    path: '',
    component: QuiSommesNousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuiSommesNousPageRoutingModule {}
