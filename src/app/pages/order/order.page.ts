import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OrderAddCouponModalPage } from './../order-add-coupon-modal/order-add-coupon-modal.page';
import { Storage } from '@ionic/storage';
import { UserService } from './../../services/user/user.service';
import { StorageService } from './../../services/storage/storage.service';
import { PanierService } from './../../services/panier/panier.service';
import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  panier: any[] = [];

  totalPanier = 0;
  totalOrder = 0;
  totalCoupon = 0;
  totalLaivraison = 0;

  showFacturation = true;
  showLivraison = false;

  segmentValue = 'Facturation';

  userState: boolean = false;
  billing: any = {};
  shipping: any = {};
  current_user: any = {};
  payment_methodes: any[] = [];
  shipping_zones: any[] = [];
  coupon_data: any[] = [];

  selectedpayment: any;

  selectedShippingMethod: any;
  selectedzone;
  notes = "";
  constructor(
    private UserService: UserService,
    private storage: Storage,
    private OrderService: OrderService,
    private PanierService: PanierService,
    private StorageService: StorageService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private loadingCtrl:LoadingController
  ) { }

  ngOnInit() {

    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();

      this.getShippinZones();

      this.getUserdata();
    });

  }

  ionViewDidEnter() {

    this.presentLoadingCustom();
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();

      this.getShippinZones();

      this.getUserdata();
    });
    }
  
  getUserdata() {
    if (this.userState) {
      //for online users
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.UserService.getUserById(val.id).then((data: any) => {
          this.billing = data.billing;
          this.shipping = data.shipping;
          console.log("is online", data);
          this.current_user = data;
        });
      });

    } else {
      console.log("is not online");

      this.current_user = { id: 0 };
    }
  }

  getPAymentmethodes(zone_id) {
    this.OrderService.getAllPaymentMethods(zone_id).then((data: any[]) => {
      console.log('shipping methods : ', data)
      this.payment_methodes = data;
      this.selectedpayment = this.payment_methodes[0].id;
    });
  }
  getShippinZones() {
    this.OrderService.getAllShippingZone().then((data: any[]) => {
      console.log('shipping zones : ', data);
      this.shipping_zones = data;
      this.shipping_zones.splice(0, 1);
      console.log('shipping zones after edit : ', this.shipping_zones);
      this.selectedzone = this.shipping_zones[0].id;
      this.getPAymentmethodes(this.shipping_zones[0].id);
    });
  }



  async getPanier() {
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.PanierService.getCartFromServer(val.id).then((res: any[]) => {
          this.panier = res['data'];
          this.totalPanier = parseFloat(res['subtotal']);

          this.panier.forEach(element => {
            element.subtotal = element.subtotal + "";
            element.total = element.total + "";
          });
        })
      })
    } else {

    }
  }
  doRefresh(event) {
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();
 
    this.getUserdata();
    });
    
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  

  async createOrder() {
    const loading = await this.loadingController.create();
    await loading.present();

    console.log('commander ***********************');
    console.log('order user id', this.current_user.id);
    console.log('order coupon', this.coupon_data);

    console.log('order note', this.notes);
    console.log('order item', this.panier);
    console.log('order billing', this.billing);
    console.log('order shippping', this.shipping);

    let shippingMethod: any[] = [];
    let shipping_line = {
      "method_id": this.selectedShippingMethod.method_id,
      "method_title": this.selectedShippingMethod.method_title,
      "total": this.selectedShippingMethod.settings.cost.value
    };
    shippingMethod.push(shipping_line);

    console.log('order shippingMethod ', shippingMethod);
    this.OrderService.CreateOrder(
      this.billing,
      this.shipping,
      this.current_user.id,
      this.coupon_data,
      this.notes,
      "TND",
      shippingMethod,
      this.panier
    ).then(async (res: any) => {
      let coupnosToupdate:any[]=[];
      console.log("succes", res);
     /*   if(this.coupon_data.length>0){
          this.coupon_data.forEach(element => {
            let used:any[]=[];
           used= element.used_by;
           used.push(this.current_user.id+"");
           element.used_by=used;
           coupnosToupdate.push(element);
          });
          this.OrderService.updateCoupon(coupnosToupdate).then((data:any)=>{
            console.log("updated used by in coupons");
                       });
            
        }*/
      await loading.dismiss();

      const alert = await this.alertController.create({
        header: "Commande passée avec succés",
        mode: 'ios',
        message: '',
        buttons: [

          {
            text: "D'accord",
            cssClass: 'btn-alert-connexion',
            handler: () => {
              
              this.PanierService.emptyCartFromServer(this.current_user.id).then((data: any) => {
                console.log('data empty panier', data);
                alert.dismiss();
                this.router.navigateByUrl('/bottom-navigation/my-orders', { replaceUrl: true });
              })

            }
          },
        ]
      });
      await alert.present();


    }, async (err) => {
      console.log('erreur', err);
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: "Erreur lors de la commande",
        mode: 'ios',
        message: err.error.message,
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
    );

  }



  selectZone() {

    console.log('selected zone', this.selectedzone);
    this.getPAymentmethodes(this.selectedzone);
  }

  selectMethod() {
    // this.getTotalOrder();
    console.log('selected shipping id', this.selectedpayment);

    this.selectedShippingMethod = this.payment_methodes.filter(x => x.id == this.selectedpayment)[0];
    console.log('selected shipping ', this.selectedShippingMethod);
    if (this.selectedShippingMethod != undefined) {
      if (this.selectedShippingMethod.settings.cost.value != '' || this.selectedShippingMethod?.settings.cost.value != null) {
        //   this.selectedShippingMethod.settings.cost.value.replace('.',',');
        this.totalLaivraison = parseFloat(this.selectedShippingMethod.settings.cost.value);
      } else
        this.totalLaivraison = 0;
    }
  }


  async openAddCouponModal() {

    let modal = await this.modalCtrl.create({
      component: OrderAddCouponModalPage,
      componentProps: {
        coupons: this.coupon_data
      },
      cssClass: 'add-coupon-modal'
    });
    modal.onWillDismiss().then(async (data) => {

      if (data['data'] != undefined) {

        if (data['data'].amount > this.totalOrder) {
          data['data'].amoun = parseFloat(data['data'].amount) - (parseFloat(data['data'].amount) - this.totalOrder)
          this.coupon_data.push(data['data']);
          console.log("modal return :", this.coupon_data);
          this.totalCoupon = this.totalCoupon + parseFloat(data['data'].amount);
        } else {
          this.coupon_data.push(data['data']);
          console.log("modal return :", this.coupon_data);

          this.totalCoupon = this.totalCoupon + parseFloat(data['data'].amount);

        }
      }

    });
    modal.present();
  }

  hasValues(obj) {
    return Object.values(obj).some(v => v !== null && typeof v !== "undefined");
  }

  suuprimerCoupon(i) {
    this.coupon_data.splice(i, 1);
    console.log(i);
  }

  getTotalOrder(): number {
    this.totalOrder = this.totalPanier + this.totalLaivraison - this.totalCoupon;
    if (this.totalOrder < 0){
      return 0 ;
    }else{
      return this.totalOrder ;
    }
  }

  showSegment() {
    this.showFacturation = !this.showFacturation;
    this.showLivraison = !this.showLivraison;
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
