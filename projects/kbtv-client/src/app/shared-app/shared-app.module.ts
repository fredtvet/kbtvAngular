import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { StateAuthModule } from 'state-auth';
import { StateManagementModule } from 'state-management';
import { AddToHomeScreenDirective } from './add-to-home-screen.directive';
import { ListItemComponent } from './components/list-item/list-item.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { IfRolePipe } from './pipes/if-role.pipe';
import { ReverseArrayPipe } from './pipes/reverse-array';
import { TransformButtonsPipe } from './pipes/transform-buttons.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,  
    ListItemComponent,
    ReverseArrayPipe,
    TransformButtonsPipe,
    IfRolePipe,
    AddToHomeScreenDirective, 
  ],
  imports: [
    RouterModule,
    CommonModule, 
    StateManagementModule,
    StateAuthModule,
    
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,

    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    RouterModule,
    CommonModule, 
    
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatRippleModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,  

    StateAuthModule,

    PageNotFoundComponent,
    ListItemComponent,
    
    IfRolePipe,
    ReverseArrayPipe,
    TransformButtonsPipe,   
    AddToHomeScreenDirective, 
  ]
})
export class SharedAppModule {}
