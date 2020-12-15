import { environment } from './../../environments/environment';
import { CategoryService } from './../services/category/category.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { PanierModalPage } from './../pages/panier-modal/panier-modal.page';
import { PopoverCardProductPage } from './../pages/popovers/popover-card-product/popover-card-product.page';
import { Router } from '@angular/router';
import { ProductService } from './../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, PopoverController, IonSlides, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  allProducts: any[] = [];
  homePageJson: any[] = [];

  slideNBR: number = 0;

  slidesPictures: any[] = [];

  searchText: string = "";
  searchShow: boolean = false;

  oneCatch = false;


  rep = /&amp;/gi;

  slideOptions = { slidesPerView: 'auto', zoom: false, grabCursor: true, speed: 400, initialSlide: 1 };
  userState: boolean = false;
  loading;

  constructor(
    private poductService: ProductService,
    private router: Router,
    private http: HttpClient,
    private popoverController: PopoverController,
    private storage: Storage,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService
  ) { }

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
      console.log('user state', val);
      this.userState = val;

      this.getSlidesNbr();
      this.getHomeJson();
      this.getAllProducts();
    });

    this.showAlertNotif("header","description","https://laboratoiretresorsnaturels.tn/static_pictures/offre.png","bottom-navigation/account") ;
  }

  ionSlidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }



  doRefresh(event) {
    this.allProducts = [];
    this.homePageJson = []

    console.log('Begin async operation');

    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
      this.getSlidesNbr();
      this.getHomeJson();
      this.getAllProducts();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    });
  }


  goToDetail(id) {
    if (id !== ''){
    this.router.navigateByUrl('detail-produit/' + id);
    }
  }

  goToProductByCategory( id) {
    if (id !== ''){
    this.router.navigateByUrl('product-by-category/' + id);
    }
  }

  goToPub(type, id) {
    if (id !== ''){
      if (type === 'category') {
        this.router.navigateByUrl('product-by-category/' + id);
      }
      if (type === 'produit') {
        this.router.navigateByUrl('detail-produit/' + id);
      }
    }
  
  }





  async showPopoverPanier(event: MouseEvent, product) {
    const popover = await this.popoverController.create({
      component: PopoverCardProductPage,
      componentProps: {
        "id": product.id,
        "product": product,
      },
      translucent: true
    });
    return popover.present();
  }

  showPopover(event: MouseEvent, product) {

    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
    if (this.userState) {
      if (product.type === 'variable') {
        this.goToDetail(product.id);
      } else {
        this.showPopoverPanier(event, product);
      }

    } else {
      this.showAlertLogin();
    }
    });

  }


  async showAlertLogin() {

    const alert = await this.alertController.create({
      header: 'Vous devez vous connecter',
      mode: 'ios',
      message: "Vous devez disposer d'un compte pour pouvoir passer une commande ou ajouter au panier .",
      buttons: [
        {
          text: 'ignorer',
          role: 'cancel',
          cssClass: 'btn-alert-ignorer',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'connexion',
          cssClass: 'btn-alert-connexion',
          handler: () => {
            this.router.navigateByUrl('/login');
          }
        },
      ]
    });
    await alert.present();
  }


  async showAlertNotif(header, msg,imgSrc, url) {

    const alert = await this.alertController.create({
      header: header,
      mode: 'ios',
      message: "<div class='alert-notif-container'><p>"+msg+"</p> <img  src='"+imgSrc+"' /></div>",
      cssClass : "alert-notif-msg",
      buttons: [
        {
          text: 'Ignorer',
          role: 'cancel',
          cssClass: 'alert-notif-btn-annuler',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Consulter',
          cssClass: 'alert-notif-btn-ok',
          handler: () => {
            this.router.navigateByUrl(url);
          }
        },
      ]
    });
    await alert.present();
  }

  showSearch() {
    this.searchText = '';
    this.searchShow = !this.searchShow;
  }


  getAllProducts() {
    this.allProducts = [];
    this.poductService.getAllproductCustom().then((data: any[]) => {
      this.allProducts = data;
      /* this.loading.then((load)=>{
         load.dismiss();
                         });
                         */
      console.log("All product :", this.allProducts);

    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.loading.then((load) => {
          load.dismiss();
        });
        this.oneCatch = true
        console.log('error', reason);
        const alert = await this.alertController.create({
          header: "Erreur lors du chargement de la page 1",
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
      }
    });
  }

  getSlidesNbr() {
    console.log('get slide nbr enter');
    this.http.get(environment.apiCustomURL+"config/get_slides.php").subscribe((res: any[]) => {
      this.slidesPictures = [];
      this.slidesPictures = res;
      console.log("get slide array :", this.slidesPictures);

    }, (reason) => {

      if (this.oneCatch) {

      } else {
        this.oneCatch = true
        this.loading.then((load) => {
          load.dismiss();
        });
        console.log("error get slides ", reason);
        const alert = this.alertController.create({
          header: "Erreur lors du chargement de la page",
          mode: 'ios',
          message: "",
          buttons: [

            {
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
              handler: () => {
                this.oneCatch = false;
                alert.then((alt) => { alt.dismiss() });
              }
            },
          ]
        });
        alert.then((alt) => { alt.present() });
      }
    });
  }

  getHomeJson() {

    console.log('get home json start');
    this.http.get(environment.apiCustomURL+"config/get_home_config.php").subscribe((res: any[]) => {

      this.homePageJson = [];

      this.homePageJson = res;
      this.homePageJson = this.homePageJson.slice().sort((a, b) => a.level - b.level);

      this.homePageJson.forEach((element, index) => {
        console.log('forech home json element ', index);
        if (element.type === "category") {

          this.categoryService.getCategoryByIdCustom(element.category.id).then((dataCategory: any) => {
            element.category_object = dataCategory;

          }, (reason: any) => {
            if (this.oneCatch) {

            } else {
              this.loading.then((load) => {
                load.dismiss();
              });
              this.oneCatch = true
              console.log("error get category ", reason);
              const alert = this.alertController.create({
                header: "Erreur lors du chargement de la page",
                mode: 'ios',
                message: "",
                buttons: [

                  {
                    text: "D'accord",
                    cssClass: 'btn-alert-connexion',
                    handler: () => {
                      this.oneCatch = false;
                      alert.then((alt) => { alt.dismiss() });
                    }
                  },
                ]
              });
              alert.then((alt) => { alt.present() });
            }
          });

          this.poductService.getProductByCategoryCustom(element.product.category).then((dataProducts: any[]) => {
            element.product_array = dataProducts;

            if (this.homePageJson.length <= index + 1) {
              console.log('get home json object end');
              console.log('home json with object: ', this.homePageJson);
              console.log('home json : ', this.homePageJson);
              this.loading.then((load) => {
                load.dismiss();
              });
            }
          }, (reason: any) => {
            if (this.oneCatch) {

            } else {
              this.loading.then((load) => {
                load.dismiss();
              });
              this.oneCatch = true
              console.log("error get produit ", reason);
              const alert = this.alertController.create({
                header: "Erreur lors du chargement de la page",
                mode: 'ios',
                message: "",
                buttons: [

                  {
                    text: "D'accord",
                    cssClass: 'btn-alert-connexion',
                    handler: () => {
                      this.oneCatch = false;
                      alert.then((alt) => { alt.dismiss() });
                    }
                  },
                ]
              });
              alert.then((alt) => { alt.present() });
            }
          });
        }

      });


    }, (reason: any) => {
      if (this.oneCatch) {

      } else {

        this.loading.then((load) => {
          load.dismiss();
        });

        this.oneCatch = true
        console.log("error get home json", reason);
        const alert = this.alertController.create({
          header: "Erreur lors du chargement de la page",
          mode: 'ios',
          message: "",
          buttons: [

            {
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
              handler: () => {
                this.oneCatch = false;
                alert.then((alt) => { alt.dismiss() });
              }
            },
          ]
        });
        alert.then((alt) => { alt.present() });
      }
    }
    )
    console.log('get home json end');

  }

}



