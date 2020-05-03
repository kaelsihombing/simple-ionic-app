import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { LogoComponent } from './logo/logo.component';
import { StartComponent } from './start/start.component';



@NgModule({
   declarations: [SlidesComponent, LogoComponent, StartComponent],
   exports: [SlidesComponent, LogoComponent, StartComponent],
   imports: [
      CommonModule, FormsModule, IonicModule
   ]
})
export class ComponentsModule { }
