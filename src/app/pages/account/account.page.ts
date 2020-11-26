import { CouponModalPage } from './../coupon-modal/coupon-modal.page';
import { OrderService } from './../../services/order/order.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { StorageService } from './../../services/storage/storage.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { min } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  facturation = false;
  livraison = false;
  cardPoint = false;
  livraisoninputs = true;
  facturationinputs = true;
  update_infosCard = false;
  Points: number;
  form: FormGroup;
  livraisonTextButton = "Modifier"
  facturationTextButton = "Modifier"
  selectedsegment = "";
  User: any = {};

  userState: boolean = false;
  oneCatch = false;
  loading;
  constructor(
    private UserService: UserService,
    private StorageService: StorageService,
    private modalCtrl: ModalController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private Router: Router,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {


    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserData();
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.oneCatch = true
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
              }
            },
          ]
        });
        await alert.present();
      }
    });
  }

  selectedAnimation: any = "interactive";
  animations: any;
  interactive = false;
  anim: any;
  animationSpeed: number = 1;




  async openCart() {


    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserData();
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.oneCatch = true
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
              }
            },
          ]
        });
        await alert.present();
      }
    });
    /*
        this.form = this.formBuilder.group({
          points: new FormControl("", Validators.compose([Validators.min(30), Validators.max(parseInt(this.User.pointsData + "")), Validators.required]))
    
        });*/
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  ngOnInit() {
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserData();
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.oneCatch = true
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
              }
            },
          ]
        });
        await alert.present();
      }
    });

    /*
        this.form = this.formBuilder.group({
          points: new FormControl("", Validators.compose([Validators.min(30), Validators.max(parseInt(this.User.pointsData + "")), Validators.required]))
    
        });*/
  }
  ionViewDidEnter() {
   // this.presentLoadingCustom();
    this.loading =  this.loadingCtrl.create({
    spinner: null,
    cssClass: 'custom-loading',
    message: `<ion-img src="../../../assets/gif/gif_loading_03.gif"  style="background: transparent !important;"/>`,
   
  });
  this.loading.then((load)=>{
load.present();
  });
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserData();
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.oneCatch = true
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
              }
            },
          ]
        });
        await alert.present();
      }
    });
    /* this.form = this.formBuilder.group({
       points: new FormControl("", Validators.compose([Validators.min(30), Validators.max(parseInt(this.User.pointsData + "")), Validators.required]))
     });
 */
  }
  displayHideFacturationCard() {
    this.livraison = false;
    this.cardPoint = false;
    this.facturation = !this.facturation;
    if (this.facturation == false) {
      this.selectedsegment = "";
    } else {
      this.selectedsegment = "facturation";
    }

  }

  displayHidePointCard() {
    this.livraison = false;
    this.facturation = false;
    this.cardPoint = !this.cardPoint;
    if (this.facturation == false) {
      this.selectedsegment = "";
    } else {
      this.selectedsegment = "pointCard";
    }

  }

  displayHideUpdateInfosCard() {
    this.update_infosCard = !this.update_infosCard;
  }

  displayHideLivraisonCard() {
    this.livraison = !this.livraison;
    this.facturation = false;
    this.cardPoint = false;
    if (this.livraison == false) {
      this.selectedsegment = "";
    } else {
      this.selectedsegment = "livraison";
    }

  }

  LivraisonAction() {
    if (this.livraisonTextButton == "Modifier") {
      this.livraisoninputs = false;
      this.livraisonTextButton = "Sauvegarder"
    } else {
      this.updateUser();
      this.livraisoninputs = true;
      this.livraisonTextButton = "Modifier"

    }
  }

  FacturationAction() {
    if (this.facturationTextButton == "Modifier") {
      this.facturationinputs = false;
      this.facturationTextButton = "Sauvegarder"
    } else {
      this.updateUser();
      this.facturationinputs = true;
      this.facturationTextButton = "Modifier"
    }
  }

  getUserData() {
    this.User = {};

    this.storage.get('auth-user').then((val) => {
      console.log('auth-user', val);
      this.UserService.getUserById(val.id).then((data: any) => {
        this.User = data;
        let metadataArray: any[] = [];
        metadataArray = data.meta_data;
        this.User.pointsData = metadataArray.filter(x => x.key == "_acfw_loyalprog_user_total_points")[0];
        // console.log("points: ",metadataArray.filter(x=>x.key=="_acfw_loyalprog_user_total_points"));
        console.log('points : ',this.User.pointsData);
        this.form = this.formBuilder.group({
          points: new FormControl("", Validators.compose([Validators.min(30), Validators.max(parseInt(this.User.pointsData.value + "")), Validators.required]))

        });
        this.loading.then((load) => {
          load.dismiss();
        });
      }).catch(async (reason) => {
        this.loading.then((load) => {
          load.dismiss();
        });
        if (this.oneCatch) {

        } else {
          this.oneCatch = true
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
                }
              },
            ]
          });
          await alert.present();
        }
      });
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.oneCatch = true
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
              }
            },
          ]
        });
        await alert.present();
      }
    });

  }

  updateUser() {

    this.UserService.updateUser(this.User).then((data: any) => {
      this.User = data;
      this.facturation = false;
      this.livraison = false;
    }).catch(async (reason) => {

      this.oneCatch = true
      const alert = await this.alertController.create({
        header: "Erreur lors de la mise à jour des données de l'utilisateur",
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

    });
  }

  CreateCoupon() {
    let code: string = this.generateCouponCode();
    this.orderService.generateCoupon(code, this.form.value.points, this.User.id).then(async (data: any) => {
      console.log(data);
      this.User.meta_data.forEach(element => {
        if (element.key == "_acfw_loyalprog_user_total_points") {
          console.log("element de points avant", element.value);
          console.log("operation: ", (parseFloat(this.User.pointsData) - parseFloat(this.form.value.points)) + "");
          console.log("parametres: user points:", this.User.pointsData, " points dans form", parseFloat(this.form.value.points));
          element.value = (parseFloat(this.User.pointsData.value) - parseFloat(this.form.value.points)) + "";
          console.log("element de points", element);

          this.User.pointsData = element;
          console.log("user after coupon", this.User);
        }
      });
      this.updateUser();
      const toast = await this.toastController.create({
        message: 'Le coupon a été créé avec succés',
        duration: 2000
      });
      toast.present();
      this.openCoupon();
    }).catch(async (reason) => {

      this.oneCatch = true
      const alert = await this.alertController.create({
        header: "Erreur lors de la génération du coupon",
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

    });

  }

  generateCouponCode() {
    let i: number = 0;
    let timeStamp = Math.floor(Date.now() / 1000) + "";
    let code: string = "";
    console.log("current timstamp: ", timeStamp);
    while (i < timeStamp.length) {
      let numberString: string = "";
      if (i + 1 <= timeStamp.length) {
        numberString = timeStamp.charAt(i) + timeStamp.charAt(i + 1);
        i++;
      } else {
        numberString = timeStamp.charAt(i);
      }
      let number = parseInt(numberString);
      let numberConverted = ""
      //condition contrainte
      if ((number >= 48 && number <= 57) || (number >= 65 && number <= 90) || (number >= 97 && number <= 122)) {
        numberConverted = String.fromCharCode(parseInt(numberString));

      } else {
        numberConverted = number + "";
      }

      code = code + numberConverted;
      i++;
    }
    console.log("code final: ", code);
    return code;
  }


  async openCoupon() {
    //  this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: CouponModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }


  goToLogin() {
    this.Router.navigateByUrl('/login');
  }

 

}
