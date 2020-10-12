import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import {
  BottomSheetMenuComponent,
  ConfirmDialogComponent,
  FormActionsComponent,
  MailToFormViewComponent,
  SelectableCardComponent,
  SelectableListComponent
} from './components';
import { ChipsBarComponent } from './components/chips-bar.component';
import { DetailTopNavBarComponent } from './components/detail-top-nav-bar/detail-top-nav-bar.component';
import { MainSkeletonComponent } from './components/main-skeleton/main-skeleton.component';
import { MainTopNavBarComponent } from './components/main-top-nav-bar/main-top-nav-bar.component';
import { AddToHomeScreenDirective, HttpCommandButtonDirective, ImageErrorReloaderDirective, LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { AppFileUrlPipe, ArrayFromNumberPipe, ArraySlicePipe, CheckRolesInButtonsPipe, IsTodayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    MailToFormViewComponent,
    SelectableCardComponent,
    SelectableListComponent,
    BottomSheetMenuComponent,
    FormActionsComponent,
    MainSkeletonComponent,
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
    GooglePlaceModule
  ],
  exports: [
    FormsModule,    
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    GooglePlaceModule,

    ConfirmDialogComponent,
    MailToFormViewComponent,
    SelectableCardComponent,
    BottomSheetMenuComponent,
    SelectableListComponent,
    FormActionsComponent,
    MainSkeletonComponent,    
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

  ]
})
export class SharedModule { }
