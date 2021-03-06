import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'bottom-navigation/home',
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
    path: 'product-by-category/:id',
    loadChildren: () => import('./pages/product-by-category/product-by-category.module').then( m => m.ProductByCategoryPageModule)
  },
  {
    path: 'qui-sommes-nous',
    loadChildren: () => import('./pages/qui-sommes-nous/qui-sommes-nous.module').then( m => m.QuiSommesNousPageModule)
  },
  {
    path: 'engagements',
    loadChildren: () => import('./pages/engagements/engagements.module').then( m => m.EngagementsPageModule)
  },
  {
    path: 'paiement-et-livraison',
    loadChildren: () => import('./pages/paiement-et-livraison/paiement-et-livraison.module').then( m => m.PaiementEtLivraisonPageModule)
  },
  {
    path: 'contactez-nous',
    loadChildren: () => import('./pages/contactez-nous/contactez-nous.module').then( m => m.ContactezNousPageModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./pages/panier/panier.module').then( m => m.PanierPageModule)
  },
  {
    path: 'panier-modal',
    loadChildren: () => import('./pages/panier-modal/panier-modal.module').then( m => m.PanierModalPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'popover-card-product',
    loadChildren: () => import('./pages/popovers/popover-card-product/popover-card-product.module').then( m => m.PopoverCardProductPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },
  {
    path: 'my-order-details/:id',
    loadChildren: () => import('./pages/my-order-details/my-order-details.module').then( m => m.MyOrderDetailsPageModule)
  },
  {
    path: 'coupon-modal',
    loadChildren: () => import('./pages/coupon-modal/coupon-modal.module').then( m => m.CouponModalPageModule)
  },
  {
    path: 'order-add-coupon-modal',
    loadChildren: () => import('./pages/order-add-coupon-modal/order-add-coupon-modal.module').then( m => m.OrderAddCouponModalPageModule)
  },
  {
    path: 'no-internet',
    loadChildren: () => import('./pages/no-internet/no-internet.module').then( m => m.NoInternetPageModule)
  },
  {
    path: 'internet-established',
    loadChildren: () => import('./pages/internet-established/internet-established.module').then( m => m.InternetEstablishedPageModule)
  },  {
    path: 'certification',
    loadChildren: () => import('./pages/certification/certification.module').then( m => m.CertificationPageModule)
  },









];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
