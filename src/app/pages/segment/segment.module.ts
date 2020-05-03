import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentPageRoutingModule } from './segment-routing.module';

import { SegmentPage } from './segment.page';

import { DetailsComponent } from '../../components/details/details.component'
import { AddCardComponent } from '../../components/add-card/add-card.component'

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      SegmentPageRoutingModule
   ],
   declarations: [SegmentPage, DetailsComponent, AddCardComponent],
   entryComponents: [DetailsComponent, AddCardComponent]
})
export class SegmentPageModule { }
