import { LoadingController } from '@ionic/angular';
import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.page.html',
  styleUrls: ['./detail-produit.page.scss'],
})
export class DetailProduitPage implements OnInit {

  segmentValue = ""  ;
  datashow = false ;

  product : any ;
  constructor(
    private loadingController : LoadingController,
    private route: ActivatedRoute,
    private router : Router,
    private ProductService: ProductService
  ) { }

 async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.ProductService.getproduct(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      console.log(data);
      this.product = data;
      this.setSegmentValue();
      this.datashow =true ;
       loading.dismiss();
    });
  }


  setSegmentValue(){
    if (this.product?.description != ''){
      this.segmentValue = "description" ;
    }else if (this.product?.short_description != ''){
      this.segmentValue = "information" ;
    }else if (this.product?.attributes != ''){
      this.segmentValue = "information" ;
    }

  }

}
