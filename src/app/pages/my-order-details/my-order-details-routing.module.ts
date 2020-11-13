import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrderDetailsPage } from './my-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrderDetailsPageRoutingModule {}
