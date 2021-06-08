import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
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
import { TranslateModelPropPipe } from './pipes/translate-model-prop.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,  
    ListItemComponent,
    IfRolePipe,
    TranslateModelPropPipe,
    AddToHomeScreenDirective,
    
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
    RequestDescriptionPipe,
    TranslateModelPropPipe,
    AddToHomeScreenDirective, 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedAppModule {}
