import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProductsPage } from './all-products.page';

const routes: Routes = [
  {
    path: '',
    component: AllProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProductsPageRoutingModule {}
