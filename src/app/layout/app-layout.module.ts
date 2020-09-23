import { NgModule } from '@angular/core';
import { MainBottomNavComponent } from './main-nav/main-bottom-nav/main-bottom-nav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { MainSideNavComponent } from './main-nav/main-side-nav/main-side-nav.component';
import { MainTopNavWrapperComponent } from './main-nav/main-top-nav-wrapper.component';

@NgModule({
  declarations: [
    MainNavComponent,
    MainBottomNavComponent,
    MainSideNavComponent,
    MainTopNavWrapperComponent,
  ],
  imports: [
    SharedAppModule
  ],
  exports: [ 
    MainNavComponent,
  ]
})
export class AppLayoutModule { 
  constructor(){}
}
