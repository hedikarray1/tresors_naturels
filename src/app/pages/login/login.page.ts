import { PanierService } from './../../services/panier/panier.service';
import { Storage } from '@ionic/storage';
import { StorageService } from './../../services/storage/storage.service';
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

  credentiels: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService,
    private storage: Storage,
    private panierService: PanierService
  ) { }

  ngOnInit() {
    this.credentiels = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentiels.value).subscribe(
      async (res: any) => {
        console.log("succes", res);

        await loading.dismiss();

        this.storage.remove('auth-token');
        this.storage.set('auth-token', res.token);

        let user = {
          id: res.user_id
        }
        await this.panierService.addToCartOnServer([], res.user_id).subscribe((res: any[]) => {
          console.log("panier", res);
        })

        this.storage.remove('auth-user');
        this.storage.set('auth-user', user);

        this.storage.remove('user-state');
        this.storage.set('user-state', true);

        this.router.navigateByUrl('/bottom-navigation', { replaceUrl: true });
      }, async (res) => {
        await loading.dismiss();
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

}
