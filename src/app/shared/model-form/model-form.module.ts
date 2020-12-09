import { ModuleWithProviders, NgModule } from '@angular/core';
import { DEFAULT_SAVE_ADAPTER } from './injection-tokens.const';
import { ModelFormToSaveStateCommandAdapter } from './interfaces/model-form-to-state-command-adapter.interface';
import { ModelFormFacade } from './model-form.facade';
import { ModelFormService } from './model-form.service';

@NgModule({
    providers: [
        ModelFormService,
        ModelFormFacade,
    ]
})
export class ModelFormModule { 
    static forFeature(defaultSaveAdapter: ModelFormToSaveStateCommandAdapter<any, any>): ModuleWithProviders<ModelFormModule> {
        return {
            ngModule: ModelFormModule,
            providers: [
                {provide: DEFAULT_SAVE_ADAPTER, useValue: defaultSaveAdapter}
            ]
        }
    }
}
  