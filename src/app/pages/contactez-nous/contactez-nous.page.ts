import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactez-nous',
  templateUrl: './contactez-nous.page.html',
  styleUrls: ['./contactez-nous.page.scss'],
})
export class ContactezNousPage implements OnInit {

  contactForm : FormGroup;

  constructor(
    private fb : FormBuilder,
  ) { }

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
