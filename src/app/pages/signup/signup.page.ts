import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SignupService } from './signup.service'

@Component({
   selector: 'app-signup',
   templateUrl: './signup.page.html',
   styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
   // isLoading: boolean = false;

   model: any = {};
   constructor(private signupService: SignupService, private router: Router, public alertController: AlertController) { }

   onSignup(signupForm) {
      if (!signupForm.valid) {
         return console.log("Form is not valid");
      }
      // this.isLoading = true;

      const email: string = signupForm.value.email;
      const username: string = signupForm.value.username;
      const password: string = signupForm.value.password;
      this.signupService
         .signup(email, username, password)
         .subscribe(
            () => {
               // this.isLoading = false;
               signupForm.reset();
               this.router.navigate(["/home/search"]);
            },
            error => {
               // this.isLoading = false;
               alert(error.error.error.message);
            }
         );
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
