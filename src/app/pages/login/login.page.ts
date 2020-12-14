import { HttpClient } from '@angular/common/http';
import { GlobalVarServiceService } from './../../services/globalVarService/global-var-service.service';
import { Storage } from '@ionic/storage';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginPicture="../../../assets/images/login_picture.jpg";
  credentiels: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
loading;
  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private storage: Storage,
    private GLobalVarService:GlobalVarServiceService,
    public menuCtrl: MenuController,
    private http:HttpClient
  ) { 
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.credentiels = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  async login() {
    this.loading =  this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,
     
    });
    this.loading.then((load)=>{
      load.present();
        });

    this.authService.login(this.credentiels.value).then(
      async (res: any) => {
        console.log("succes", res);

        this.loading.then((load)=>{
          load.dismiss();
                });
          

        this.storage.remove('auth-token');
        this.storage.set('auth-token', res.token);

        let user = {
          id: res.user_id
        }

        this.storage.remove('auth-user');
        this.storage.set('auth-user', user);

        this.storage.remove('user-state');
        this.storage.set('user-state', true);

        this.GLobalVarService.publishSomeDataUserState({
          UserState: true
      });

        this.router.navigateByUrl('/bottom-navigation', { replaceUrl: true });
      }, async (res) => {
        this.loading.then((load)=>{
          load.dismiss();
                });
          
        console.log("error", res);
        const alert = await this.alertController.create({
          header: 'Connexion échoué',
          message: res.error.message,
          buttons: ['OK'],
        });
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

  goToRegister() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  getPicture(){
    this.http.get("https://laboratoiretresorsnaturels.tn/static_pictures/login_picture.jpg").toPromise().then(data=>{
    this.loginPicture="https://laboratoiretresorsnaturels.tn/static_pictures/login_picture.jpg";
    }).catch(error=>{
      this.loginPicture="../../../assets/images/login_picture.jpg";
    });
  }
}
