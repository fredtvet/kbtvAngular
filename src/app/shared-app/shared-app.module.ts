import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BottomSheetMenuComponent, AppButtonComponent, NavItemComponent, NotificationComponent } from './components';
import { ImageErrorReloaderDirective, IfRoleDirective, InputListenerDirective } from './directives';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckRolesInButtonsPipe, ReverseArrayPipe, TransformButtonsPipe } from './pipes';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    BottomSheetMenuComponent,   
    AppButtonComponent,  
    NavItemComponent,
    ImageErrorReloaderDirective,
    IfRoleDirective,
    CheckRolesInButtonsPipe,
    ReverseArrayPipe,
    TransformButtonsPipe,
    InputListenerDirective,
    NotificationComponent,
  ],
  imports: [
    RouterModule,
    CommonModule, 
    FlexLayoutModule,
    MatSnackBarModule,      
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    RouterModule,
    CommonModule, 
    FlexLayoutModule,
    MatSnackBarModule,   
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatRippleModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatIconModule,
    MatProgressSpinnerModule,  
    PageNotFoundComponent,
    BottomSheetMenuComponent,   
    AppButtonComponent,  
    NavItemComponent,
    ImageErrorReloaderDirective,
    IfRoleDirective,
    CheckRolesInButtonsPipe,
    ReverseArrayPipe,
    TransformButtonsPipe,
    NotificationComponent,
    InputListenerDirective,
  ]
})
export class SharedAppModule {}
