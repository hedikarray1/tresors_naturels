import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderAddCouponModalPageRoutingModule } from './order-add-coupon-modal-routing.module';

import { OrderAddCouponModalPage } from './order-add-coupon-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderAddCouponModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OrderAddCouponModalPage]
})
export class OrderAddCouponModalPageModule {}
