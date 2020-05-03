import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SignupService } from './signup.service'

@Component({
   selector: 'app-signup',
   templateUrl: './signup.page.html',
   styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
   // isLoading: boolean = false;

   model: any = {};

   private loading;

   constructor(private loadingController: LoadingController, private signupService: SignupService, private router: Router, public alertController: AlertController) { }

   onSignup(signupForm) {
      if (!signupForm.valid) {
         return console.log("Form is not valid");
      }
      // this.isLoading = true;

      const email: string = signupForm.value.email;
      const username: string = signupForm.value.username;
      const password: string = signupForm.value.password;

      this.loadingController.create({
         spinner: "crescent",
         message: "Sign Up"
      }).then((overlay) => {
         this.loading = overlay;
         this.loading.present();
      });

      // setTimeout(() => {
      this.signupService
         .signup(email, username, password)
         .subscribe(
            () => {
               signupForm.reset();
               this.router.navigate(["/home/cards"]);
               this.loading.dismiss();
            },
            error => {
               // this.isLoading = false;
               alert(error.error.error.message);
            }
         );
      // }, 3000)


   }

   async presentAlert() {
      const alert = await this.alertController.create({
         header: 'Uppss!',
         message: 'Sorry, maybe email has been used',
         buttons: ['OK']
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result)
   }
}
