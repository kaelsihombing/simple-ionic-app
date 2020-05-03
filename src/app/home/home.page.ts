import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { Router, NavigationExtras } from '@angular/router';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { Observable } from 'rxjs';
import { SegmentService } from '../pages/segment/segment.service'
import { SegmentPage } from '../pages/segment/segment.page'
import { CardPage } from "../pages/cards/cards.page"
import { CardService } from "../pages/cards/card.service"

@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
   providers: [SegmentPage, CardPage]
})

export class HomePage implements OnInit {

   photo: SafeResourceUrl;
   myContacts: Contact[] = [];
   cardsData = [];

   constructor(private cardsService: CardService, private cardPage: CardPage, private segmentPage: SegmentPage, private sanitizer: DomSanitizer, private router: Router, private contacts: Contacts, private segmentService: SegmentService) { }

   ngOnInit() {
      this.cardsService.getMyData().subscribe(user => {
         let navigationExtras: NavigationExtras = {
            state: {
               dataUser: user.data
            }
         }
         this.router.navigate(['home/cards'], navigationExtras)
      });
   }
   async takePicture() {
      const image = await Plugins.Camera.getPhoto({
         quality: 100,
         allowEditing: true,
         resultType: CameraResultType.DataUrl,
         source: CameraSource.Camera
      })
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
      this.sendPhoto();
   }

   sendPhoto() {
      let navigationExtras: NavigationExtras = {
         state: {
            photo: this.photo
         }
      }
      this.router.navigate(['home/camera'], navigationExtras)
   }

   loadContacts() {

      let options = {
         filter: '',
         multiple: true,
         hasPhoneNumber: true
      }

      this.contacts.find(['*'], options).then((contacts: Contact[]) => {

         let navigationExtras: NavigationExtras = {
            state: {
               myContacts: contacts
            }
         }

         this.router.navigate(['contact'], navigationExtras);
      })
   }

   getCardsData() {
      this.segmentPage.getCardsData()

      // this.segmentService.searchData().subscribe(res => {
      //    this.cardsData = res.data
      //    let navigationExtras: NavigationExtras = {
      //       state: {
      //          cardsData: this.cardsData
      //       }
      //    }

      //    this.router.navigate(['home/segment'], navigationExtras)
      // })
   }

   // getMyData() {
   //    this.cardPage.getMyData();
   // }


   // Dont code bellow here
}
