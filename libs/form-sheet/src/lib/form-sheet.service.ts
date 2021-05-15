import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DynamicForm, DynamicFormComponent } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { Observable, of } from 'rxjs';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';
import { FormServiceConfig, FormSheetWrapperConfig } from './interfaces';

/** Responsible for opening the provided form in a bottom sheet */
@Injectable({ providedIn: "any" })
export class FormService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  /** Opens the specified form as a form sheet
   * @param config
   * @returns A reference to the bottom sheet with the form.
   */
  open<TForm extends object, TInputState extends object | null = null>(
      config: Immutable<FormServiceConfig<TForm, TInputState>>
    ): MatBottomSheetRef<FormSheetWrapperComponent, TForm> {    

    return this.matBottomSheet.open(FormSheetWrapperComponent, { 
      panelClass: "form-sheet-wrapper",
      data: < Immutable<FormSheetWrapperConfig<object, TInputState, TForm>>> {
        formConfig: config.formConfig, 
        navConfig: config.navConfig, 
        submitCallback: config.submitCallback,
        formComponent: DynamicFormComponent,
        formState$: config.formState instanceof Observable ? config.formState : of(config.formState)
      } 
    });

  }

}
