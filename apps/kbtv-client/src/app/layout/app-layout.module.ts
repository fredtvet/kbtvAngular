import { NgModule } from '@angular/core';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainSideNavHeaderComponent } from './main-nav/main-side-nav-header.component';
import { MainSideNavListComponent } from './main-nav/main-side-nav-list.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
  declarations: [
    MainNavComponent,
    NavItemComponent,
    MainSideNavListComponent,
    MainSideNavHeaderComponent
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
