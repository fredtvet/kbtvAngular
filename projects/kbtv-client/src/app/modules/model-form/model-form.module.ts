import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormsModule } from '@dynamic-forms/dynamic-forms.module';
import { FormSheetModule } from '@form-sheet/form-sheet.module';
import { FetchModelsProviders } from '@model/state/providers.const';
import { StateAction } from 'state-management'
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
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
  