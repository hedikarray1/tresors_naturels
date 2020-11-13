import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { StorageService } from './../../services/storage/storage.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  facturation= false;
  livraison= false;
  livraisoninputs=true;
  facturationinputs=true;
  update_infosCard=false;

  livraisonTextButton="Modifier"
  facturationTextButton="Modifier"
  constructor(
    private UserService:UserService,
    private StorageService:StorageService,
    private modalCtrl: ModalController,
    private storage : Storage
    ) { }

    
async openCart() {
  
 
    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }
  
 User:any={};
  ngOnInit() {
  this.getUserData();
  }
  ionViewDidEnter(){
    this.getUserData();

  }
  displayHideFacturationCard(){
    this.livraison=false;
this.facturation=!this.facturation;

  }

  displayHideUpdateInfosCard(){
    this.update_infosCard=!this.update_infosCard;
      }

  displayHideLivraisonCard(){
    this.livraison=!this.livraison;
    this.facturation=false;

  }
  
  LivraisonAction(){
    if(this.livraisonTextButton=="Modifier"){
      this.livraisoninputs=false;
this.livraisonTextButton="Sauvegarder"
    }else{
this.updateUser();
      this.livraisoninputs=true;
      this.livraisonTextButton="Modifier"

    }
  }

  FacturationAction(){
    if(this.facturationTextButton=="Modifier"){
      this.facturationinputs=false;
this.facturationTextButton="Sauvegarder"
    }else{
      this.updateUser();
      this.facturationinputs=true;
      this.facturationTextButton="Modifier"
    }
  }

  getUserData(){

    this.storage.get('auth-user').then((val) => {
      console.log('auth-user', val);
      this.UserService.getUserById(val.id).subscribe((data:any)=>{
        this.User=data;
            });
    });
    
  }

  updateUser(){

    this.UserService.updateUser(this.User).subscribe((data:any)=>{
this.User=data;
this.facturation=false;
this.livraison=false;
    });
  }
}
