import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanierModalPageRoutingModule } from './panier-modal-routing.module';

import { PanierModalPage } from './panier-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanierModalPageRoutingModule
  ],
  declarations: [PanierModalPage]
})
export class PanierModalPageModule {}
