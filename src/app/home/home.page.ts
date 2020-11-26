import { CategoryService } from './../services/category/category.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { PanierModalPage } from './../pages/panier-modal/panier-modal.page';
import { PopoverCardProductPage } from './../pages/popovers/popover-card-product/popover-card-product.page';
import { ActivatedRoute, Router } from '@angular/router';
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



  rep = /&amp;/gi;

  slideOptions = { slidesPerView: 'auto', zoom: false, grabCursor: true, speed: 400, initialSlide: 1 };
  userState: boolean = false;

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

    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;


      this.getSlidesNbr();
      this.getHomeJson();
  //    this.getAllProducts();
    });
  }

  ionSlidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }


  ionViewDidEnter() {
    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;

      this.getSlidesNbr();
      this.getHomeJson();
     // this.getAllProducts();
    });
  }


  goToDetail(id) {
    this.router.navigateByUrl('detail-produit/' + id);
  }

  goToProductByCategory(category, id) {
    this.router.navigateByUrl('bottom-navigation/product-by-category/' + category + "/" + id);
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
      this.showPopoverPanier(event, product);
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

    this.poductService.getAllProductsWooCommerce('100').then((data: any[]) => {

      this.allProducts = data;
      console.log("All product :", this.allProducts);
    });
  }

  getSlidesNbr() {
    console.log('get slide nbr enter');
    this.http.get("https://laboratoiretresorsnaturels.tn/static_pictures/slider_count.json").toPromise().then((res: any) => {
      this.slideNBR = res.number;
      console.log("response get slides", res);
      this.slidesPictures = [];
      for (let i = 1; i <= this.slideNBR; i++) {
        this.slidesPictures.push("https://laboratoiretresorsnaturels.tn/static_pictures/slide_home_" + i + ".jpg");
      }
    });
  }




  getHomeJson() {
    this.homePageJson = [];
    console.log('get home json start');
    this.http.get("https://laboratoiretresorsnaturels.tn/static_pictures/homePage.json").toPromise().then((res: any) => {
      this.homePageJson = res;
      this.homePageJson.forEach(element => {
        if (element.type === "category") {

          this.categoryService.getCategory(element.category.id).then((dataCategory: any) => {
            element.category_object = dataCategory;
          });

          this.poductService.getProductsWithPrams(element.procduct).then((dataProducts: any[]) => {
              element.product_array = dataProducts['body'] ;
          });
        }
      });
      this.homePageJson = this.homePageJson.slice().sort((a, b) => a.level - b.level);
      console.log('home json : ',this.homePageJson) ;
    });
    console.log('get home json end');
  }

}



