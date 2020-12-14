import { Inject, Injectable, Optional, Self, SkipSelf } from '@angular/core';
import { ActionDispatcher } from './action-dispatcher';
import { STORE_DEFAULT_STATE, STORE_META_REDUCERS, STORE_REDUCERS, STORE_SETTINGS } from './constants/injection-tokens.const';
import { MetaReducer, Reducer, StoreSettings } from './interfaces';
import { QueryDispatcher } from './query-dispatcher';
import { StateBase } from './state-base';
import { StateAction } from './state.action';
import { StoreBase } from './store-base';

const State = new StateBase();

@Injectable()
export class Store<TState> extends StoreBase<TState> {

    constructor(
        @SkipSelf() @Optional() hostStore: Store<any>,
        queryDispatcher: QueryDispatcher, 
        @Self() actionDispatcher: ActionDispatcher,     
        @Self() @Optional() @Inject(STORE_REDUCERS) reducers: Reducer<any, StateAction>[],
        @Self() @Optional() @Inject(STORE_META_REDUCERS) metaReducers: MetaReducer<any, StateAction>[],
        @Self() @Optional() @Inject(STORE_DEFAULT_STATE) defaultState: Partial<TState>,
        @Optional() @Inject(STORE_SETTINGS) storeSettings: StoreSettings,
    ) { 
        super(State, hostStore, queryDispatcher, actionDispatcher, reducers, metaReducers, storeSettings); 
        if(defaultState) Store.setDefaultState({...defaultState});
    }

    static defaultState: Object;

    static setDefaultState(defaultState: Object): void {
        Store.defaultState = {...Store.defaultState, ...defaultState}; //accumulate default state from feature modules to keep track
        const currState = State.getStoreState(null, false);
        const newState = {};
        for(const prop in defaultState)
            if(currState[prop] === undefined) 
                newState[prop] = defaultState[prop];

        State.setStoreState(newState, null, false, true)
    }
}

