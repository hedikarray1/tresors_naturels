import { StorageService } from './../../services/storage/storage.service';
import { PanierService } from './../../services/panier/panier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  panier :any[];

  constructor(
    private panierServie : PanierService,
    private storageService : StorageService
    ) { }

  ngOnInit() {
    this.getPanier(5);
  }

  getPanier(id){
    this.panierServie.getPanierFromServer(id).subscribe((res: any[]) => {
      console.log("panier",res);
      this.panier = res['data'] ;
    })
  }

  addToPanier(id,produits){

  }

}
