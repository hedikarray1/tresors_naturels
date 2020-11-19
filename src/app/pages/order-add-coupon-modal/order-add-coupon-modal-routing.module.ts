import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderAddCouponModalPage } from './order-add-coupon-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrderAddCouponModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderAddCouponModalPageRoutingModule {}
