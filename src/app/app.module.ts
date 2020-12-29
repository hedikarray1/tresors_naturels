import { OrderAddCouponModalPageModule } from './pages/order-add-coupon-modal/order-add-coupon-modal.module';
import { PopoverCardProductPageModule } from './pages/popovers/popover-card-product/popover-card-product.module';
import { PanierModalPageModule } from './pages/panier-modal/panier-modal.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Market } from '@ionic-native/market/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    FormsModule,  
    HttpClientModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    PanierModalPageModule,
    PopoverCardProductPageModule,
    OrderAddCouponModalPageModule,
    
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseX,
    Clipboard,
    Network,
    Market
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
