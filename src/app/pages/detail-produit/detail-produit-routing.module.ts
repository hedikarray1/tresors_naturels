import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProduitPage } from './detail-produit.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProduitPageRoutingModule {}
