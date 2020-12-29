import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'confirm-dialog';
import { DynamicFormsModule } from 'dynamic-forms';
import { FormSheetModule } from 'form-sheet';
import { StateAction, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { FetchModelsHttpEffect, SetFetchedModelReducer } from 'state-model';
import { DEFAULT_SAVE_CONVERTER } from './injection-tokens.const';
import { FormToSaveModelConverter } from './interfaces';
import { ModelFormComponent } from './model-form.component';
import { ModelFormFacade } from './model-form.facade';
import { ModelFormService } from './model-form.service';

@NgModule({
    declarations: [ ModelFormComponent ],
    imports: [
        CommonModule,
        DynamicFormsModule,
        FormSheetModule,
        ConfirmDialogModule,
    ],
    providers: [
        ModelFormService,
        ModelFormFacade,
        {provide: STORE_EFFECTS, useClass: FetchModelsHttpEffect, multi: true},
        {provide: STORE_REDUCERS, useValue: SetFetchedModelReducer, multi: true},
    ],
})
export class ModelFormModule { 
    static forFeature<T, D>(defaultSaveConverter: FormToSaveModelConverter<T, D, StateAction>): ModuleWithProviders<ModelFormModule> {
        return {
            ngModule: ModelFormModule,
            providers: [
                {provide: DEFAULT_SAVE_CONVERTER, useValue: defaultSaveConverter}
            ]
        }
    }
}
  