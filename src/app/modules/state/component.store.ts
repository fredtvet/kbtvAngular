import { Inject, Injectable, Optional, Self, SkipSelf } from '@angular/core';
import { ActionDispatcher } from './action-dispatcher';
import { STORE_DEFAULT_STATE, STORE_META_REDUCERS, STORE_REDUCERS, STORE_SETTINGS } from './constants/injection-tokens.const';
import { MetaReducer, Reducer, StoreSettings } from './interfaces';
import { QueryDispatcher } from './query-dispatcher';
import { StateBase } from './state-base';
import { StateAction } from './state.action';
import { Store } from './store';
import { StoreBase } from './store-base';

@Injectable()
export class ComponentStore<TState> extends StoreBase<TState> {

    constructor(
        @SkipSelf() @Optional() hostStore: Store<any>,
        queryDispatcher: QueryDispatcher,
        @Self() dispatcher: ActionDispatcher,
        @Self() @Optional() @Inject(STORE_REDUCERS) reducers: Reducer<any, StateAction>[],
        @Self() @Optional() @Inject(STORE_META_REDUCERS) metaReducers: MetaReducer<any, StateAction>[],
        @Self() @Optional() @Inject(STORE_DEFAULT_STATE) defaultState: Partial<TState>,
        @Optional() @Inject(STORE_SETTINGS) storeSettings: StoreSettings,
    ) { 
        super(new StateBase(defaultState), hostStore, queryDispatcher, dispatcher, reducers, metaReducers, storeSettings);    
    }

}