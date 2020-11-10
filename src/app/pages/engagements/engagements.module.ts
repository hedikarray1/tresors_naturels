import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EngagementsPageRoutingModule } from './engagements-routing.module';

import { EngagementsPage } from './engagements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EngagementsPageRoutingModule
  ],
  declarations: [EngagementsPage]
})
export class EngagementsPageModule {}
