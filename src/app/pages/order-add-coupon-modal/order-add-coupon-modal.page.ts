import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-add-coupon-modal',
  templateUrl: './order-add-coupon-modal.page.html',
  styleUrls: ['./order-add-coupon-modal.page.scss'],
})
export class OrderAddCouponModalPage implements OnInit {

  coupons: any[] = [];

  coupon_data: any = {};
  formCoupon: FormGroup;
  currentUser: any = {};
  loading;

  constructor(
    private modalCtrl: ModalController,
    private orderService: OrderService,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private alertController: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.formCoupon = this.fb.group({
      coupon: ['', [Validators.required]],
    });
    this.storage.get('auth-user').then((val) => {
      console.log('auth-user', val);
      this.currentUser = val;
    });


  }

  close() {
    this.modalCtrl.dismiss();
  }

  appliquerCodePromo() {
    this.getCoupon(this.formCoupon.value.coupon);
  }


  async getCoupon(code) {
    this.loading =  this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,
     
    });
    this.loading.then((load)=>{
      load.present();
        });
    this.orderService.getCoupon(code).then(async (data: any[]) => {
      console.log('coupon info: ', data);
      this.loading.then((load)=>{
        load.dismiss();
              });
      if (data.length == 0) {
        const alert = await this.alertController.create({
          header: "Code promo n'existe pas",
          mode: 'ios',
          message: "",
          buttons: [

            {
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
              handler: () => {
                alert.dismiss();
              }
            },
          ]
        });
        await alert.present();
      } else {
        let used = false;
        data[0].used_by.forEach(element2 => {
          if (element2 == this.currentUser.id) {
            used = true;
          }
        });
        if (used) {
          const alert = await this.alertController.create({
            header: "Vous avez déja utilisé ce code de promotion ",
            mode: 'ios',
            message: "",
            buttons: [
              {
                text: "D'accord",
                cssClass: 'btn-alert-connexion',
                handler: () => {
                  alert.dismiss();
                }
              },
            ]
          });
          await alert.present();
        } else {
          if (this.coupons.length > 0) {

            const alert = await this.alertController.create({
              header: "Vous avez déja utilisé un code promo . Voulez vous le remplacer ?",
              mode: 'ios',
              message: "",
              buttons: [
                {
                  text: 'Non',
                  role: 'cancel',
                  cssClass: 'btn-alert-ignorer',
                  handler: () => {
                    alert.dismiss();
                  }
                },
                {
                  text: 'Oui',
                  cssClass: 'btn-alert-connexion',
                  handler: () => {
                    this.coupon_data = data[0];
                    this.modalCtrl.dismiss(this.coupon_data);
                  }
                },
              ]
            });
            await alert.present();

          } else {
            
              if (parseInt(data[0].usage_count + "") >= parseInt(data[0].usage_limit + "")) {
              const alert = await this.alertController.create({
                header: "le code de promotion a atteint sa limite d'utilisation",
                mode: 'ios',
                message: "",
                buttons: [
                  {
                    text: "D'accord",
                    cssClass: 'btn-alert-connexion',
                    handler: () => {
                      alert.dismiss();
                    }
                  },
                ]
              });
              await alert.present();
            }else {
              this.coupon_data = data[0];
              this.modalCtrl.dismiss(this.coupon_data);
            }
          }
        }



      }



    }, async (res) => {
      this.loading.then((load)=>{
        load.dismiss();
              });

      console.log("error", res);
      const alert = await this.alertController.create({
        header: 'Erreur lors de recherche du code promo',
        mode: 'ios',
        message: res.error.message,
        buttons: [

          {
            text: "D'accord",
            cssClass: 'btn-alert-connexion',
            handler: () => {
              alert.dismiss();
            }
          },
        ]
      });
      await alert.present();
    }
    )
  }

  checkCouponExist(cooupon_id): boolean {

    return this.coupons.some(r => r.id === cooupon_id);

  }


  checkCouponSpecialExist(): boolean {

    return this.coupons.some(r => r.usage_limit === null);

  }



}
