import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternetEstablishedPageRoutingModule } from './internet-established-routing.module';

import { InternetEstablishedPage } from './internet-established.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternetEstablishedPageRoutingModule
  ],
  declarations: [InternetEstablishedPage]
})
export class InternetEstablishedPageModule {}
