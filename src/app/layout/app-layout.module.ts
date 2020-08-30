import { NgModule } from '@angular/core';
import { DetailTopNavComponent } from './main-nav/detail-top-nav/detail-top-nav.component';
import { MainBottomNavComponent } from './main-nav/main-bottom-nav/main-bottom-nav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainSideNavContentComponent } from './main-nav/main-side-nav-content/main-side-nav-content.component';
import { MainTopNavComponent } from './main-nav/main-top-nav/main-top-nav.component';
import { SharedAppModule } from '../shared-app/shared-app.module';

@NgModule({
  declarations: [
    MainNavComponent,
    MainBottomNavComponent,
    MainSideNavContentComponent,
    MainTopNavComponent,
    DetailTopNavComponent,
  ],
  imports: [
    SharedAppModule
  ],
  exports: [ 
    MainNavComponent,
    SharedAppModule
  ]
})
export class AppLayoutModule { 
  constructor(){
    console.log("LayoutModule");
  }
}
