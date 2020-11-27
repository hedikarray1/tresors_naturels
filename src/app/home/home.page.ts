import { CategoryService } from './../services/category/category.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { PanierModalPage } from './../pages/panier-modal/panier-modal.page';
import { PopoverCardProductPage } from './../pages/popovers/popover-card-product/popover-card-product.page';
import {  Router } from '@angular/router';
import { ProductService } from './../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, PopoverController, IonSlides, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  pageAllProducts = 1;

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
    private menu: MenuController,
    private http: HttpClient,
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
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
  }

  ionSlidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  doRefresh(event) {
    console.log('Begin async operation');
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

    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }





  goToDetail(id) {
    this.router.navigateByUrl('detail-produit/' + id);
  }

  goToProductByCategory(category, id) {
    this.router.navigateByUrl('product-by-category/' + category + "/" + id);
  }

  goToPub(type, id, name) {
    if (type === 'category') {
      this.router.navigateByUrl('product-by-category/' + name + "/" + id);
    }
    if (type === 'produit') {
      this.router.navigateByUrl('detail-produit/' + id);
    }
  }


  openCustom() {
    this.menu.enable(true, 'content');
    this.menu.open('content');
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
    if (this.userState) {
      if (product.type === 'variable') {
        this.goToDetail(product.id);
      } else {
        this.showPopoverPanier(event, product);
      }

    } else {
      this.showAlertLogin();
    }
  }


  async showAlertLogin() {

    const alert = await this.alertController.create({
      header: 'Vous devez vous connecter',
      mode: 'ios',
      message: "Vous devez disposer d'un compte pour pouvoir passer un commande ou ajouter au panier .",
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


  async openCart() {
    //  this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: PanierModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
    });
    modal.present();
  }

  showSearch() {
    this.searchText = '';
    this.searchShow = !this.searchShow;
  }


  getAllProducts() {
    this.allProducts =[];
    this.poductService.getAllProductsWooCommerce2().then((data: any[]) => {
      this.pageAllProducts = 1;
      console.log("all product :", this.poductService.totalProducts);
      this.allProducts = data;
      if (this.pageAllProducts < this.poductService.pages) {
        this.pageAllProducts++;
        this.getAllProducts2(this.pageAllProducts);
      }
      console.log("All product :", this.allProducts);

    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.loading.then((load)=>{
          load.dismiss();
                          });
        this.oneCatch = true
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

  getAllProducts2(page) {
   
    this.poductService.getAllProductsWooCommerce2(page).then((data: any[]) => {
      console.log("product page " + this.pageAllProducts + " :", data);
      if ( this.allProducts.length <= this.poductService.totalProducts ){
        this.allProducts = [...this.allProducts, ...data];
      }
     
      if (this.pageAllProducts < this.poductService.pages) {
        this.pageAllProducts++;
        this.getAllProducts2(this.pageAllProducts);
      }

      console.log("All product page " + this.pageAllProducts + " : ", this.allProducts);

    }).catch(async (reason) => {
      if (this.oneCatch) {

      } else {
        this.loading.then((load)=>{
          load.dismiss();
                          });
        this.oneCatch = true
        const alert = await this.alertController.create({
          header: "Erreur lors du chargement de la page 2",
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
    this.http.get("https://laboratoiretresorsnaturels.tn/static_pictures/slider_count.json").subscribe((res: any[]) => {
      this.slidesPictures = [];
      this.slidesPictures = res;
      console.log("get slide array :", this.slidesPictures);
      /*      this.slideNBR = res.number;
            console.log("response get slides", res);
            this.slidesPictures = [];
            for (let i = 1; i <= this.slideNBR; i++) {
              this.slidesPictures.push("https://laboratoiretresorsnaturels.tn/static_pictures/slide_home_" + i + ".jpg");
            }*/
    }, (reason) => {

      if (this.oneCatch) {

      } else {
        this.oneCatch = true
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
    this.http.get("https://laboratoiretresorsnaturels.tn/static_pictures/homePage.json").subscribe((res: any[]) => {

      this.homePageJson = [];

      this.homePageJson = res;
      this.homePageJson = this.homePageJson.slice().sort((a, b) => a.level - b.level);

      this.homePageJson.forEach((element, index) => {
        console.log('forech home json element ', index);
        if (element.type === "category") {

          this.categoryService.getCategory(element.category.id).then((dataCategory: any) => {
            element.category_object = dataCategory;
          }, (reason: any) => {
            if (this.oneCatch) {

            } else {
              this.loading.then((load)=>{
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

          this.poductService.getProductsWithPrams(element.product).then((dataProducts: any[]) => {
            element.product_array = dataProducts['body'];
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
              this.loading.then((load)=>{
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
        
        this.loading.then((load)=>{
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



