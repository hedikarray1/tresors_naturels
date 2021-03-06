import { async } from '@angular/core/testing';
import { ProductService } from './../../services/product/product.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderAddCouponModalPage } from './../order-add-coupon-modal/order-add-coupon-modal.page';
import { Storage } from '@ionic/storage';
import { UserService } from './../../services/user/user.service';
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
  productsPromo: any[] = [];
  productsPromoResult: any[] = [];

  arrayOutputNoPromo: any[] = []
  arrayCouponProductAppliquer: any[] = [];


  billingEmailForm: FormGroup;
  billingPhoneForm: FormGroup;

  billingForm: FormGroup;
  shippingForm: FormGroup;



  totalProductsPromo = 0;
  totalProductsNoPromo = 0;

  totaleCouponProduct = 0;

  totalPanier = 0;
  pointsGain = 0;
  totalOrder = 0;
  totalCoupon = 0;
  totalLaivraison = 0;

  selecteMethodState = false;
  selecteZoneState = false;

  showFacturation = true;
  showLivraison = false;

  segmentValue = 'Facturation';
  userConnecte: any;
  feeLines: any[] = [];
  userState: boolean = false;
  billing: any = {};
  shipping: any = {};
  current_user: any = {};
  payment_methodes: any[] = [];
  shipping_zones: any[] = [];
  coupon_data: any[] = [];
  loading;
  selectedpayment: any;
  oneCatch = false;

  selectedShippingMethod: any;
  selectedzone;
  notes = "";

  validation_messages = {
    email: [
      { type: 'required', message: 'Ce champ est obligatoire' },
      { type: 'pattern', message: "L'adresse  électronique doit être valide." },
    ],
    phone: [
      { type: 'required', message: 'Ce champ est obligatoire' },
      { type: 'pattern', message: "Ce champs doit se composer que des chiffres" },
      { type: 'minlength', message: "Ce champs doit comporter 8 chiffres" },
      { type: 'maxlength', message: "Ce champs doit comporter 12 chiffres au maximum" },
    ],
    last_name: [
      { type: 'required', message: 'Ce champ est obligatoire' },
      { type: 'pattern', message: 'Le nom ne doit contenir que des lettres' }
    ],
    first_name: [
      { type: 'required', message: 'Ce champ est obligatoire' },
      { type: 'pattern', message: 'Le nom ne doit contenir que des lettres' }
    ],
    address_1: [
      { type: 'required', message: 'Ce champ est obligatoire' },
    ],
    address_2: [
    ],
    city: [
      { type: 'required', message: 'Ce champ est obligatoire' },
      { type: 'pattern', message: 'Le nom ne doit contenir que des lettres' }
    ],
    country: [
      { type: 'required', message: 'Ce champ est obligatoire' },
      { type: 'pattern', message: 'Le nom ne doit contenir que des lettres' }
    ],
    postcode: [
      { type: 'required', message: 'Ce champ est obligatoire' },
      { type: 'pattern', message: "Ce champs doit se composer que des chiffres" }
    ],
  };


  constructor(
    private UserService: UserService,
    private storage: Storage,
    private OrderService: OrderService,
    private PanierService: PanierService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private ProductService: ProductService,
  ) { }

  ngOnInit() {


    this.billingForm = this.fb.group({
      last_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      first_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      address_1: new FormControl('', Validators.compose([
        Validators.required,
      ])),

      address_2: new FormControl('', Validators.compose([

      ])),
      company: new FormControl('', Validators.compose([

      ])),
      state: new FormControl('', Validators.compose([

      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      postcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(8),
        Validators.pattern('[0-9+]+$')
      ]))
    });

    this.shippingForm = this.fb.group({
      last_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      first_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      address_1: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      address_2: new FormControl('', Validators.compose([

      ])),

      company: new FormControl('', Validators.compose([

      ])),
      state: new FormControl('', Validators.compose([

      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
      ])),
      postcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+$')
      ]))
    });

    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
    console.log('res parse floart', parseFloat('hedi'));
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getPanier();

      this.getShippinZones();
      this.getPAymentmethodes(1);
      this.getUserdata();
    });

  }

  setFormControl() {
    this.billingForm.setValue(this.billing);
    this.shippingForm.setValue(this.shipping);
  }


  setProductsPromo() {
    this.panier.forEach(element => {
      let p = {
        id: element.product_id,
        total: element.total
      }
      this.productsPromo.push(p);
    });
    console.log('productsPromo :', this.productsPromo);
  }

  checkProductsPromo() {
    this.OrderService.checkProductsPromo(this.productsPromo).then(async (res: any[]) => {
      console.log('resultat checkProductsPromo : ', res);
      this.productsPromoResult = res
      this.arrayOutputNoPromo = this.productsPromoResult.filter((data) => data.promotion == 'nopromo');
      this.getProductForarrayOutputNoPromo();
      console.log('arrayOutputNoPromo', this.arrayOutputNoPromo);
      this.setTotalePromo();
    }, (error) => {
      console.log("error", error);
    });
  }

  getProductForarrayOutputNoPromo() {
    this.arrayOutputNoPromo.forEach(async (element, index) => {
      await this.ProductService.getProductCustom(element.id).then((data: any) => {

        element.product = data;

      }).catch(async (reason) => {
        console.log("error ", reason);
        this.arrayOutputNoPromo.splice(index, 1);
      });
    });

  }

  setTotalePromo() {
    this.totalProductsPromo = 0;
    this.totalProductsNoPromo = 0
    this.productsPromoResult.forEach(element => {
      if (element.promotion == 'promo') {
        this.totalProductsPromo = parseFloat(this.totalProductsPromo + "") + parseFloat(element.total);
      }
    });

    this.totalProductsNoPromo = parseFloat(this.totalPanier + '') - parseFloat(this.totalProductsPromo + '');
    this.totalProductsNoPromo = parseFloat(this.totalProductsNoPromo + '');


    console.log('totalPanier', this.totalPanier);
    console.log('totalProductsPromo', this.totalProductsPromo);
    console.log('totalProductsNoPromo', this.totalProductsNoPromo);
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
          this.loading.then((load) => {
            load.dismiss();
          });
          this.setFormControl();
        }).catch(async (reason) => {
          if (this.oneCatch) {

          } else {
            this.oneCatch = true
            this.loading.then((load) => {
              load.dismiss();
            });
            console.log('error :', reason);
            const alert = await this.alertController.create({
              header: "Erreur lors du chargement de la page",
              mode: 'ios',
              message: "",
              buttons: [

                {
                  text: "D'accord",
                  cssClass: 'btn-alert-connexion',
                  handler: () => {
                    alert.dismiss();
                    this.oneCatch = false;

                  }
                },
              ]
            });
            await alert.present();
          }
        });
      });

    } else {
      console.log("is not online");

      this.current_user = { id: 0 };
    }
  }

  getPAymentmethodes(zone_id) {
    this.OrderService.getAllPaymentMethods(zone_id).then((data: any[]) => {
      console.log('shipping methods : ', data);
      this.payment_methodes = data;
      this.selectedpayment = this.payment_methodes[0].id;
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.oneCatch = true
        this.loading.then((load) => {
          load.dismiss();
        });
        console.log('error :', reason);
        const alert = await this.alertController.create({
          header: "Erreur lors du chargement de la page",
          mode: 'ios',
          message: "",
          buttons: [

            {
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
              handler: () => {
                alert.dismiss();
                this.oneCatch = false;

              }
            },
          ]
        });
        await alert.present();
      }
    });
  }
  getShippinZones() {

    this.OrderService.getAllShippingZone().then((data: any[]) => {
      console.log('shipping zones : ', data);
      this.shipping_zones = data;
      this.shipping_zones.splice(0, 1);
      console.log('shipping zones after edit : ', this.shipping_zones);
      this.selectedzone = this.shipping_zones[0].id;

    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.oneCatch = true
        this.loading.then((load) => {
          load.dismiss();
        });
        console.log('error :', reason);
        const alert = await this.alertController.create({
          header: "Erreur lors du chargement de la page",
          mode: 'ios',
          message: "",
          buttons: [

            {
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
              handler: () => {
                alert.dismiss();
                this.oneCatch = false;

              }
            },
          ]
        });
        await alert.present();
      }
    });
  }



  async getPanier() {
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.PanierService.getCartFromServer(val.id).then((res: any[]) => {
          console.log('res data get panier :', res);
          this.panier = res['data'];
          console.log('panier : ', this.panier);
          this.totalPanier = parseFloat(res['subtotal']);
          this.pointsGain = this.totalPanier / 10;
          this.pointsGain = parseInt(this.pointsGain + "");
          this.panier.forEach(element => {
            element.subtotal = element.subtotal + "";
            element.total = element.total + "";
          });
          this.setProductsPromo();
          this.checkProductsPromo();
        }).catch(async (reason) => {
          if (this.oneCatch) {

          } else {
            this.oneCatch = true
            this.loading.then((load) => {
              load.dismiss();
            });
            console.log('error :', reason);
            const alert = await this.alertController.create({
              header: "Erreur lors du chargement de la page",
              mode: 'ios',
              message: "",
              buttons: [

                {
                  text: "D'accord",
                  cssClass: 'btn-alert-connexion',
                  handler: () => {
                    alert.dismiss();
                    this.oneCatch = false;

                  }
                },
              ]
            });
            await alert.present();
          }
        });
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
      event.target.complete();
    }, 2000);
  }


  async createOrder() {
    if (this.selecteZoneState === false) {
      const alert = await this.alertController.create({
        header: "Vous devez selectionner la zone d'expédition",
        mode: 'ios',
        message: '',
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
      if (this.selecteMethodState === false) {
        const alert = await this.alertController.create({
          header: "Vous devez selectionner la méthode d'expédition ",
          mode: 'ios',
          message: '',
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
        if (!this.billingForm.valid) {
          const alert = await this.alertController.create({
            header: "Le formulaire de facturation est invalide ",
            mode: 'ios',
            message: 'Vous devez remplir les champs manquants dans le formulaire de facturation .',
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
          if (!this.shippingForm.valid) {
            const alert = await this.alertController.create({
              header: "Le formulaire de livraison est invalide",
              mode: 'ios',
              message: 'Vous devez remplir les champs manquants dans le formulaire de livraison .',
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
            this.loading = this.loadingCtrl.create({
              spinner: null,
              cssClass: 'custom-loading',
              message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

            });
            this.loading.then((load) => {
              load.present();
            });
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

            let couponSendData: any[] = [];
            this.coupon_data.forEach(element => {
              //  couponSendData.push({"code":element.code+"","amount":element.amount+""});
            });
            console.log("coupons send data", couponSendData);

            this.OrderService.CreateOrder(
              this.billing,
              this.shipping,
              this.current_user.id,
              this.coupon_data,
              this.notes,
              "TND",
              shippingMethod,
              this.panier,
              this.feeLines
            ).then(async (res: any) => {

              console.log("succes", res);

              this.loading.then((load) => {
                load.dismiss();
              });


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
              this.loading.then((load) => {
                load.dismiss();
              });

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
        }
      }
    }
  }



  selectZone() {
    this.selecteZoneState = true;
    console.log('selected zone', this.selectedzone);
    this.getPAymentmethodes(this.selectedzone);
  }

  selectMethod() {

    this.selecteMethodState = true;
    console.log('selected shipping id', this.selectedpayment);
    console.log('payment_methodes', this.payment_methodes);

    this.selectedShippingMethod = this.payment_methodes.find(x => parseInt(x.id) === parseInt(this.selectedpayment));

    console.log('selected shipping with find ', this.payment_methodes.find(x => parseInt(x.id) === parseInt(this.selectedpayment)));
    console.log('selected shipping ', this.selectedShippingMethod);
    this.totalLaivraison = parseFloat(this.selectedShippingMethod.settings.cost.value) || 0;
    console.log('total livraison : ', this.totalLaivraison);
    if (this.selectedShippingMethod !== undefined) {
      if (this.selectedShippingMethod.settings.cost.value !== '' && this.selectedShippingMethod?.settings.cost.value !== null) {

        this.totalLaivraison = parseFloat(this.selectedShippingMethod.settings.cost.value) || 0;
      } else {
        this.totalLaivraison = 0;
      }

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
        this.setCouponTotal(data['data']);
      }
    });
    modal.present();
  }

  async setCouponTotal(coupon) {
    this.totaleCouponProduct = 0;
    this.totalCoupon = 0;
    await this.arrayOutputNoPromo.forEach(element => {
      if (!coupon.excluded_product_ids.includes(element.id) && !this.checkCouponProductCategory(coupon.excluded_product_categories, element.product.categories)) {
        if (coupon.product_ids.length == 0 && coupon.product_categories.length == 0) {
          this.arrayCouponProductAppliquer.push(element);
        } else if (coupon.product_ids.length != 0 && coupon.product_categories.length == 0) {
          if (coupon.product_ids.includes(element.id)) {
            this.arrayCouponProductAppliquer.push(element);
          }
        } else if (coupon.product_ids.length == 0 && coupon.product_categories.length != 0) {
          if (this.checkCouponProductCategory(coupon.product_categories, element.product.categories)) {
            this.arrayCouponProductAppliquer.push(element);
          }
        } else {
          if (this.checkCouponProductCategory(coupon.product_categories, element.product.categories) || coupon.product_ids.includes(element.id)) {
            this.arrayCouponProductAppliquer.push(element);
          }
        }
      }
    });

    await this.arrayCouponProductAppliquer.forEach(element => {
      this.totaleCouponProduct = this.totaleCouponProduct + parseFloat(element.total);
    });

    if (this.totaleCouponProduct > 0) {
      coupon.amount = parseFloat(coupon.amount);
      if (coupon.discount_type == 'percent') {
        coupon.amount = (this.totaleCouponProduct / 100) * coupon.amount;
      }

      if (coupon.amount < this.totaleCouponProduct) {

        this.totalCoupon = coupon.amount;

      } else if (coupon.amount >= this.totaleCouponProduct) {

        this.totalCoupon = this.totaleCouponProduct;
        coupon.amount = this.totaleCouponProduct;
      }


      delete coupon.id;
      this.coupon_data = [];
      this.coupon_data.push(coupon);
      console.log("modal return :", this.coupon_data);
      this.feeLines = [];

      let fl = {
        "name": "reduction coupon",
        "total": (- this.totalCoupon) + ""
      }
      this.feeLines.push(fl);
    } else {
      const alert = await this.alertController.create({
        header: "Ce code promo n'est pas applicable",
        mode: 'ios',
        message: 'Ce code promo ne va appliquer aucune reduction dans votre commande .',
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
  }

  checkCouponProductCategory(couponCategory, productCategory): boolean {
    if (couponCategory.length > 0) {
      if (productCategory.filter((pc) => couponCategory.includes(pc.id)).length > 0) {
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  
  }

  hasValues(obj) {
    return Object.values(obj).some(v => v !== null && typeof v !== "undefined");
  }

  suuprimerCoupon(i) {

    this.totalCoupon = 0;
    this.coupon_data = [];
    this.feeLines = [];

  }

  getTotalOrder(): number {
    this.totalOrder = this.totalPanier + this.totalLaivraison - this.totalCoupon;

    return this.totalOrder;

  }

  showSegment() {
    this.showFacturation = !this.showFacturation;
    this.showLivraison = !this.showLivraison;
  }



}
