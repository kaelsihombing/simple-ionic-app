import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';

@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
})
export class LoginPage {

   model: any = {};

   constructor(private loginService: LoginService, private router: Router, public alertController: AlertController) { }

   ngOnInit() {
   }

   onLogin(loginForm) {

      if (!loginForm.valid) {
         return console.log("Form is not valid")
      }
      const username: string = loginForm.value.username;
      const password: string = loginForm.value.password;

      this.loginService.signin(username, password).subscribe(
         res => {
            console.log(res)
            loginForm.reset();
            this.router.navigate(["/home/search"])
         },
         error => {
            console.log(error)
            this.presentAlert();
         }
      )
   }

   async presentAlert() {
      const alert = await this.alertController.create({
         header: 'Uppss!',
         message: 'Username or Password is wrong, please check again',
         buttons: ['OK']
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result)
   }

}
