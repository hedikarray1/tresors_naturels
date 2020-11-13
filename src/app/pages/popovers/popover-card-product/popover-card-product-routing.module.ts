import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverCardProductPage } from './popover-card-product.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverCardProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverCardProductPageRoutingModule {}
