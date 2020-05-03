import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: '',
      loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
   },
   {
      path: '',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
   },
   {
      path: 'index',
      loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
   },
   {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
   },
   {
      path: 'signup',
      loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
   },
   {
      path: 'welcome',
      loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
   },
   {
      path: 'search',
      loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
   },
   {
      path: 'segment',
      loadChildren: () => import('./pages/segment/segment.module').then(m => m.SegmentPageModule)
   },
   {
      path: 'camera',
      loadChildren: () => import('./pages/camera/camera.module').then(m => m.CameraPageModule)
   },
   {
      path: 'contact',
      loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
   },
   {
      path: 'cards',
      loadChildren: () => import('./pages/cards/cards.module').then(m => m.CardsPageModule)
   }
];
@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
