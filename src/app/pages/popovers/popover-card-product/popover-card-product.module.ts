import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverCardProductPageRoutingModule } from './popover-card-product-routing.module';

import { PopoverCardProductPage } from './popover-card-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverCardProductPageRoutingModule
  ],
  declarations: [PopoverCardProductPage]
})
export class PopoverCardProductPageModule {}
