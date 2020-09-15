import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Injectable } from '@angular/core';
import { FormSheetWrapperConfig } from '../../form/form-sheet-wrapper-config.interface';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';
import { BaseFormService } from '../../form/base-form-service.interface';
import { FormSheetWrapperResult } from '../../form/form-sheet-wrapper-result.interface';
import { FormComponent } from '../../form/form-component.interface';

@Injectable({ providedIn: "any" })
export class FormService implements BaseFormService {

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<TWrapperConfig extends FormSheetWrapperConfig<any, FormComponent>>(config: TWrapperConfig): MatBottomSheetRef<FormSheetWrapperComponent, FormSheetWrapperResult> {
    return this.matBottomSheet.open(FormSheetWrapperComponent, { data: config });
  }
}
