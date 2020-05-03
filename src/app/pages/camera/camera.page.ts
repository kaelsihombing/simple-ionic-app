import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-camera',
   templateUrl: './camera.page.html',
   styleUrls: ['./camera.page.scss'],
})
export class CameraPage {

   photo: SafeResourceUrl;

   constructor(private route: ActivatedRoute, private router: Router) {
      this.route.queryParams.subscribe(params => {
         console.log("PARAMS: ", params)
         if (this.router.getCurrentNavigation().extras.state) {
            this.photo = this.router.getCurrentNavigation().extras.state.photo
         }
      })
   }

}
