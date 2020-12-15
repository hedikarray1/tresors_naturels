import { GlobalVarServiceService } from './../../services/globalVarService/global-var-service.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, MenuController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  register1Form: FormGroup;
  //register2Form: FormGroup;

  userRegistred: any = {};
  loading;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  passwordConfirmType: string = 'password';
  passwordConfirmIcon: string = 'eye-off';

  @ViewChild('mySlider') slides: IonSlides;

  validation_messages = {
    Password: [
      { type: 'required', message: 'Ce champs est obligatoire' },
      { type: 'minlength', message: 'Le mot de passe doit contenir au moins 6 caractères' },
      { type: 'maxlength', message: 'Le mot de passe doit contenir au plus 25 caractères' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Ce champs est obligatoire' },
    ],
    Email: [
      { type: 'required', message: 'Ce champs est obligatoire' },
      { type: 'pattern', message: "L'e-mail doit être un e-mail valide." },
    ],
    username: [
      { type: 'required', message: 'Ce champs est obligatoire' },
      { type: 'maxlength', message: "Le nom d'utilisateur doit contenir au plus 25 caractères" },
    ],
    FirstName: [
      { type: 'required', message: 'Ce champs est obligatoire' },
      { type: 'maxlength', message: "Le prénom doit contenir au plus 25 caractères" },
      { type: 'pattern', message: 'Le prénom ne doit contenir que des lettres' }
    ],
    LastName: [
      { type: 'required', message: 'Ce champs est obligatoire' },
      { type: 'maxlength', message: "Le nom doit contenir au plus 25 caractères" },
      { type: 'pattern', message: 'Le nom ne doit contenir que des lettres' }
    ],

  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private GLobalVarService: GlobalVarServiceService,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }



  ngOnInit() {
    this.menuCtrl.enable(false);
    this.register1Form = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])),
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(6),
        Validators.required,
      ])),
      confirmPassword: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
        Validators.required
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z]+$'),
        Validators.required
      ])),
    },
      {
        validator: this.matchingPasswords('password', 'confirmPassword')
      }
    );


  }


  async createuser() {

    console.log(this.register1Form.value);
    this.loading = this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      message: `<ion-img src="../../../assets/gif/LOAD-PAGE3.gif"  style="background: transparent !important;"/>`,

    });
    this.loading.then((load) => {
      load.present();
    });
    this.userService.createUser(this.register1Form.value).then(

      async (data: any) => {

        console.log("response register ", data);
       
        this.userRegistred = data;
        this.storage.remove('auth-user');
        this.storage.set('auth-user', this.userRegistred);

        this.storage.remove('user-state');
        this.storage.set('user-state', true);

        this.GLobalVarService.publishSomeDataUserState({
          UserState: true
        });
        //check first Time
        this.storage.get('first_time').then(async (val) => {
          if (val !== null) {
            console.log("app isn't for the first time started");
            //set 10 points for registration
         const alert = await this.alertController.create({
              header: "Cadeau",
              mode: 'ios',
              message: "Vous venez de recevoir 10 points de fidélité grâce au téléchargement de l'application",
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
         
          } else {
            console.log("probably the first time");
            this.storage.set('first_time', 'done');
            this.userService.checkFirstTime(data.email).then(async (data1: any) => {
              if (data1.result === "exist") {
                //set 10 points for registration
                const alert = await this.alertController.create({
                  header: "Cadeau",
                  mode: 'ios',
                  message: "Vous venez de recevoir 10 points de fidélité grâce au téléchargement de l'application",
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
             

              } else {
                //add email to mobile_users table
                this.userService.addFirstTime(data.email).then(async (data1: any) => {
                  if (data1.result === "created") {
                    // set 15 points (5 for first time and 10 for registration)
                    const alert = await this.alertController.create({
                      header: "Cadeau",
                      mode: 'ios',
                      message: "Vous venez de recevoir 15 points de fidélité grâce au téléchargement de l'application",
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
                    this.updateUserPoints(data, 5);
                  }
                });
              }
            });
          }
        });
        this.loading.then((load) => {
          load.dismiss();
        });

        this.router.navigateByUrl('/bottom-navigation', { replaceUrl: true });

      }, async (err) => {
        console.log("error", err);
        this.loading.then((load) => {
          load.dismiss();
        });


        const alert = await this.alertController.create({
          header: "Erreur lors de la creation de compte",
          mode: 'ios',
          message: err.error.message,
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
    );
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {

    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowConfirmPassword() {
    this.passwordConfirmType = this.passwordConfirmType === 'text' ? 'password' : 'text';
    this.passwordConfirmIcon = this.passwordConfirmIcon === 'eye-off' ? 'eye' : 'eye-off';
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

  goTologin() {
    this.router.navigateByUrl("login");
  }
}
