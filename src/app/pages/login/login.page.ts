import { UserService } from './../../services/user/user.service';
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

  loginPicture = "../../../assets/images/login_picture.jpg";
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
    private GLobalVarService: GlobalVarServiceService,
    public menuCtrl: MenuController,
    private http: HttpClient,
    private userService: UserService


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
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });

    this.authService.login(this.credentiels.value).then(
      async (res: any) => {
        console.log("succes", res);

     

        this.storage.remove('auth-token');
        this.storage.set('auth-token', res.token);
        let user = {
          id: res.user_id
        }
        this.userService.getUserById(user.id).then((data3: any) => {
          //check first Time
          this.storage.remove('auth-user');
          this.storage.set('auth-user', data3);
  
          this.storage.get('first_time').then((val) => {
            if (val !== null) {
              console.log("app isn't for the first time started");
            } else {
              console.log("probably the first time");
              this.storage.set('first_time', 'done')
              //get user device id

              this.userService.checkFirstTime(data3.email).then(async (data1: any) => {
                if (data1.result === "exist") {
                } else {
                  //add email to mobile_users table
                  this.userService.addFirstTime(data3.email).then(async (data1: any) => {
                    if (data1.result === "created") {
                      // set 5 points for first time 
                      this.updateUserPoints(data3, 5);
                    
                      const alert = await this.alertController.create({
                        header: "Cadeau",
                        mode: 'ios',
                        message: "Vous venez de recevoir 5 points de fid??lit?? gr??ce au t??l??chargement de l'application",
                        buttons: [
                          {
                            text: "Merci",
                            cssClass: 'btn-alert-connexion',
                            handler: () => {
                              alert.dismiss();
                            
                            }
                          },
                        ]
                      });
                      await alert.present();
                    }
                  });
                }
              });
            }
          });
        });

     

        this.storage.remove('user-state');
        this.storage.set('user-state', true);

        this.GLobalVarService.publishSomeDataUserState({
          UserState: true
        });
        this.loading.then((load) => {
          load.dismiss();
        });
        this.router.navigateByUrl('/bottom-navigation', { replaceUrl: true });
      }, async (res) => {
        this.loading.then((load) => {
          load.dismiss();
        });

        console.log("error", res);

        const alert = await this.alertController.create({
          header: "Connexion ??chou??",
          mode: 'ios',
          message: res.error.message,
          buttons: [
            {
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
              handler: () => {
                alert.dismiss();

              }
            },
          ]
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


  getPicture() {
    this.http.get("https://laboratoiretresorsnaturels.tn/static_pictures/login_picture.jpg").toPromise().then(data => {
      this.loginPicture = "https://laboratoiretresorsnaturels.tn/static_pictures/login_picture.jpg";
    }).catch(error => {
      this.loginPicture = "../../../assets/images/login_picture.jpg";
    });
  }



  updateUserPoints(user: any, points: number) {

    let Us = user
    delete Us.billing;
    delete Us.shipping;
    this.userService.insertLoyalityProgram(Us.id, "earn", "mobile_download", points + "").then((dat: any) => {
      if (dat.result === "created") {
        console.log("updated user points loyality");
      }
    });
    this.storage.set('first_time', 'done');
  }


  goToHome() {
    this.router.navigateByUrl('/bottom-navigation');
  }


}
