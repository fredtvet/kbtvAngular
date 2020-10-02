import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AppLayoutModule } from '../layout/app-layout.module';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import {
  BottomSheetMenuComponent,
  ConfirmDialogComponent,
  FormActionsComponent,
  MailToFormViewComponent,
  SelectableCardComponent,
  SelectableListComponent,
  SimpleTopNavComponent
} from './components';
import { ChipsBarComponent } from './components/main-top-nav/chips-bar.component';
import { DetailTopNavBarComponent } from './components/main-top-nav/detail-top-nav-bar/detail-top-nav-bar.component';
import { MainTopNavBarComponent } from './components/main-top-nav/main-top-nav-bar/main-top-nav-bar.component';
import { MainTopNavComponent } from './components/main-top-nav/main-top-nav.component';
import { AddToHomeScreenDirective, HttpCommandButtonDirective, ImageErrorReloaderDirective, LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { AppFileUrlPipe, ArrayFromNumberPipe, ArraySlicePipe, CheckRolesInButtonsPipe, IsTodayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    MailToFormViewComponent,
    SelectableCardComponent,
    SimpleTopNavComponent,
    SelectableListComponent,
    BottomSheetMenuComponent,
    FormActionsComponent,
    MainTopNavComponent,
    MainTopNavBarComponent,
    DetailTopNavBarComponent,
    ChipsBarComponent,

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
    MailToFormViewComponent,
    SelectableCardComponent,
    BottomSheetMenuComponent,
    SelectableListComponent,
    FormActionsComponent,
    MainTopNavComponent,

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
