import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Injectable } from '@angular/core';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';
import { BaseFormService } from './interfaces/base-form-service.interface';
import { FormComponent } from './interfaces/form-component.interface';
import { FormSheetWrapperConfig } from './interfaces/form-sheet-wrapper-config.interface';
import { FormSheetWrapperResult } from './interfaces/form-sheet-wrapper-result.interface';

@Injectable({ providedIn: "any" })
export class FormService implements BaseFormService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<TWrapperConfig extends FormSheetWrapperConfig<any, FormComponent>>(config: TWrapperConfig)
    : MatBottomSheetRef<FormSheetWrapperComponent, FormSheetWrapperResult> {

    return this.matBottomSheet.open(FormSheetWrapperComponent, { data: config });
    
  }
}
