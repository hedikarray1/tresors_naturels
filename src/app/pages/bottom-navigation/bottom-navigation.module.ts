import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BottomNavigationPageRoutingModule } from './bottom-navigation-routing.module';

import { BottomNavigationPage } from './bottom-navigation.page';
import { PanierModalPageModule } from '../panier-modal/panier-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BottomNavigationPageRoutingModule,
    PanierModalPageModule
  ],
  declarations: [BottomNavigationPage]
})
export class BottomNavigationPageModule {}
