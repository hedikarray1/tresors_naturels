import { Storage } from '@ionic/storage';
import { ProductService } from './../../services/product/product.service';
import { OrderService } from './../../services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {

  constructor(private loadingController: LoadingController,
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private storage: Storage,
    private router: Router,
    private OrderService: OrderService
  ) { }

  status = {
    'pending': { title: 'en attente', color: 'warning' },
    'processing': { title: 'en cours', color: 'secondary' },
    'on-hold': { title: 'en attente', color: 'warning' },
    'completed': { title: 'Terminé', color: 'success' },
    'cancelled': { title: 'Annulé', color: 'danger' },
    'refunded': { title: 'Remboursé', color: 'tertiary' },
    'failed': { title: 'échec', color: 'danger' },
    'trash': { title: 'En corbeille', color: 'danger' }
  }
  orderId = '';
  Order: any = {}
  facturationitem = true;
  livraisonitem = false;

  totalitem = 0;
  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrder();
  }



  doRefresh(event) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrder();
    setTimeout(() => {

      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  ionViewDidEnter() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrder();
  }
  getOrder() {
    let lineItems: any[] = [];
  
    this.OrderService.getMyOrderDetails(this.orderId).then((data: any) => {
      this.Order = data;
      lineItems = data.line_items ;
      this.totalitem = 0 ;
      lineItems.forEach(element => {
        this.totalitem =  this.totalitem + parseFloat(element.total) ;
        this.ProductService.getproduct(element.product_id).then((data1: any) => {
          element.product = data1;
        });
      });
      this.Order.line_items = lineItems;
      this.Order.date_created = new Date(this.Order.date_created);
      console.log('order detail ', this.Order);
    });
  }



  showFacturationLivraison(type) {
    if (type === 'facturation') {
      this.facturationitem = true;
      this.livraisonitem = false;

    } else {
      this.facturationitem = false;
      this.livraisonitem = true;
    }
  }


}
