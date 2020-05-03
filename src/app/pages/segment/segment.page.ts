import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SegmentService } from './segment.service'
import { NavigationExtras, Router } from '@angular/router';
import { DetailsComponent } from '../../components/details/details.component'
import { AddCardComponent } from '../../components/add-card/add-card.component'

@Component({
   selector: 'app-segment',
   templateUrl: './segment.page.html',
   styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

   @ViewChild('slides', { static: false }) slider: IonSlides;

   cardsData = [];
   filteredWorks = [];
   filteredFamily = [];
   filteredFriend = [];

   public userDetail = {
      fullname: 'Santo'
   }
   public userDetails: String

   selectedSlide: 0;
   segment = 1;
   sliderOptions = {
      initialSlide: 0,
      slidesPerView: 1,
      speed: 400
   }
   constructor(private modalController: ModalController, private segmentService: SegmentService, private router: Router) { }

   ngOnInit() {

   }

   doRefresh(event) {
      console.log('Begin async operation');

      setTimeout(() => {
         console.log('Async operation has ended');
         event.target.complete();
      }, 2000);
   }

   async openModal() {
      const modal = await this.modalController.create({
         component: AddCardComponent
      });
      return await modal.present();
   }

   async openModalPassData() {
      const modal = await this.modalController.create({
         component: DetailsComponent,
         componentProps: {
            data: this.userDetail
         },
         showBackdrop: false,
         backdropDismiss: false
      });

      modal.onWillDismiss().then(dataReturned => {
         this.userDetails = dataReturned.data;
         console.log("receive", this.userDetails)
      })

      return await modal.present().then(_ => {
         console.log("sending", this.userDetail)

      })
   }

   slideChanged(slider) {
      this.selectedSlide = slider;
      slider.getActiveIndex().then(selectedIndex => {
         this.segment = selectedIndex;
      })
   }

   segmentChanged(ev: any) {
      this.slider.slideTo(this.segment);
   }

   async getCardsData() {
      await this.segmentService.searchData().subscribe(res => {
         this.cardsData = res.data
         this.filteredWorks = this.cardsData.filter(data => data.relation == "works")
         this.filteredFamily = this.cardsData.filter(data => data.relation == "family")
         this.filteredFriend = this.cardsData.filter(data => data.relation == "friend")
         console.log(this.cardsData)
      })
   }
}
