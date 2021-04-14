import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'confirm-dialog';
import { DynamicFormsModule } from 'dynamic-forms';
import { FormSheetModule } from 'form-sheet';
import { StateAction } from 'state-management';
import { FetchModelProviders } from 'model-state';
import { DEFAULT_SAVE_CONVERTER } from './injection-tokens.const';
import { FormToSaveModelConverter } from './interfaces';
import { ModelFormComponent } from './model-form.component';
import { ModelFormFacade } from './model-form.facade';
import { ModelFormService } from './model-form.service';

/** Responsible for declaring components and providing core injectables. 
 *  Use forFeature function to configure a default save converter for each feature module. */
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
        ...FetchModelProviders
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
  