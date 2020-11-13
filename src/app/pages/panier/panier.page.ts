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
  }


}
