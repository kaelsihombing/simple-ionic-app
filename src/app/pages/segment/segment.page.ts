import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SegmentService } from './segment.service'
import { NavigationExtras, Router } from '@angular/router';

@Component({
   selector: 'app-segment',
   templateUrl: './segment.page.html',
   styleUrls: ['./segment.page.scss'],
})
export class SegmentPage {

   @ViewChild('slides', { static: false }) slider: IonSlides;

   cardsData = [];
   filteredWorks = [];
   filteredFamily = [];
   filteredFriend = [];

   selectedSlide: 0;
   segment = 0;
   sliderOptions = {
      initialSlide: 0,
      slidesPerView: 1,
      speed: 400
   }
   constructor(private segmentService: SegmentService, private router: Router) { }

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
