import { Inject, Injectable, Optional, Self, SkipSelf } from '@angular/core';
import { UnknownState } from 'global-types';
import { ActionDispatcher } from './action-dispatcher';
import { STORE_DEFAULT_STATE, STORE_META_REDUCERS, STORE_REDUCERS, STORE_SETTINGS } from './constants/injection-tokens.const';
import { MetaReducer, Reducer, StoreSettings } from './interfaces';
import { StateBase } from './state-base';
import { StateAction } from './state.action';
import { StoreBase } from './store-base';

const State = new StateBase();

@Injectable()
export class Store<TState> extends StoreBase<TState> {

    constructor(
        @SkipSelf() @Optional() hostStore: Store<unknown>,
        @Self() actionDispatcher: ActionDispatcher,     
        @Self() @Optional() @Inject(STORE_REDUCERS) reducers: Reducer<unknown, StateAction>[],
        @Self() @Optional() @Inject(STORE_META_REDUCERS) metaReducers: MetaReducer<unknown, StateAction>[],
        @Self() @Optional() @Inject(STORE_DEFAULT_STATE) defaultState: Partial<TState>,
        @Optional() @Inject(STORE_SETTINGS) storeSettings: StoreSettings,
    ) { 
        super(State, hostStore, actionDispatcher, reducers, metaReducers, storeSettings); 
        if(defaultState) Store.setDefaultState({...defaultState});
    }

    static defaultState: Object;

    static setDefaultState(defaultState: UnknownState): void {
        Store.defaultState = {...Store.defaultState, ...defaultState}; //accumulate default state from feature modules to keep track
        const currState = <UnknownState> State.getStoreState();
        const newState: UnknownState = {};
        for(const prop in defaultState)
            if(currState[prop] === undefined) 
                newState[prop] = defaultState[prop];

        State.setStoreState(newState)
    }
}

