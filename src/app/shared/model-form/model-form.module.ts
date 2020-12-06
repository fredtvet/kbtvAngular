import { NgModule } from '@angular/core';
import { ModelFormService } from '.';
import { ModelFormFacade } from './model-form.facade';

@NgModule({
    providers: [
        ModelFormService,
        ModelFormFacade,
    ]
  })
  export class ModelFormModule {  }
  