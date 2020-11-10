import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanierModalPage } from './panier-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PanierModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanierModalPageRoutingModule {}
