import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AddToHomeScreenDirective, HttpCommandButtonDirective, ImageErrorReloaderDirective, LoadingOverlayDirective  } from './directives';
import { AppFileUrlPipe, ArrayFromNumberPipe, ArraySlicePipe, CheckRolesInButtonsPipe, IsTodayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { AppLayoutModule } from '../layout/app-layout.module';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    MailToFormViewComponent,
    SelectableCardComponent,
    SimpleTopNavComponent,
    MainTopNavComponent,
    DetailTopNavComponent,
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
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    AppLayoutModule,
  ],
  exports: [
    FormsModule,    
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,

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
