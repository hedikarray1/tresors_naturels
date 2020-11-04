import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private UserService:UserService) { }
 User:any={};
  ngOnInit() {
  this.getUserData();
  }

  displayHideFacturationCard(){
this.facturation=!this.facturation;
  }

  displayHideUpdateInfosCard(){
    this.update_infosCard=!this.update_infosCard;
      }

  displayHideLivraisonCard(){
    this.livraison=!this.livraison;

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
    this.UserService.getUsetByEmail().subscribe((data:any)=>{
      this.User=data;
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
