import { AllProductsPageModule } from './../all-products/all-products.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BottomNavigationPage } from './bottom-navigation.page';

const routes: Routes = [
  {
    path: '',
    component: BottomNavigationPage,
    children:[
      {
        path:"",
        children:[
          {
            path:"",
            loadChildren: () => import('../all-products/all-products.module').then( m => m.AllProductsPageModule)
          }
        ],          

      },
        {
          path:"all-products",
          children:[
            {
              path:"",
              loadChildren: () => import('../all-products/all-products.module').then( m => m.AllProductsPageModule)
            }
          ],          

        },
        {
          path: 'account',
          loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
        },
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BottomNavigationPageRoutingModule {}
