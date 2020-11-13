import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { async } from "@angular/core/testing";
import { StorageService } from "./../../services/storage/storage.service";
import { PanierService } from "./../../services/panier/panier.service";
import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-panier-modal",
  templateUrl: "./panier-modal.page.html",
  styleUrls: ["./panier-modal.page.scss"],
})
export class PanierModalPage implements OnInit {
  panier: any[] = [];
  userState: boolean = false;
  totale: number = 0;

  constructor(
    private panierService: PanierService,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private Router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get("user-state").then((val) => {
      console.log("user-state", val);
      this.userState = val;
    });

    this.getPanier();
    console.log("userState", this.userState);
    console.log("panier", this.panier);
  }

  ionViewDidEnter() {
    this.storage.get("user-state").then((val) => {
      console.log("user-state", val);
      this.userState = val;
    });

    this.getPanier();
    console.log("userState", this.userState);
    console.log("panier", this.panier);
  }

  async getPanier() {
    if (this.userState) {
      this.storage.get("auth-user").then((val) => {
        console.log("auth-user", val);
        this.panierService.getCartFromServer(val.id).subscribe((res: any[]) => {
          this.panier = res["data"];
          this.getTotal();
        });
      });
    } else {
      // this.panier = this.panierService.getCartFromStorage();
    }
  }

  decreaseCartItem(product) {
    if (this.userState) {
      let added = false;

      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity += 1;
          this.totale += p.price * 1;
          added = true;
          break;
        }
      }
      if (!added) {
        product.quantity = 1;
        this.panier.push(product);
      }
    } else {
      this.panierService.addProductToCartFromStorage(product);
      //   this.panier = this.panierService.getCartFromStorage();
      this.totale += product.price;
    }
  }

  increaseCartItem(product) {
    if (this.userState) {
      let index = 0;
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          p.quantity -= 1;
          this.totale -= p.price;
          if (p.quantity == 0) {
            this.panier.splice(index, 1);
          }
          break;
        }
        index++;
      }
    } else {
      this.panierService.decreaseProductFromCartFromStorage(product);
      //  this.panier = this.panierService.getCartFromStorage();
      this.totale -= product.price;
    }
  }

  removeCartItem(product) {
    if (this.userState) {
      let index = 0;
      for (let p of this.panier) {
        if (p.product_id === product.product_id) {
          this.totale -= p.total;
          this.panier.splice(index, 1);
          break;
        }
        index++;
      }
    } else {
      this.totale -= product.total;
      this.panierService.removeProductFromCartFromStorage(product);
      //   this.panier = this.panierService.getCartFromStorage();
    }
  }
  getTotal() {
    this.totale = 0
    for (let p of this.panier) {

      this.totale += p.total;

    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async save() {
    if (this.userState) {
      this.storage.get("auth-user").then((val) => {
        console.log("auth-user", val);
        this.panierService
          .emptyCartFromServer(val.id)
          .subscribe((res: any[]) => {
            console.log("empty panier", res);
            this.panierService
              .addToCartOnServer(this.panier, val.id)
              .subscribe((res: any[]) => {
                console.log("panier", res);
                this.panier = res["data"];
                this.modalCtrl.dismiss();
              });
          });
      });
    } else {
      this.storage.remove("cart-user");
      this.storage.set("cart-user", this.panier);
    }
  }

  checkout() {
    this.modalCtrl.dismiss();
    this.Router.navigateByUrl("order");
  }
}
