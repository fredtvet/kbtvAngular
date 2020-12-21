import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@confirm-dialog/confirm-dialog.module';
import { DynamicFormsModule } from '@dynamic-forms/dynamic-forms.module';
import { FormSheetModule } from '@form-sheet/form-sheet.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import {
  BottomSheetMenuComponent,

  SelectableCardComponent,
  SelectableListComponent
} from './components';
import { ChipsBarComponent } from './components/chips-bar.component';
import { DetailTopNavBarComponent } from './components/detail-top-nav-bar/detail-top-nav-bar.component';
import { AutoCompleteQuestionComponent } from './components/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { CheckboxQuestionComponent } from './components/dynamic-form-questions/checkbox-question.component';
import { FileQuestionComponent } from './components/dynamic-form-questions/file-question.component';
import { GooglePlacesAutoCompleteQuestionComponent } from './components/dynamic-form-questions/google-places-autocomplete-question.component';
import { InputQuestionComponent } from './components/dynamic-form-questions/input-question.component';
import { IonDateQuestionComponent } from './components/dynamic-form-questions/ion-date-time-question.component';
import { RadioGroupQuestionComponent } from './components/dynamic-form-questions/radio-group-question.component';
import { SelectQuestionComponent } from './components/dynamic-form-questions/select-question.component';
import { SliderQuestionComponent } from './components/dynamic-form-questions/slider-question.component';
import { TextAreaQuestionComponent } from './components/dynamic-form-questions/text-area-question.component';
import { MainSkeletonComponent } from './components/main-skeleton/main-skeleton.component';
import { MainTopNavBarComponent } from './components/main-top-nav-bar/main-top-nav-bar.component';
import { AddToHomeScreenDirective, HttpCommandButtonDirective, ImageErrorReloaderDirective, LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { AppFileUrlPipe, ArrayFromNumberPipe, ArraySlicePipe, FuncPipe, IsTodayPipe, ObjectToArrayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';

@NgModule({
  declarations: [
    SelectableCardComponent,
    SelectableListComponent,
    BottomSheetMenuComponent,
    MainSkeletonComponent,
    MainTopNavBarComponent,
    DetailTopNavBarComponent,
    ChipsBarComponent,

    InputQuestionComponent,
    SelectQuestionComponent,
    AutoCompleteQuestionComponent,
    CheckboxQuestionComponent,
    TextAreaQuestionComponent,
    GooglePlacesAutoCompleteQuestionComponent,
    FileQuestionComponent,
    IonDateQuestionComponent,
    RadioGroupQuestionComponent,
    SliderQuestionComponent,
    
    TransformButtonPipe,
    ArraySlicePipe,
    TranslatePipe,
    SortByDatePipe,
    IsTodayPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,
    FuncPipe,
    
    AddToHomeScreenDirective,      
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  
  ],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    GooglePlaceModule,

    DynamicFormsModule,
    ConfirmDialogModule,
    FormSheetModule
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    GooglePlaceModule,    

    SelectableCardComponent,
    BottomSheetMenuComponent,
    SelectableListComponent,
    MainSkeletonComponent,    
    MainTopNavBarComponent,
    DetailTopNavBarComponent,
    ChipsBarComponent,
    
    TransformButtonPipe,
    ArraySlicePipe,
    TranslatePipe,
    SortByDatePipe,
    IsTodayPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,

    AddToHomeScreenDirective,      
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
