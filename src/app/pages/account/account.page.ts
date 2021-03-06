import { CouponModalPage } from './../coupon-modal/coupon-modal.page';
import { OrderService } from './../../services/order/order.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { StorageService } from './../../services/storage/storage.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';
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
        this.loading.then((load) => {
          load.dismiss();
        });
        this.oneCatch = true
        console.log("error get user state", reason);
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
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
    console.log('Begin async operation');
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserData();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.loading.then((load) => {
          load.dismiss();
        });
        this.oneCatch = true
        setTimeout(() => {
          event.target.complete();
        }, 2000);
        console.log("error get user state", reason);
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


  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserData();
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.loading.then((load) => {
          load.dismiss();
        });
        this.oneCatch = true
        console.log("error get user state", reason);
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

  ionViewDidEnter() {
    // this.presentLoadingCustom();
    this.storage.get('user-state').then((val) => {
      console.log('user-state', val);
      this.userState = val;
      this.getUserData();
    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.loading.then((load) => {
          load.dismiss();
        });
        this.oneCatch = true
        console.log("error get user state", reason);
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
      this.loading.then((load) => {
        load.present();
      });
      this.updateLivraison();
      this.livraisoninputs = true;
      this.livraisonTextButton = "Modifier"

    }
  }

  FacturationAction() {
    
    if (this.facturationTextButton == "Modifier") {
      this.facturationinputs = false;
      this.facturationTextButton = "Sauvegarder"
    } else {
      this.loading.then((load) => {
        load.present();
      });
      this.updateFacturation();
    /*  this.facturationinputs = true;
      this.facturationTextButton = "Modifier"*/
    }
  }

  getUserData() {
    this.User = {};
    if (this.userState) {
      this.storage.get('auth-user').then((val) => {
        console.log('auth-user', val);
        this.UserService.getUserByIdCustom(val.id).then((data: any) => {
          this.User = data;
          let metadataArray: any[] = [];
          metadataArray = data.meta_data;
          this.getPoints();

          
          this.User.billing.address_1 =  this.User.billing.address_1?  this.User.billing.address_1 :  "" ;
          this.User.billing.address_2 =  this.User.billing.address_2?  this.User.billing.address_2  : "" ;
          this.User.billing.city =  this.User.billing.city? this.User.billing.city : "" ;
          this.User.billing.company =  this.User.billing.company?  this.User.billing.company : "" ;
          this.User.billing.country =  this.User.billing.country?  this.User.billing.country : "" ;
          this.User.billing.email =  this.User.billing.email? this.User.billing.email : "" ;
          this.User.billing.first_name =  this.User.billing.first_name? this.User.billing.first_name : "" ;
          this.User.billing.last_name =  this.User.billing.last_name? this.User.billing.last_name : "" ;
          this.User.billing.phone =  this.User.billing.phone?  this.User.billing.phone : "" ;
          this.User.billing.postcode =  this.User.billing.postcode? this.User.billing.postcode : "" ;
          this.User.billing.state =  this.User.billing.state?  this.User.billing.state : "" ;


          
          this.User.shipping.address_1 = this.User.shipping.address_1? this.User.shipping.address_1 : "" ;
          this.User.shipping.address_2 = this.User.shipping.address_2? this.User.shipping.address_2 : "" ;
          this.User.shipping.city = this.User.shipping.city? this.User.shipping.city : "" ;
          this.User.shipping.country = this.User.shipping.country? this.User.shipping.country : "" ;
          this.User.shipping.first_name = this.User.shipping.first_name? this.User.shipping.first_name : "" ;
          this.User.shipping.last_name = this.User.shipping.last_name? this.User.shipping.last_name : "" ;
          this.User.shipping.postcode = this.User.shipping.postcode? this.User.shipping.postcode : "" ;
          this.User.shipping.state = this.User.shipping.state? this.User.shipping.state : "" ;

          console.log('user connecte : ', this.User);

          if (this.User.pointsData === undefined) {
            this.User.pointsData = {
              value: 0
            }
          }

          console.log('points : ', this.User.pointsData);
         
          this.loading.then((load) => {
            load.dismiss();
          });
        }).catch(async (reason) => {
          this.loading.then((load) => {
            load.dismiss();
          });
          if (this.oneCatch) {

          } else {
            this.loading.then((load) => {
              load.dismiss();
            });
            this.oneCatch = true
            console.log("error getUserById", reason);
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
      this.loading.then((load) => {
        load.dismiss();
      });
    }

  }

  updateUser() {

    this.UserService.updateUser(this.User).then((data: any) => {
     
      this.User = data;
      let metadataArray: any[] = [];
      metadataArray = data.meta_data;
      this.getPoints();

      console.log('user connecte : ', this.User);

      if (this.User.pointsData === undefined) {
        this.User.pointsData = {
          value: 0
        }
      }
      this.facturation = false;
      this.livraison = false;
    }).catch(async (reason) => {

      this.oneCatch = true
      console.log("error updateUser", reason);
      const alert = await this.alertController.create({
        header: "Erreur lors de la mise ?? jour des donn??es de l'utilisateur",
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

    });
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  async updateFacturation() {

    delete this.User.shipping ;

    if (this.validateEmail( this.User.billing.email)) {
      this.UserService.updateUser(this.User).then((data: any) => {
     
        this.User = data;
        let metadataArray: any[] = [];
        metadataArray = data.meta_data;
        this.User.pointsData = metadataArray.filter(x => x.key == "_acfw_loyalprog_user_total_points")[0];
   
            this.User.billing.address_1 =  this.User.billing.address_1?  this.User.billing.address_1 :  "" ;
            this.User.billing.address_2 =  this.User.billing.address_2?  this.User.billing.address_2  : "" ;
            this.User.billing.city =  this.User.billing.city? this.User.billing.city : "" ;
            this.User.billing.company =  this.User.billing.company?  this.User.billing.company : "" ;
            this.User.billing.country =  this.User.billing.country?  this.User.billing.country : "" ;
            this.User.billing.email =  this.User.billing.email? this.User.billing.email : "" ;
            this.User.billing.first_name =  this.User.billing.first_name? this.User.billing.first_name : "" ;
            this.User.billing.last_name =  this.User.billing.last_name? this.User.billing.last_name : "" ;
            this.User.billing.phone =  this.User.billing.phone?  this.User.billing.phone : "" ;
            this.User.billing.postcode =  this.User.billing.postcode? this.User.billing.postcode : "" ;
            this.User.billing.state =  this.User.billing.state?  this.User.billing.state : "" ;
  
  
            
            this.User.shipping.address_1 = this.User.shipping.address_1? this.User.shipping.address_1 : "" ;
            this.User.shipping.address_2 = this.User.shipping.address_2? this.User.shipping.address_2 : "" ;
            this.User.shipping.city = this.User.shipping.city? this.User.shipping.city : "" ;
            this.User.shipping.country = this.User.shipping.country? this.User.shipping.country : "" ;
            this.User.shipping.first_name = this.User.shipping.first_name? this.User.shipping.first_name : "" ;
            this.User.shipping.last_name = this.User.shipping.last_name? this.User.shipping.last_name : "" ;
            this.User.shipping.postcode = this.User.shipping.postcode? this.User.shipping.postcode : "" ;
            this.User.shipping.state = this.User.shipping.state? this.User.shipping.state : "" ;
        console.log('user connecte : ', this.User);
  
        if (this.User.pointsData === undefined) {
          this.User.pointsData = {
            value: 0
          }
        }
        this.facturation = false;
        this.livraison = false;
        this.facturationinputs = true;
        this.facturationTextButton = "Modifier"
        this.loading.then((load) => {
          load.dismiss();
        });
      }).catch(async (reason) => {
  
        this.oneCatch = true
        this.loading.then((load) => {
          load.dismiss();
        });
        console.log("error updateUser", reason);
        const alert = await this.alertController.create({
          header: "Erreur lors de la mise ?? jour des donn??es de l'utilisateur",
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
  
      });

    }else {
      this.loading.then((load) => {
        load.dismiss();
      });
      const alert = await this.alertController.create({
        header: "Adresse ??lectronique invalide ",
        mode: 'ios', 
        message: 'Vous devez remplir le champ adresse ??lectronique dans le formulaire de facturation avec une adresse valide',
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

  updateLivraison() {

    delete this.User.billing ;

    this.UserService.updateUser(this.User).then((data: any) => {
     
      this.User = data;
      let metadataArray: any[] = [];
      metadataArray = data.meta_data;
      this.User.pointsData = metadataArray.filter(x => x.key == "_acfw_loyalprog_user_total_points")[0];
 
          this.User.billing.address_1 =  this.User.billing.address_1?  this.User.billing.address_1 :  "" ;
          this.User.billing.address_2 =  this.User.billing.address_2?  this.User.billing.address_2  : "" ;
          this.User.billing.city =  this.User.billing.city? this.User.billing.city : "" ;
          this.User.billing.company =  this.User.billing.company?  this.User.billing.company : "" ;
          this.User.billing.country =  this.User.billing.country?  this.User.billing.country : "" ;
          this.User.billing.email =  this.User.billing.email? this.User.billing.email : "" ;
          this.User.billing.first_name =  this.User.billing.first_name? this.User.billing.first_name : "" ;
          this.User.billing.last_name =  this.User.billing.last_name? this.User.billing.last_name : "" ;
          this.User.billing.phone =  this.User.billing.phone?  this.User.billing.phone : "" ;
          this.User.billing.postcode =  this.User.billing.postcode? this.User.billing.postcode : "" ;
          this.User.billing.state =  this.User.billing.state?  this.User.billing.state : "" ;


          
          this.User.shipping.address_1 = this.User.shipping.address_1? this.User.shipping.address_1 : "" ;
          this.User.shipping.address_2 = this.User.shipping.address_2? this.User.shipping.address_2 : "" ;
          this.User.shipping.city = this.User.shipping.city? this.User.shipping.city : "" ;
          this.User.shipping.country = this.User.shipping.country? this.User.shipping.country : "" ;
          this.User.shipping.first_name = this.User.shipping.first_name? this.User.shipping.first_name : "" ;
          this.User.shipping.last_name = this.User.shipping.last_name? this.User.shipping.last_name : "" ;
          this.User.shipping.postcode = this.User.shipping.postcode? this.User.shipping.postcode : "" ;
          this.User.shipping.state = this.User.shipping.state? this.User.shipping.state : "" ;
      console.log('user connecte : ', this.User);

      if (this.User.pointsData === undefined) {
        this.User.pointsData = {
          value: 0
        }
      }
      this.facturation = false;
      this.livraison = false;
      this.loading.then((load) => {
        load.dismiss();
      });
    }).catch(async (reason) => {

      this.oneCatch = true
      this.loading.then((load) => {
        load.dismiss();
      });
      console.log("error updateUser", reason);
      const alert = await this.alertController.create({
        header: "Erreur lors de la mise ?? jour des donn??es de l'utilisateur",
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

    });
  }

  CreateCoupon() {
    let code: string = this.generateCouponCode();
    //add loading
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });


    this.orderService.generateCoupon(code, parseInt(this.form.value.points), this.User.id).then(async (data: any) => {
      console.log(data);
     // this.form.value.points = "" ;
     this.getPoints();
     
      this.UserService.insertLoyalityProgram(this.User.id,"redeem","coupon",parseFloat(this.form.value.points)+"").then((dat:any)=>{
        if(dat.result==="created"){
          console.log("updated user points loyality");
        }
      });
      this.form.reset() ;
      this.updateUser();
      
     /* const toast = await this.toastController.create({
        message: 'Le coupon a ??t?? cr???? avec succ??s',
        duration: 2000
      });
      toast.present();
      */
    //  this.openCoupon();

      //fin loading
this.loading.then((load5)=>{
  load5.dismiss();
})
      
      //affichage succ??s
      const alert = await this.alertController.create({
        header: "Coupon cr???? avec succ??s",
        mode: 'ios',
        message: "",
        buttons: [

          {
            text: "D'accord",
            cssClass: 'btn-alert-connexion',
            handler: () => {
              this.oneCatch = false;
              alert.dismiss();
            }
          },
        ]
      });
      await alert.present();



    }).catch(async (reason) => {
      this.loading.then((load5)=>{
        load5.dismiss();
      })
          
      this.oneCatch = true
      console.log("error generateCoupon", reason);
      const alert = await this.alertController.create({
        header: "Erreur lors de la g??n??ration du coupon",
        mode: 'ios',
        message: "",
        buttons: [

          {
            text: "D'accord",
            cssClass: 'btn-alert-connexion',
            handler: () => {
              this.oneCatch = false;
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


  getPoints() {
    this.UserService.getPointsLoyalityProgram(this.User.id).then((data : any)=>{
      this.User.pointsData.value = data.points ;
       this.form = this.formBuilder.group({
            points: new FormControl("", Validators.compose([Validators.min(30), Validators.max(parseInt(this.User.pointsData.value + "")), Validators.required]))

          });
    })
  }



}
