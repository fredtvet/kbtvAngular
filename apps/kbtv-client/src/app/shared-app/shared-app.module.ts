import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
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
import { IfRolePipe } from './pipes/if-role.pipe';
import { RequestDescriptionPipe } from './pipes/request-description.pipe';
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
    AddToHomeScreenDirective,
    RenderTimeoutDirective,
    OptimisticLoadingSpinnerComponent,
    NoContentComponent,
    FetchingModelContentComponent,
    RequestDescriptionPipe
  ],
  imports: [
    RouterModule,
    CommonModule, 
    StateAuthModule,
    
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatRippleModule,

    MatIconModule,
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

    StateAuthModule,

    PageNotFoundComponent,
    ListItemComponent,
    NoContentComponent,
    FetchingModelContentComponent,
    OptimisticLoadingSpinnerComponent,
    
    IfRolePipe,
    ReverseArrayPipe,
    TransformButtonsPipe,  
    RequestDescriptionPipe,
    TranslatePipe,
    AddToHomeScreenDirective, 
    RenderTimeoutDirective,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedAppModule {}
