import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page'

const routes: Routes = [
   {
      path: 'home',
      component: HomePage,
      children: [
         {
            path: 'search',
            loadChildren: () => import('../pages/search/search.module').then(n => n.SearchPageModule)
         },
         {
            path: 'segment',
            loadChildren: () => import('../pages/segment/segment.module').then(n => n.SegmentPageModule)
         },
         {
            path: 'camera',
            loadChildren: () => import('../pages/camera/camera.module').then(n => n.CameraPageModule)
         },
         {
            path: 'cards',
            loadChildren: () => import('../pages/cards/cards.module').then(n => n.CardsPageModule)
         },
         {
            path: 'contact',
            loadChildren: () => import('../pages/contact/contact.module').then(n => n.ContactPageModule)
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class HomePageRoutingModule { }
