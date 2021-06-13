import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedAppModule } from '@shared-app/shared-app.module';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { MainSideNavHeaderComponent } from './main-side-nav-header.component';
import { MainSideNavListComponent } from './main-side-nav-list.component';

@NgModule({
  declarations: [
    NavItemComponent,
    MainSideNavListComponent,
    MainSideNavHeaderComponent
  ],
  imports: [
    SharedAppModule,
    MatSidenavModule
  ],
  exports: [
    NavItemComponent,
    MainSideNavListComponent,
    MainSideNavHeaderComponent,
    MatSidenavModule
  ]
})
export class SharedLayoutModule {}
