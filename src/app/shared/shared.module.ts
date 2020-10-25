import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import {
  BottomSheetMenuComponent,
  ConfirmDialogComponent,
  SelectableCardComponent,
  SelectableListComponent
} from './components';
import { ChipsBarComponent } from './components/chips-bar.component';
import { DetailTopNavBarComponent } from './components/detail-top-nav-bar/detail-top-nav-bar.component';
import { FormSheetWrapperComponent } from './components/form-sheet-wrapper.component';
import { MainSkeletonComponent } from './components/main-skeleton/main-skeleton.component';
import { MainTopNavBarComponent } from './components/main-top-nav-bar/main-top-nav-bar.component';
import { AddToHomeScreenDirective, DynamicHostDirective, HttpCommandButtonDirective, ImageErrorReloaderDirective, LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { DynamicControlGroupComponent } from './dynamic-form/components/dynamic-control-group.component';
import { DynamicFormComponent } from './dynamic-form/components/dynamic-form.component';
import { FormActionsComponent } from './dynamic-form/components/form-actions.component';
import { AutoCompleteQuestionComponent } from './dynamic-form/questions/auto-complete-question/auto-complete-question.component';
import { CheckboxQuestionComponent } from './dynamic-form/questions/checkbox-question.component';
import { FileQuestionComponent } from './dynamic-form/questions/file-question.component';
import { GooglePlacesAutoCompleteQuestionComponent } from './dynamic-form/questions/google-places-autocomplete-question.component';
import { InputQuestionComponent } from './dynamic-form/questions/input-question.component';
import { IonDateQuestionComponent } from './dynamic-form/questions/ion-date-time-question.component';
import { RadioGroupQuestionComponent } from './dynamic-form/questions/radio-group-question.component';
import { SelectQuestionComponent } from './dynamic-form/questions/select-question.component';
import { SliderQuestionComponent } from './dynamic-form/questions/slider-question.component';
import { TextAreaQuestionComponent } from './dynamic-form/questions/text-area-question.component';
import { ModelFormComponent } from './model-form/components/model-form.component';
import { AppFileUrlPipe, ArrayFromNumberPipe, ArraySlicePipe, CheckRolesInButtonsPipe, FuncPipe, IsTodayPipe, ObjectToArrayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SelectableCardComponent,
    SelectableListComponent,
    BottomSheetMenuComponent,
    FormActionsComponent,
    MainSkeletonComponent,
    MainTopNavBarComponent,
    DetailTopNavBarComponent,
    ChipsBarComponent,
    FormSheetWrapperComponent,
    
    ModelFormComponent,

    DynamicFormComponent,
    DynamicControlGroupComponent,
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
    CheckRolesInButtonsPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,
    FuncPipe,
    
    AddToHomeScreenDirective,      
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  
    DynamicHostDirective
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
    DynamicFormComponent,

    ConfirmDialogComponent,
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
    CheckRolesInButtonsPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,

    AddToHomeScreenDirective,      
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  
    DynamicHostDirective

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
