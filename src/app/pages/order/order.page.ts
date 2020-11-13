import { UserService } from './../../services/user/user.service';
import { StorageService } from './../../services/storage/storage.service';
import { PanierService } from './../../services/panier/panier.service';
import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  panier: any[]=[];
  userState: boolean = false;
billing:any={};
shipping:any={};
current_user:any={};
payment_methodes:any[]=[];
  constructor(private UserService:UserService,private OrderService:OrderService,private PanierService:PanierService,private StorageService:StorageService) { }

  ngOnInit() {
    this.userState=this.StorageService.getUserState();
    this.getPanier();
    this.getPAymentmethodes();
    this.getUserdata();
  }

getUserdata(){
  if(this.userState){
    //for online users
    this.UserService.getUserById(this.StorageService.getUser().id).subscribe((data:any)=>{
    this.billing=data.billing;
    this.shipping=data.shipping;
    console.log("is online",data);
    this.current_user=data;

    });
  }else{
    console.log("is not online");

    this.current_user={id:0};
  }
}

  getPAymentmethodes(){
    this.OrderService.getAllPaymentMethods().subscribe((data:any[])=>{this.payment_methodes=data});

  }

  getPanierTotal() {
    let totale = 0;
    for (let p of this.panier) {
    
      totale = totale + p.quantity*p.product_regular_price ;
            
    }
    return totale;
  }

 async getPanier(){
  if (this.userState) {
  await  this.PanierService.getCartFromServer().subscribe((res: any[]) => {
      this.panier = res['data'];
      let lineItems:any[]=[];
this.panier.forEach(element=>{
  element.subtotal=element.subtotal+"";
  element.total=element.total+"";
});
    })

      } else {
        this.panier = this.PanierService.getCartFromStorage();
      }
}


  createOrder(){


this.OrderService.CreateOrder(this.billing,
  this.shipping,
  this.current_user.id,[],this.payment_methodes[0].id,this.payment_methodes[0].title,"zidna fazet","TND",this.payment_methodes,this.panier).subscribe((data:any)=>{
    console.log("payement",data);
  });


//this.OrderService.CreateOrder()

  }


}
