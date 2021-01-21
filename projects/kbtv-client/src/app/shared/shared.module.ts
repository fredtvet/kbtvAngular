import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorMessages } from '@core/configurations/validation-error-messages.const';
import { CdkSelectableModule } from 'cdk-selectable';
import { ConfirmDialogModule } from 'confirm-dialog';
import { VALIDATION_ERROR_MESSAGES } from 'dynamic-forms';
import { FormSheetModule } from 'form-sheet';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { SharedAppModule } from '../shared-app/shared-app.module';
import { AngularMaterialModule } from './angular-material.module';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { BottomSheetMenuComponent } from './components/bottom-sheet-menu.component';
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
import { ScrollNavElevationTogglerDirective } from './components/main-skeleton/scroll-nav-elevation-toggler.directive';
import { MainTopNavBarComponent } from './components/main-top-nav-bar/main-top-nav-bar.component';
import { NoContentComponent } from './components/no-content.component';
import { SelectableCardComponent } from './components/selectable-card/selectable-card.component';
import { HttpCommandButtonDirective, ImageErrorReloaderDirective, LoadingOverlayDirective } from './directives';
import { ActiveStringFilterDirective } from './directives/active-filter.directive';
import { InputListenerDirective } from './directives/input-listener.directive';
import { AppFileUrlPipe, ArrayFromNumberPipe, FuncPipe, IsTodayPipe, ObjectToArrayPipe, SortByDatePipe, TransformButtonPipe, TranslatePipe } from './pipes';

@NgModule({
  declarations: [
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
    AppButtonComponent,
    SelectableCardComponent,
    NoContentComponent,

    TransformButtonPipe,
    TranslatePipe,
    SortByDatePipe,
    IsTodayPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,
    FuncPipe,

    ScrollNavElevationTogglerDirective,   
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  
    InputListenerDirective,
  ],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,    
    GooglePlaceModule,
    CdkSelectableModule, 

    ConfirmDialogModule,
    FormSheetModule
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedAppModule,
    GooglePlaceModule,   

    CdkSelectableModule,
    SelectableCardComponent,
    BottomSheetMenuComponent,
    MainSkeletonComponent,    
    MainTopNavBarComponent,
    DetailTopNavBarComponent,
    ChipsBarComponent,
    AppButtonComponent,
    NoContentComponent,
    
    TransformButtonPipe,
    TranslatePipe,
    SortByDatePipe,
    IsTodayPipe,
    ArrayFromNumberPipe,
    AppFileUrlPipe,
    ObjectToArrayPipe,

    ScrollNavElevationTogglerDirective,     
    HttpCommandButtonDirective,
    ActiveStringFilterDirective,
    LoadingOverlayDirective,    
    ImageErrorReloaderDirective,  
    InputListenerDirective
  ],
  providers:[
    { provide: VALIDATION_ERROR_MESSAGES, useValue: ValidationErrorMessages},
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {}
