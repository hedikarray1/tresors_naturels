import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponModalPage } from './coupon-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CouponModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponModalPageRoutingModule {}
