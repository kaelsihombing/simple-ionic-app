import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service'

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

   constructor(private cardsService: CardService) { }

   ngOnInit() {
      this.cardsService.getMyData().subscribe(user => {
         this.dataUser = user.data;
         console.log(this.dataUser)
      });
   }

   // getMyData() {
   //    this.cardsService.getMyData().subscribe(res => {
   //       this.results = res.data.email
   //       console.log("Results!: ", this.results)
   //    })
   // }
}
