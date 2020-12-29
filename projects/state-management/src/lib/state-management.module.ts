import { NgModule } from '@angular/core';
import { ActionDispatcher } from './action-dispatcher';
import { EffectsSubscriber } from './effects.subscriber';
import { Store } from './store';

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
  