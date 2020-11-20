import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { LottieAnimationViewModule } from 'ng-lottie';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    CustomFormsModule,
    ReactiveFormsModule,
    LottieAnimationViewModule.forRoot()

  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
