import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorMessages } from '@core/configurations/validation-error-messages.const';
import { CdkSelectableModule } from 'cdk-selectable';
import { ConfirmDialogModule } from 'confirm-dialog';
import { VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { FormSheetModule } from 'form-sheet';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import { BottomSheetMenuComponent } from './bottom-sheet-menu/bottom-sheet-menu.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { BottomActionBarComponent } from './components/bottom-action-bar/bottom-action-bar.component';
import { BottomBarIconButtonComponent } from './components/bottom-action-bar/bottom-bar-icon-button.component';
import { ChipsBarComponent } from './components/chips-bar.component';
import { MainSkeletonComponent } from './components/main-skeleton/main-skeleton.component';
import { ScrollNavElevationTogglerDirective } from './components/main-skeleton/scroll-nav-elevation-toggler.directive';
import { MainTopNavBarComponent } from './components/main-top-nav-bar/main-top-nav-bar.component';
import { LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { AppFileUrlPipe, ArrayFromNumberPipe, FuncPipe, IsTodayPipe, MergeObjPipe, ObjectToArrayPipe, SortByDatePipe, TransformButtonPipe } from './pipes';

@NgModule({
  declarations: [
    BottomSheetMenuComponent,
    MainSkeletonComponent,
    MainTopNavBarComponent,
    ChipsBarComponent,

    AppButtonComponent,
    BottomActionBarComponent,
    BottomBarIconButtonComponent,
    
    TransformButtonPipe,
    SortByDatePipe,
    IsTodayPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,
    FuncPipe,
    MergeObjPipe,
    ScrollNavElevationTogglerDirective,   
    ActiveStringFilterDirective,
    LoadingOverlayDirective,  
  ],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,    
    CdkSelectableModule, 
    FlexLayoutModule,
    ConfirmDialogModule,
    FormSheetModule
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule, 
    FlexLayoutModule,
    CdkSelectableModule,
    BottomSheetMenuComponent,
    MainSkeletonComponent,    
    MainTopNavBarComponent,
    ChipsBarComponent,
    AppButtonComponent,
    BottomActionBarComponent,
    TransformButtonPipe,
    SortByDatePipe,
    IsTodayPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,
    MergeObjPipe,
    FuncPipe,
    ScrollNavElevationTogglerDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
  ],
  providers:[
    { provide: VALIDATION_ERROR_MESSAGES, useValue: ValidationErrorMessages},
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
