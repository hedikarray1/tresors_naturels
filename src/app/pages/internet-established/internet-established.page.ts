import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internet-established',
  templateUrl: './internet-established.page.html',
  styleUrls: ['./internet-established.page.scss'],
})
export class InternetEstablishedPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  close(){
this.modalCtrl.dismiss();
  }

}
