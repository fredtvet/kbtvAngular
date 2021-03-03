import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorMessages } from '@core/configurations/validation-error-messages.const';
import { CdkSelectableModule } from 'cdk-selectable';
import { ConfirmDialogModule } from 'confirm-dialog';
import { VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { FormSheetModule } from 'form-sheet';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import { BottomSheetMenuComponent } from './bottom-sheet-menu/bottom-sheet-menu.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { BottomActionBarComponent } from './components/bottom-action-bar/bottom-action-bar.component';
import { ChipsBarComponent } from './components/chips-bar.component';
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
import { FetchingModelContentComponent } from './components/fetching-model-content/fetching-model-content.component';
import { MainSkeletonComponent } from './components/main-skeleton/main-skeleton.component';
import { ScrollNavElevationTogglerDirective } from './components/main-skeleton/scroll-nav-elevation-toggler.directive';
import { MainTopNavBarComponent } from './components/main-top-nav-bar/main-top-nav-bar.component';
import { NoContentComponent } from './components/no-content.component';
import { LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { AppFileUrlPipe, ArrayFromNumberPipe, FuncPipe, IsTodayPipe, MergeObjPipe, ObjectToArrayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';

@NgModule({
  declarations: [
    BottomSheetMenuComponent,
    MainSkeletonComponent,
    MainTopNavBarComponent,
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
    AppButtonComponent,
    NoContentComponent,
    BottomActionBarComponent,
    FetchingModelContentComponent,
    
    TransformButtonPipe,
    TranslatePipe,
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
    GooglePlaceModule,
    CdkSelectableModule, 
    FlexLayoutModule,
    ConfirmDialogModule,
    FormSheetModule
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    GooglePlaceModule,   
    FlexLayoutModule,

    CdkSelectableModule,
    BottomSheetMenuComponent,
    MainSkeletonComponent,    
    MainTopNavBarComponent,
    ChipsBarComponent,
    AppButtonComponent,
    NoContentComponent,
    BottomActionBarComponent,
    FetchingModelContentComponent,
    TransformButtonPipe,
    TranslatePipe,
    SortByDatePipe,
    IsTodayPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,
    MergeObjPipe,

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
