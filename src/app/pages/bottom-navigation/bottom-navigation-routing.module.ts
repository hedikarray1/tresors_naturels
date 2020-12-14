import { AllProductsPageModule } from './../all-products/all-products.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BottomNavigationPage } from './bottom-navigation.page';

const routes: Routes = [
  {
    path: '',
    component: BottomNavigationPage,
    children: [
      {
        path: "",
        loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)

      },
      {
        path: "all-products",
        loadChildren: () => import('../all-products/all-products.module').then(m => m.AllProductsPageModule)

      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../category/category.module').then(m => m.CategoryPageModule)
      },
      {
        path: 'product-by-category/:id',
        loadChildren: () => import('../product-by-category/product-by-category.module').then(m => m.ProductByCategoryPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
      }, {
        path: 'qui-sommes-nous',
        loadChildren: () => import('../qui-sommes-nous/qui-sommes-nous.module').then(m => m.QuiSommesNousPageModule)
      },
      {
        path: 'engagements',
        loadChildren: () => import('../engagements/engagements.module').then(m => m.EngagementsPageModule)
      },
      {
        path: 'paiement-et-livraison',
        loadChildren: () => import('../paiement-et-livraison/paiement-et-livraison.module').then(m => m.PaiementEtLivraisonPageModule)
      },
      {
        path: 'contactez-nous',
        loadChildren: () => import('../contactez-nous/contactez-nous.module').then(m => m.ContactezNousPageModule)
      },
      {
        path: 'panier',
        loadChildren: () => import('../panier/panier.module').then(m => m.PanierPageModule)
      },

      {
        path: 'my-orders',
        loadChildren: () => import('../my-orders/my-orders.module').then(m => m.MyOrdersPageModule)
      },
      {
        path: 'my-order-details/:id',
        loadChildren: () => import('../my-order-details/my-order-details.module').then(m => m.MyOrderDetailsPageModule)
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BottomNavigationPageRoutingModule { }
