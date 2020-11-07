import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuiSommesNousPageRoutingModule } from './qui-sommes-nous-routing.module';

import { QuiSommesNousPage } from './qui-sommes-nous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuiSommesNousPageRoutingModule
  ],
  declarations: [QuiSommesNousPage]
})
export class QuiSommesNousPageModule {}
