import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DynamicForm, DynamicFormComponent } from 'dynamic-forms';
import { Observable, of } from 'rxjs';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';
import { FormServiceConfig, FormSheetWrapperConfig } from './interfaces';

@Injectable({ providedIn: "any" })
export class FormService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<TForm, TFormState = unknown>(config: FormServiceConfig<TForm, TFormState>)
  : MatBottomSheetRef<FormSheetWrapperComponent, TForm> {      
    return this.matBottomSheet.open(FormSheetWrapperComponent, { 
      data: <FormSheetWrapperConfig<DynamicForm<TForm, TFormState>, unknown, TForm>>{
        formConfig: config.formConfig, 
        navConfig: config.navConfig, 
        submitCallback: config.submitCallback,
        formComponent: DynamicFormComponent,
        formState$: config.formState instanceof Observable ? config.formState : of(config.formState)
      } 
    });
  }

}
