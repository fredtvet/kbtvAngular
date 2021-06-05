import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { SharedAppModule } from '@shared-app/shared-app.module';
import { SharedLayoutModule } from './shared-layout.module';

@Component({
  selector: 'app-main-nav-desktop',
  template: `
    <mat-sidenav-container class="h-100">

        <mat-sidenav fixedInViewport class="mat-elevation-z1" 
            role="navigation" mode="side" opened="true">
    
        <app-main-side-nav-header></app-main-side-nav-header>
    
        <mat-divider></mat-divider>
        
        <app-main-side-nav-list></app-main-side-nav-list>
        
        </mat-sidenav>
    
        <mat-sidenav-content>
    
            <div>   
                <router-outlet #outlet="outlet"></router-outlet>    
            </div>
    
        </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styleUrls: ['./main-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavDesktopComponent  { 

}
@NgModule({
    declarations: [
        MainNavDesktopComponent,
    ],
    imports: [
      SharedAppModule,
      SharedLayoutModule
    ],
    exports: [ ]
})
export class MainNavDesktopModule { }