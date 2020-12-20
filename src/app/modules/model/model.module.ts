import { NgModule } from '@angular/core';
import { ModelStateConfig } from './model-state.config';

@NgModule({})
export class ModelModule { 
    constructor(
        rootConfigSetter: ModelStateConfig,
    ){}
}
  