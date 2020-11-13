import { async } from '@angular/core/testing';
import { StorageService } from './../../services/storage/storage.service';
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

  showPassword: boolean = false;
  showConfirm: boolean = false;


  @ViewChild('mySlider') slides: IonSlides;

  validation_messages = {
    'Password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 56characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your Password must contain  numbers and letters both uppercase and lowercase.' },
    ],
    'confirmPassword': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Your Password must contain  numbers and letters both uppercase and lowercase.' },
    ],
    'Email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email must be a valid email.' },
    ],
    'username': [
      { type: 'required', message: 'username is required.' },
      { type: 'maxlength', message: 'username cannot be more than 25 characters long.' },
    ],
    'FirstName': [
      { type: 'required', message: 'FirstName is required.' },
      { type: 'maxlength', message: 'FirstName cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your FirstName must contain only letters.' }
    ],
    'LastName': [
      { type: 'required', message: 'LastName is required.' },
      { type: 'maxlength', message: 'LastName cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your LastName must contain only letters.' }
    ],

  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private storage: StorageService,
  ) { }

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
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
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

    this.billingForm =this.fb.group({
      first_name:  new FormControl(''),
        last_name:  new FormControl(''),
        company:  new FormControl(''),
        address_1:  new FormControl(''),
        address_2:  new FormControl(''),
        city:  new FormControl(''),
        state:  new FormControl(''),
        postcode:  new FormControl(''),
        country:  new FormControl(''),
        email:  new FormControl(''),
        phone: new FormControl(''),
    })

    
    this.shippingForm =this.fb.group({
      first_name:  new FormControl(''),
        last_name:  new FormControl(''),
        company:  new FormControl(''),
        address_1:  new FormControl(''),
        address_2:  new FormControl(''),
        city:  new FormControl(''),
        state:  new FormControl(''),
        postcode:  new FormControl(''),
        country:  new FormControl(''),
        email:  new FormControl(''),
        phone: new FormControl(''),
    })


  }


  async createuser() {
    console.log(this.register1Form.value);
    // const loading = await this.loadingController.create();
    //await loading.present();
    this.userService.createUser(this.register1Form.value).subscribe(

      async (data: any) => {



        console.log("response register ", data)
        //  await loading.dismiss();
        this.register1Form.setValue(data);
        this.swipeNext();

      }, async (err) => {
        console.log("error", err);
        //await loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Register failed',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      }

    );
  }



  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
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


  togglePasswordText() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmText() {
    this.showConfirm = !this.showConfirm;
  }

  swipeNext() {
    this.slides.slideNext();
  }


}
