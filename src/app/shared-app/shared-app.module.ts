import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AppButtonComponent, ListCardComponent, NavItemComponent, NotificationComponent } from './components';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { IfRoleDirective, InputListenerDirective } from './directives';
import { ReverseArrayPipe, TransformButtonsPipe } from './pipes';

import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    PageNotFoundComponent,  
    AppButtonComponent,  
    NavItemComponent,
    NotificationComponent,
    ListCardComponent,

    ReverseArrayPipe,
    TransformButtonsPipe,

    IfRoleDirective,
    InputListenerDirective,
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
    MatCardModule,

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
    MatIconModule,
    MatProgressSpinnerModule,  
    MatCardModule,

    PageNotFoundComponent,
    AppButtonComponent,  
    NavItemComponent,   
    ListCardComponent,
    NotificationComponent,

    ReverseArrayPipe,
    TransformButtonsPipe,

    IfRoleDirective,
    InputListenerDirective,
  ]
})
export class SharedAppModule {}
