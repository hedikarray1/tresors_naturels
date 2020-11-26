import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoInternetPage } from './no-internet.page';

const routes: Routes = [
  {
    path: '',
    component: NoInternetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoInternetPageRoutingModule {}
