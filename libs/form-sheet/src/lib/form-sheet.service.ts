import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DynamicForm, DynamicFormComponent } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { Observable, of } from 'rxjs';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';
import { FormSheetState, FormSheetViewConfig, FormSheetWrapperConfig } from './interfaces';

/** Responsible for opening the provided form in a bottom sheet */
@Injectable({ providedIn: "any" })
export class FormService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  /** Opens the specified form as a form sheet
   * @param config
   * @returns A reference to the bottom sheet with the form.
   */
  // open<TForm extends object, TInputState extends object | null = null, TFormConfig = DynamicForm<TForm, TInputState>, TResult = Immutable<TForm>>(
  //     config: Immutable<FormServiceConfig<TForm, TInputState, TFormConfig, TResult>>,
  //     initialValue?: Maybe<Immutable<DeepPartial<TForm>>>
  //   ): MatBottomSheetRef<FormSheetWrapperComponent, TResult> {    
  //   return this.matBottomSheet.open(FormSheetWrapperComponent, { 
  //     panelClass: config.fullScreen === false ? ["form-sheet-wrapper"] : ["form-sheet-wrapper", "form-sheet-wrapper-fullscreen"],
  //     data: <Immutable<FormSheetWrapperConfig<TFormConfig, TForm, TInputState, TResult>>> {
  //       formConfig: config.formConfig, 
  //       initialValue,
  //       navConfig: config.navConfig, 
  //       submitCallback: config.submitCallback,
  //       formComponent: config.customFormComponent || DynamicFormComponent,
  //       formState$: config.formState instanceof Observable ? config.formState : of(config.formState)
  //     } 
  //   });

  // }

  open<TForm extends object, TInputState extends object | null, TFormConfig = DynamicForm<TForm, TInputState>, TResult = Immutable<TForm>>(
    view: Immutable<FormSheetViewConfig<TForm, TInputState, TFormConfig, TResult>>, 
    state: Immutable<FormSheetState<TForm, TInputState>>,
    submitCallback?: (val: TResult) => void
  ): MatBottomSheetRef<FormSheetWrapperComponent, TResult> {    

    return this.matBottomSheet.open(FormSheetWrapperComponent, { 
      panelClass: view.fullScreen === false ? ["form-sheet-wrapper"] : ["form-sheet-wrapper", "form-sheet-wrapper-fullscreen"],
      data: <Immutable<FormSheetWrapperConfig<TFormConfig, TForm, TInputState, TResult>>> {  
        submitCallback,
        formConfig: view.formConfig,
        navConfig: view.navConfig, 
        formComponent: view.customFormComponent || DynamicFormComponent,    
        initialValue: state.initialValue,
        formState$: state.formState instanceof Observable ? state.formState : of(state.formState)
      } 
    });

  }
}
    