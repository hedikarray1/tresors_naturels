import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'bottom-navigation',
    pathMatch: 'full'
  },
  {
    path: 'all-products',
    loadChildren: () => import('./pages/all-products/all-products.module').then( m => m.AllProductsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detail-produit/:id',
    loadChildren: () => import('./pages/detail-produit/detail-produit.module').then( m => m.DetailProduitPageModule)
  },
  {
    path: 'bottom-navigation',
    loadChildren: () => import('./pages/bottom-navigation/bottom-navigation.module').then( m => m.BottomNavigationPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'product-by-category/:category/:id',
    loadChildren: () => import('./pages/product-by-category/product-by-category.module').then( m => m.ProductByCategoryPageModule)
  },




];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
