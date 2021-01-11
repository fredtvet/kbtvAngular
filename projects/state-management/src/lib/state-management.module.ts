import { NgModule } from '@angular/core';
import { ActionDispatcher } from './action-dispatcher';
import { EffectsSubscriber } from './effects.subscriber';
import { Store } from './store';

/**
 * Responsible for providing core state services
 * Required in root and any feature modules 
 * that configures state providers like {@link Reducer} or {@link Effect}.
 */
@NgModule({
    providers: [   
        ActionDispatcher,
        Store,
        EffectsSubscriber
    ]
})
export class StateManagementModule { 
    constructor(effectsSubscriber: EffectsSubscriber){}
}
  