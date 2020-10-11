import { Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { BaseFormService } from 'src/app/core/services/form/interfaces/base-form-service.interface';
import { Model } from "src/app/core/models";
import { ModelFormSheetWrapperComponent } from './components/model-form-sheet-wrapper.component';
import { FormSheetWrapperResult } from '../../form/interfaces';
import { ModelFormConfig } from './interfaces/model-form-config.interface';
import { ModelFormWrapperConfig } from './interfaces/model-form-wrapper-config.interface';
import { ModelFormViewConfig } from './interfaces/model-form-view-config.interface';

@Injectable({ providedIn: "any" })
export class ModelFormService implements BaseFormService{

  constructor(private matBottomSheet: MatBottomSheet) {}

  open<TFormConfig extends ModelFormConfig<any, Model, ModelFormViewConfig<Model, any>>>
  (config: ModelFormWrapperConfig<TFormConfig>): MatBottomSheetRef<ModelFormSheetWrapperComponent, FormSheetWrapperResult> {

    return this.matBottomSheet.open(ModelFormSheetWrapperComponent, { data: config });

  }
}

