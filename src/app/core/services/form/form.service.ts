import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable, of } from 'rxjs';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/components/dynamic-form.component';
import { DynamicForm } from 'src/app/shared/dynamic-form/interfaces';
import { FormSheetWrapperComponent } from '../../../shared/components/form-sheet-wrapper.component';
import { FormSheetWrapperConfig } from './interfaces/form-sheet-wrapper-config.interface';

export interface FormServiceConfig<TForm, TFormState>{
  formConfig: DynamicForm<TForm, TFormState>, 
  navConfig: MainTopNavConfig,
  formState?: TFormState | Observable<TFormState>,
  submitCallback?: (val: TForm) => void
}

@Injectable({ providedIn: "any" })
export class FormService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<TForm, TFormState>(config: FormServiceConfig<TForm, TFormState>)
  : MatBottomSheetRef<FormSheetWrapperComponent, TForm> {      
    return this.matBottomSheet.open(FormSheetWrapperComponent, { 
      data: <FormSheetWrapperConfig<DynamicForm<TForm, TFormState>, any, TForm>>{
        formConfig: config.formConfig, 
        navConfig: config.navConfig, 
        submitCallback: config.submitCallback,
        formComponent: DynamicFormComponent,
        formState$: config.formState instanceof Observable ? config.formState : of(config.formState)
      } 
    });
  }

}
