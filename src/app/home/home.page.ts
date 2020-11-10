import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products : any[];

  productsBelleAmbiance : any[];
  productsBelleEnvolee : any[];
  productsBelleSensuelle : any[];
  productsCoffrets : any[];

  constructor(
    private poductService : ProductService,
    private route: ActivatedRoute,
    private router : Router,
    private menu: MenuController
  ) {}

  ngOnInit() {

    this.getCategory("162") ;
    this.getProductBelleAmbiance();
    this.getProductBelleEnvolee();
    this.getProductBelleSensuelle();
    this.getProductCoffret();

  }

  async getCategory(category){
   
    this.poductService.getProductsByCategory(category).subscribe((data: any[]) => {
     
      this.products = data;
       console.log("category :" , this.products);
    });
  }


  async getProductBelleAmbiance(){
   let id ="163" ;
    this.poductService.getProductsByCategory(id).subscribe((data: any[]) => {
     
      this.productsBelleAmbiance = data;
       console.log("productsBelleAmbiance :" , data);
    });
  }

  
  async getProductBelleEnvolee(){
    let id = "164";
     this.poductService.getProductsByCategory(id).subscribe((data: any[]) => {
      
       this.productsBelleEnvolee = data;
        console.log("productsBelleEnvolee :" , data);
     });
   }

   async getProductBelleSensuelle(){
    let id = "165" ;
     this.poductService.getProductsByCategory(id).subscribe((data: any[]) => {
      
       this.productsBelleSensuelle = data;
        console.log("productsBelleSensuelle :" , data);
     });
   }

   async getProductCoffret(){
    let id = "116" ;
     this.poductService.getProductsByCategory(id).subscribe((data: any[]) => {
      
       this.productsCoffrets = data;
        console.log("productsCoffrets :" , data);
     });
   }

   openCustom() {
    this.menu.enable(true, 'content');
    this.menu.open('content');
  }

}



