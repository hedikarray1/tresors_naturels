import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductByCategoryPage } from './product-by-category.page';

const routes: Routes = [
  {
    path: '',
    component: ProductByCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductByCategoryPageRoutingModule {}
