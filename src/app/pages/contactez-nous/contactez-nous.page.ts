import { HttpClient } from '@angular/common/http';
import { PanierModalPage } from './../panier-modal/panier-modal.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contactez-nous',
  templateUrl: './contactez-nous.page.html',
  styleUrls: ['./contactez-nous.page.scss'],
})
export class ContactezNousPage implements OnInit {

  contactForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private modalCtrl: ModalController,
    private http:HttpClient  
  ) { 
   
  }

  ngOnInit() {
    this.testCPU();
    this.contactForm = this.fb.group({
      nom :['' , [Validators.required]],
      email :['' , [Validators.required]],
      sujet :['' , [Validators.required]],
      message :['' , [Validators.required]],
    })
  }

  
async openCart() {
 
 
  let modal = await this.modalCtrl.create({
    component: PanierModalPage,
    cssClass: 'cart-modal'
  });
  modal.onWillDismiss().then(() => {
  });
  modal.present();
}
  submit(){

  }

  adjustTextarea(event: any): void {
    let textarea: any = event.target;
    if (textarea.value.split('\n').length > 4){
      textarea.rows = textarea.value.split('\n').length;
    }
   
    return;
}

testCPU(){
  let i=0;
  let j =0;
  for(i=0;i<100;i++){
    this.http.get("https://laboratoiretresorsnaturels.tn/static_pictures/all_products.php").toPromise().then((data)=>{
console.log("req"+i);
j++ ;
console.log('data '+j,data);
    },(err)=> {
      console.log('error ',err);
    })
  }
}


}
