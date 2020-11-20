import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
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
  shippingForm: FormGroup;
  billingForm: FormGroup;
  //register2Form: FormGroup;

  userRegistred: any = {};

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
    private loadingController: LoadingController,
    private storage: Storage,
  ) { }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  ionViewDidLoad(){
    this.slides.lockSwipes(true);
  }

  ngOnInit() {
    
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

    this.billingForm = this.fb.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      company: new FormControl(''),
      address_1: new FormControl(''),
      address_2: new FormControl(''),
      city: new FormControl(''),
      postcode: new FormControl(''),
      country: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
    });


    this.shippingForm = this.fb.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      company: new FormControl(''),
      address_1: new FormControl(''),
      address_2: new FormControl(''),
      city: new FormControl(''),
      postcode: new FormControl(''),
      country: new FormControl(''),
    });


  }


  async createuser() {

    console.log(this.register1Form.value);
    const loading = await this.loadingController.create();
    await loading.present();
    this.userService.createUser(this.register1Form.value).then(

      async (data: any) => {

        console.log("response register ", data);
        await loading.dismiss();

        this.userRegistred = data;
        this.swipeNext();

      }, async (err) => {
        console.log("error", err);
        await loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Erreur lors de la creation de compte',
          message: err.error.message,
          buttons: [{
            text: "D'accord",
            cssClass: 'btn-alert-connexion',
          }],
        });
        await alert.present();
      }

    );
  }

  async updateUser() {
    console.log(this.shippingForm.value);
    console.log(this.billingForm.value);
    this.billingForm.value.phone =   this.billingForm.value.phone +'';
    this.userRegistred.billing = this.billingForm.value;
    this.userRegistred.shipping = this.shippingForm.value;
    const loading = await this.loadingController.create();
    await loading.present();
    this.userService.updateUser(this.userRegistred).then(

      async (data: any) => {

        console.log("response register ", data)
        await loading.dismiss();

        this.storage.remove('auth-user');
        this.storage.set('auth-user', data);

        this.storage.remove('user-state');
        this.storage.set('user-state', true);

        this.router.navigateByUrl('/bottom-navigation');

      }, async (err) => {
        console.log("error", err);
        await loading.dismiss();
        err.error.message.replace('billing','Facturation');
        err.error.message.replace('shipping','Livraison');
        if (err.error.data.params.billing){
          const alert = await this.alertController.create({
            header: 'Erreur lors de la creation de compte',
            message: "<p>"+err.error.message.replace('billing','Facturation') +"</p>"+ "<p>"+err.error.data.params.billing +"</p>"   ,
            buttons: [{
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
            }],
          });
          await alert.present();
        }
       else if (err.error.data.params.shipping){
          const alert = await this.alertController.create({
            header: 'Erreur lors de la creation de compte',
            message: "<p>"+err.error.message.replace('shipping','Livraison') +"</p>"+  "<p>"+err.error.data.params.shipping +"</p>"  ,
            buttons: [{
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
            }],
          });
          await alert.present();
        }else {
          const alert = await this.alertController.create({
            header: 'Erreur lors de la creation de compte',
            message: err.error.message ,
            buttons: [{
              text: "D'accord",
              cssClass: 'btn-alert-connexion',
            }],
          });
          await alert.present();
        }
        
      
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



  swipeNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  swipePrev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  hideShowConfirmPassword() {
    this.passwordConfirmType = this.passwordConfirmType === 'text' ? 'password' : 'text';
    this.passwordConfirmIcon = this.passwordConfirmIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}
