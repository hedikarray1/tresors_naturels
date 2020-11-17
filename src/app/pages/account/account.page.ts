import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { StorageService } from './../../services/storage/storage.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { min } from 'rxjs/operators';

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
  Points;
form:FormGroup;
  livraisonTextButton="Modifier"
  facturationTextButton="Modifier"
  constructor(
    private UserService:UserService,
    private StorageService:StorageService,
    private modalCtrl: ModalController,
    private storage : Storage,
    private formBuilder:FormBuilder
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
    this.form = this.formBuilder.group({
      points: new FormControl(this.Points,Validators.compose([Validators.min(30)]))
     
    });
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
    let    metadataArray:any[]=[];
    metadataArray=data.meta_data;
    this.User.pointsData=metadataArray.filter(x=>x.key=="_acfw_loyalprog_user_total_points")[0];
   // console.log("points: ",metadataArray.filter(x=>x.key=="_acfw_loyalprog_user_total_points"));
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
