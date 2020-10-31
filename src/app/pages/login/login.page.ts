import { async } from '@angular/core/testing';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   credentiels : FormGroup;

  constructor(
    private fb : FormBuilder,
    private alertController : AlertController,
    private router : Router,
    private loadingController : LoadingController,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.credentiels = this.fb.group({
      username :['' , [Validators.required]],
      password : ['' , [Validators.required , Validators.minLength(6)]] 
    })
  }

  async login(){
     const loading = await this.loadingController.create();
     await loading.present();

     this.authService.login(this.credentiels.value).subscribe(
       async (res) => {
         await loading.dismiss();
         this.router.navigateByUrl('/all-products' , {replaceUrl : true});
       }, async (res) => {
         await loading.dismiss();
         const alert = await this.alertController.create({
           header : 'login failer',
           message : res.error.error ,
           buttons : ['OK'],
         }) ;
         await alert.present();
       }
     )
  }

  get username() {
    return this.credentiels.get('username');
  }

  get password() {
    return this.credentiels.get('password');
  }

}
