import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
   selector: 'app-login',
   templateUrl: './login.page.html',
   styleUrls: ['./login.page.scss'],
})
export class LoginPage {

   model: any = {};

   private loading;

   constructor(private loadingController: LoadingController, private loginService: LoginService, private router: Router, public alertController: AlertController) { }

   ngOnInit() {
   }

   onLogin(loginForm) {

      if (!loginForm.valid) {
         return console.log("Form is not valid")
      }
      const username: string = loginForm.value.username;
      const password: string = loginForm.value.password;

      this.loadingController.create({
         spinner: "crescent",
         message: "Sign In"
      }).then((overlay) => {
         this.loading = overlay;
         this.loading.present();
      });

      // setTimeout(() => {
      this.loginService.signin(username, password).subscribe(
         res => {
            console.log(res)
            loginForm.reset();
            this.router.navigate(["/home/cards"])
            this.loading.dismiss();
         },
         error => {
            console.log(error)
            this.presentAlert();
         }
      )
      // }, 1000)

      // this.loginService.signin(username, password).subscribe(
      //    res => {

      //       setTimeout(() => {
      //          this.loading.dismiss();
      //          console.log(res)
      //          loginForm.reset();
      //          this.router.navigate(["/home/search"])
      //       }, 3000)
      //    },
      //    error => {
      //       console.log(error)
      //       this.presentAlert();
      //    }
      // )
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
