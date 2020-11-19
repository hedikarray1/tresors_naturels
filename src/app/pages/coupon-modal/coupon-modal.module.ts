import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponModalPageRoutingModule } from './coupon-modal-routing.module';

import { CouponModalPage } from './coupon-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponModalPageRoutingModule
  ],
  declarations: [CouponModalPage]
})
export class CouponModalPageModule {}
