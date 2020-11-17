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
//import { FCM } from '@ionic-native/fcm/ngx'
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
//import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { IonicStorageModule } from '@ionic/storage';


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
    PopoverCardProductPageModule
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseX
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
