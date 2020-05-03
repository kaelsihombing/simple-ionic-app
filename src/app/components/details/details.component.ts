import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
   selector: 'app-details',
   templateUrl: './details.component.html',
   styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

   constructor(private modalController: ModalController) { }
   @Input() public userDetails: String;
   public userDetail = {
      address: "batam",
      company_name: "glints",
      email: "ana@gmail.com",
      fullname: "ana hiburg",
      image: "https://ik.imagekit.io/m1ke1magek1t/IMG-1588419679950_TmADhKMrc",
      job_title: "developer",
      phone_number: "0812137564333",
      relation: "works",
      website: "ana@gmail.com"
   }

   ngOnInit() { }

   async closeModal() {
      await this.modalController.dismiss(this.userDetail);
   }
}
