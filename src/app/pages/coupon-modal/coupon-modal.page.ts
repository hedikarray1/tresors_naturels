

import { Storage } from '@ionic/storage';
import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-coupon-modal',
  templateUrl: './coupon-modal.page.html',
  styleUrls: ['./coupon-modal.page.scss'],
})
export class CouponModalPage implements OnInit {

  allCoupons: any[] = [];
  MyCoupons: any[] = [];

  constructor(private storage: Storage,
    private orderService: OrderService,
  //  private clipboard: Clipboard,
    public toastController: ToastController) { }

  ngOnInit() {
    this.getCoupons();
  }
  ionViewDidEnter() {
    //this.getUserData();
    this.getCoupons();
  }

  getCoupons() {
    this.MyCoupons = [];
    this.allCoupons = [];
    this.storage.get('auth-user').then((val) => {
      console.log('auth-user', val);
      this.orderService.getCountMyCoupons().then((data1: any[]) => {
        this.orderService.getAllMyCoupons(this.orderService.totalcoupon).then((data2: any[]) => {
          console.log('data all coupon', data2);
          this.MyCoupons = [];
          this.allCoupons = [];
          this.allCoupons = data2;

          this.allCoupons.forEach(element1 => {
            element1.meta_data.forEach(element => {
              if (element.key == "_acfw_loyalty_program_user" && element.value == val.id) {
                element1.used=false;
                element1.used_text="disponible";
                element1.used_by.forEach(element2 => {
                  if(element2==val.id){
                    element1.used=true;
                    element1.used_text="utilisé";
                  }
                });
                this.MyCoupons.push(element1);
              }
            });
          });
          console.log("mes coupons:",this.MyCoupons);
        });
      });

    });
  }

 async copyToClipBoard(code){
  /*  this.clipboard.copy(code);
   const toast=await this.toastController.create({
    message: 'Le code du coupon est copié avec succés',
    duration: 2000
  });
  toast.present();
*/
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.getCoupons();
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



}
