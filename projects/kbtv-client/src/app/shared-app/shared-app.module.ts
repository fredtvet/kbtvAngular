import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { StateAuthModule } from 'state-auth';
import { StateManagementModule } from 'state-management';
import { ListCardComponent } from './components/list-card/list-card.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { ReverseArrayPipe } from './pipes/reverse-array';
import { TransformButtonsPipe } from './pipes/transform-buttons.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,  
    NavItemComponent,
    ListCardComponent,
    ListItemComponent,
    ReverseArrayPipe,
    TransformButtonsPipe,
  ],
  imports: [
    RouterModule,
    CommonModule, 
    FlexLayoutModule,
    StateManagementModule,
    StateAuthModule,
    
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
    
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatRippleModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,  
    MatCardModule,

    StateAuthModule,

    PageNotFoundComponent,
    NavItemComponent,   
    ListCardComponent,
    ListItemComponent,
    
    ReverseArrayPipe,
    TransformButtonsPipe,
  ]
})
export class SharedAppModule {}
