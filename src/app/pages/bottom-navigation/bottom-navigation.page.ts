import { GlobalVarServiceService } from './../../services/globalVarService/global-var-service.service';
import { Storage } from '@ionic/storage';
import { PanierService } from './../../services/panier/panier.service';

import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.page.html',
  styleUrls: ['./bottom-navigation.page.scss'],
})
export class BottomNavigationPage implements OnInit {

  panierNbr: number = 0;
  userState: boolean = false;
  mySubscription: Subscription

  constructor(
    private panierService: PanierService,
    private storage: Storage,
    private GLobalVarService:GlobalVarServiceService,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(true);
    this.GLobalVarService.getObservable().subscribe((data) => {
    //  console.log('Data received', data);
    this.panierNbr=data.PanierNbr;
  });
    
}
ionViewWillEnter() {
  this.menuCtrl.enable(true);
  this.GLobalVarService.getObservable().subscribe((data) => {
    //  console.log('Data received', data);
    this.panierNbr=data.PanierNbr;
  });
 }

  async ngOnInit() {
    this.GLobalVarService.getObservable().subscribe((data) => {
      //  console.log('Data received', data);
      this.panierNbr=data.PanierNbr;
    });

    await this.storage.get('user-state').then(async (val) => {
      console.log('user state', val);
      this.userState = val;
      if (this.userState){
        this.panierService.getCartItemNbr(val.id).then((d1)=>{
          this.GLobalVarService.publishSomeData({
            PanierNbr: d1["data"]
        });
      });
      }
  
    });

  }

  async ionViewDidEnter() {
    this.GLobalVarService.getObservable().subscribe((data) => {
      //  console.log('Data received', data);
      this.panierNbr=data.PanierNbr;
    });
    await this.storage.get('user-state').then(async (val) => {
      console.log('user state', val);
      this.userState = val;
      if (this.userState){
        this.panierService.getCartItemNbr(val.id).then((d1)=>{
          this.GLobalVarService.publishSomeData({
            PanierNbr: d1["data"]
        });
      });
      }
    });

  }







}
