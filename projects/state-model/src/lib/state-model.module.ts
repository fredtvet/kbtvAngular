import { NgModule } from '@angular/core';
import { ModelStateConfig } from './model-state.config';

/** Responsible for setting provided root model state config. 
 * Should be provided in root only.  */
@NgModule({})
export class StateModelModule { 
    constructor(rootConfigSetter: ModelStateConfig){}
}
  