import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';
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


  constructor(
    private modalCtrl: ModalController,
    private orderService: OrderService,
    private loadingController: LoadingController,
    private fb: FormBuilder,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.formCoupon = this.fb.group({
      coupon: ['', [Validators.required]],
    });


  }

  close() {
    this.modalCtrl.dismiss();
  }

  appliquerCodePromo() {
    this.getCoupon(this.formCoupon.value.coupon);
  }


  async getCoupon(code) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.orderService.getCoupon(code).then(async (data: any[]) => {
      console.log('coupon info: ', data);
      await loading.dismiss();
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
        if (this.checkCouponExist(data[0].id)) {
          const alert = await this.alertController.create({
            header: "Code promo est déja utilisé",
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
          this.coupon_data = data[0];
          this.modalCtrl.dismiss(this.coupon_data);
        }

      }



    }, async (res) => {
      await loading.dismiss();

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





}
