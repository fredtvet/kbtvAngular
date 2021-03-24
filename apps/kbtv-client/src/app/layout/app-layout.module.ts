import { NgModule } from '@angular/core';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainSideNavComponent } from './main-nav/main-side-nav/main-side-nav.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
  declarations: [
    MainNavComponent,
    MainSideNavComponent,
    NavItemComponent,
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
