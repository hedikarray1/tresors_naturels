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
 
  ) { 
   
  }

  ngOnInit() {
  
    this.contactForm = this.fb.group({
      nom :['' , [Validators.required]],
      email :['' , [Validators.required]],
      sujet :['' , [Validators.required]],
      message :['' , [Validators.required]],
    })
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


}
