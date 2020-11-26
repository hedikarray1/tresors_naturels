import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { OrderService } from './../../services/order/order.service';
import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  panier: any[] = [];
  userState: boolean = false;
  billing: any;
  shipping: any;
  current_user: any;
  payment_methodes: any[];
  orders: any[] = [];
  not_empty=true;
  loading;
  status = {
    "pending": { title: "en attente", color: "warning" },
    "processing": { title: "en cours", color: "secondary" },
    "on-hold": { title: "en attente", color: "warning" },
    "completed": { title: "Terminé", color: "success" },
    "cancelled": { title: "Annulé", color: "danger" },
    "refunded": { title: "Remboursé", color: "tertiary" },
    "failed": { title: "échec", color: "danger" },
    "trash": { title: "En corbeille", color: "danger" }
  }
  constructor(private router: Router, 
    private modalCtrl: ModalController, 
    private storage: Storage,
     private OrderService: OrderService, 
     private UserService: UserService,
     private loadingCtrl:LoadingController
     ) { }

  ngOnInit() {
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserdata();
    
    });
  } 


  doRefresh(event) {
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
    });
    this.getUserdata();
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  

  ionViewDidEnter() {
  //  this.presentLoadingCustom();
  this.loading =  this.loadingCtrl.create({
    spinner: null,
    cssClass: 'custom-loading',
    message: `<ion-img src="../../../assets/Spinner1.gif"  style="background: transparent !important;"/>`,
   
  });
  this.loading.then((load)=>{
load.present();
  });
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserdata();
    });
   
  }

  async getUserdata() {
    if (this.userState) {
      //for online users

      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.UserService.getUserById(val.id).then((data: any) => {
          this.billing = data.billing;
          this.shipping = data.shipping;
          console.log("is online", data);
          this.current_user = data;
          this.getOrders();
        });
      });
    
    } else {
      console.log("is not online");

      this.current_user = { id: 0 };
    }

  }

  getOrders() {
    this.OrderService.getMyOrders(this.current_user.id).then((data: any[]) => {
      this.orders = data;
      if(this.orders.length>0){
        this.not_empty=true;
      }else{
        this.not_empty=false;

      }

      this.loading.then((load)=>{
load.dismiss();
      });
    });
  }


  toDetails(id) {
    this.router.navigate(["my-order-details/" + id])
  }


  async openCart() {


    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  async presentLoadingCustom() {
    let loading = await this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/Spinner1.gif"  style="background: transparent !important;"/>`,
      duration: 5000,
    });
    loading.present();
  }

}
