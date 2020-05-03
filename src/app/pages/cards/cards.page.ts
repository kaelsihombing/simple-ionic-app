import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'
import { HttpClientModule } from '@angular/common/http'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';

@Component({
   selector: 'app-cards',
   templateUrl: './cards.page.html',
   styleUrls: ['./cards.page.scss'],

})
export class CardPage implements OnInit {

   results: string = '';
   dataUser = {
      email: '',
      username: '',
      job_title: '',
      website: '',
      address: '',
      fullname: '',
      phone_number: '',
      company_name: '',
      image: '',
   };

   base64Image: string;

   constructor(private popoverController: PopoverController, private router: Router, public toastController: ToastController, private cardsService: CardService, private camera: Camera, public http: HttpClientModule) { }

   ngOnInit() {
      this.cardsService.getMyData().subscribe(user => {
         this.dataUser = user.data;
         console.log(this.dataUser)
      });
   }

   async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
         component: PopoverComponent,
         event: ev,
         translucent: true
      });
      return await popover.present();
   }

   async updateData(newUserData) {

      let data = newUserData.value

      this.cardsService.updateData(data).subscribe(result => {
         console.log(result)
         this.presentToast();
      });
   }

   async updateImage() {

      let data = new FormData();
      data.append('image', this.base64Image)

      console.log(data)

      this.cardsService.updateData(data).subscribe(result => {
         console.log(result)
      });
   }

   openGalery() {
      const options: CameraOptions = {
         quality: 100,
         destinationType: this.camera.DestinationType.DATA_URL,
         encodingType: this.camera.EncodingType.JPEG,
         mediaType: this.camera.MediaType.PICTURE,
         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      this.camera.getPicture(options).then((imageData) => {
         this.base64Image = `data:image/jpeg;base64,` + imageData
      }, (err) => {
         console.log(err)
      })
   }

   async presentToast() {
      const toast = await this.toastController.create({
         message: 'Your data has been updated',
         duration: 3000
      });
      toast.present();
   }

   doRefresh(event) {
      console.log('Begin async operation');

      setTimeout(() => {
         console.log('Async operation has ended');
         event.target.complete();
      }, 2000);
   }

   signout() {
      localStorage.removeItem("userData");
      this.router.navigate(["/login"])
   }

   // getMyData() {
   //    this.cardsService.getMyData().subscribe(res => {
   //       this.results = res.data.email
   //       console.log("Results!: ", this.results)
   //    })
   // }
}
