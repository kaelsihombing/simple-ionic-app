import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
   selector: 'app-add-card',
   templateUrl: './add-card.component.html',
   styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {

   constructor(private modalController: ModalController) { }
   @Input() public userDetails: String;
   public userDetail = {
   }

   ngOnInit() { }

   async closeModal() {
      await this.modalController.dismiss(this.userDetail);
   }
}
