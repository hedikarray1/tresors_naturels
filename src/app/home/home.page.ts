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

  allProducts: any[];
  slideNBR: number = 0;
  slidesPictures: any[] = [];
  searchText: string = "";
  searchShow: boolean = false;
  productsBelleAmbiance: any[];
  productsBelleEnvolee: any[];
  productsBelleSensuelle: any[];
  productsCoffrets: any[];
  rep = /&amp;/gi;
  slideOptions={ slidesPerView: 'auto', zoom: false, grabCursor: true, speed:400,initialSlide:1 };
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
    private loadingCtrl:LoadingController
  ) { }

  ngOnInit() {

    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
   

    this.getSlidesNbr();
    this.getProductBelleAmbiance();
    this.getProductBelleEnvolee();
    this.getProductBelleSensuelle();
    this.getProductCoffret();
    this.getAllProducts();
  });
  }

  ionSlidesDidLoad(slides:IonSlides){
    slides.startAutoplay();
  }

 
  ionViewDidEnter() {
    this.presentLoadingCustom();
    this.storage.get('user-state').then((val) => {
      console.log('user state', val);
      this.userState = val;
    
    this.getSlidesNbr();
    this.getProductBelleAmbiance();
    this.getProductBelleEnvolee();
    this.getProductBelleSensuelle();
    this.getProductCoffret();
    this.getAllProducts();
  });
  }

  goToDetail(id) {
    this.router.navigateByUrl('detail-produit/' + id);
  }




  async getProductBelleAmbiance() {
    const id = '163';
    this.poductService.getProductsByCategory(id).then((data: any[]) => {

      this.productsBelleAmbiance = data;
      console.log('productsBelleAmbiance :', data);
    });
  }


  async getProductBelleEnvolee() {
    let id = "164";
    this.poductService.getProductsByCategory(id).then((data: any[]) => {

      this.productsBelleEnvolee = data;
      console.log("productsBelleEnvolee :", data);
    });
  }

  async getProductBelleSensuelle() {
    let id = "165";
    this.poductService.getProductsByCategory(id).then((data: any[]) => {

      this.productsBelleSensuelle = data;
      console.log("productsBelleSensuelle :", data);
    });
  }

  async getProductCoffret() {
    let id = "116";
    this.poductService.getProductsByCategory(id).then((data: any[]) => {

      this.productsCoffrets = data;
      console.log("productsCoffrets :", data);
    });
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



