import { Injectable, Component, InjectionToken } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ModelFormConfig, ModelFormWrapperConfig, ModelFormViewConfig } from "src/app/core/model/form";
import { Model } from "src/app/core/models";
import { ModelFormSheetWrapperComponent } from "./model-form-sheet-wrapper.component";
import { BaseFormService } from 'src/app/core/form/base-form-service.interface';
import { FormSheetWrapperResult } from 'src/app/core/form/form-sheet-wrapper-result.interface';

@Injectable({ providedIn: "any" })
export class ModelFormService implements BaseFormService{

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<
    TFormState,
    TModel extends Model, 
    TWrapperConfig extends ModelFormWrapperConfig<ModelFormConfig<TFormState, TModel, ModelFormViewConfig<TModel, TFormState>>>
  >
  (config: TWrapperConfig): MatBottomSheetRef<ModelFormSheetWrapperComponent, FormSheetWrapperResult> {

    return this.matBottomSheet.open(ModelFormSheetWrapperComponent, { data: config });

  }
}

