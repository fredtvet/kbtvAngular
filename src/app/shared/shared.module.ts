import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AppLayoutModule } from '../layout/app-layout.module';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import {
  BottomSheetMenuComponent,
  ConfirmDialogComponent,
  DetailTopNavComponent,
  MailToFormViewComponent,
  MainTopNavComponent,
  SelectableCardComponent,
  SelectableListComponent,
  SimpleTopNavComponent
} from './components';
import { AddToHomeScreenDirective, HttpCommandButtonDirective, ImageErrorReloaderDirective, LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { AppFileUrlPipe, ArrayFromNumberPipe, ArraySlicePipe, CheckRolesInButtonsPipe, IsTodayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    MailToFormViewComponent,
    SelectableCardComponent,
    SimpleTopNavComponent,
    MainTopNavComponent,
    DetailTopNavComponent,
    SelectableListComponent,
    BottomSheetMenuComponent,
    TransformButtonPipe,
    ArraySlicePipe,
    TranslatePipe,
    SortByDatePipe,
    IsTodayPipe,
    CheckRolesInButtonsPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,

    AddToHomeScreenDirective,      
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    AppLayoutModule,
    GooglePlaceModule
  ],
  exports: [
    FormsModule,    
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    GooglePlaceModule,

    ConfirmDialogComponent,
    SimpleTopNavComponent,
    MainTopNavComponent,
    DetailTopNavComponent,
    MailToFormViewComponent,
    SelectableCardComponent,
    BottomSheetMenuComponent,
    SelectableListComponent,

    TransformButtonPipe,
    ArraySlicePipe,
    TranslatePipe,
    SortByDatePipe,
    IsTodayPipe,
    CheckRolesInButtonsPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,

    AddToHomeScreenDirective,      
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  

  ]
})
export class SharedModule { }
