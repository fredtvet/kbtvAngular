import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormsModule } from 'dynamic-forms';
import { FormSheetModule } from '@form-sheet/form-sheet.module';
import { FetchModelsProviders } from 'state-model';
import { StateAction } from 'state-management'
import { DEFAULT_SAVE_CONVERTER } from './injection-tokens.const';
import { FormToSaveModelConverter } from './interfaces';
import { ModelFormComponent } from './model-form.component';
import { ModelFormFacade } from './model-form.facade';
import { ModelFormService } from './model-form.service';
import { ConfirmDialogModule } from 'confirm-dialog';

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
        ...FetchModelsProviders
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
  