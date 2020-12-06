import { Inject, Injectable, Optional, Self, SkipSelf } from '@angular/core';
import { ActionDispatcher } from './action-dispatcher';
import { STORE_DEFAULT_STATE, STORE_REDUCERS } from './injection-tokens';
import { Reducer } from './interfaces';
import { QueryDispatcher } from './query-dispatcher';
import { StateBase } from './state-base';
import { Store } from './store';
import { StoreBase } from './store-base';

@Injectable()
export class ComponentStore<TState> extends StoreBase<TState> {

    constructor(
        @SkipSelf() @Optional() hostStore: Store<any>,
        queryDispatcher: QueryDispatcher,
        @Self() dispatcher: ActionDispatcher,
        @Self() @Optional() @Inject(STORE_REDUCERS) reducers: Reducer<any>[],
        @Self() @Optional() @Inject(STORE_DEFAULT_STATE) defaultState: Partial<TState>,
    ) { 
        super(new StateBase(defaultState), hostStore, queryDispatcher, dispatcher, reducers);    
    }

}