import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { StateAuthModule } from 'state-auth';
import { AddToHomeScreenDirective } from './add-to-home-screen.directive';
import { FetchingModelContentComponent } from './components/fetching-model-content/fetching-model-content.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { NoContentComponent } from './components/no-content.component';
import { OptimisticLoadingSpinnerComponent } from './components/optimistic-loading-spinner/optimistic-loading-spinner.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { ActionDescriptionPipe } from './pipes/action-description.pipe';
import { AsyncDetectPipe } from './pipes/async-detect.pipe';
import { IfRolePipe } from './pipes/if-role.pipe';
import { ReverseArrayPipe } from './pipes/reverse-array';
import { TransformButtonsPipe } from './pipes/transform-buttons.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { RenderTimeoutDirective } from './render-timeout.directive';

@NgModule({
  declarations: [
    PageNotFoundComponent,  
    ListItemComponent,
    ReverseArrayPipe,
    TransformButtonsPipe,
    IfRolePipe,
    TranslatePipe,
    AsyncDetectPipe,
    AddToHomeScreenDirective,
    RenderTimeoutDirective,
    OptimisticLoadingSpinnerComponent,
    NoContentComponent,
    FetchingModelContentComponent,
    ActionDescriptionPipe
  ],
  imports: [
    RouterModule,
    CommonModule, 
    StateAuthModule,
    
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,
    MatDialogModule,

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
    MatDialogModule,

    StateAuthModule,

    PageNotFoundComponent,
    ListItemComponent,
    NoContentComponent,
    FetchingModelContentComponent,
    OptimisticLoadingSpinnerComponent,
    
    IfRolePipe,
    ReverseArrayPipe,
    TransformButtonsPipe,  
    ActionDescriptionPipe ,
    TranslatePipe,
    AsyncDetectPipe,
    AddToHomeScreenDirective, 
    RenderTimeoutDirective,
  ]
})
export class SharedAppModule {}
