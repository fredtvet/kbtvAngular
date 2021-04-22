import { Inject, Injectable, Optional } from '@angular/core';
import { Immutable, UnknownState } from 'global-types';
import { ActionDispatcher } from './action-dispatcher';
import { STORE_DEFAULT_STATE, STORE_SETTINGS } from './constants/injection-tokens.const';
import { StoreSettings } from './interfaces';
import { StateBase } from './state-base';
import { StoreBase } from './store-base';
import { StoreProvidersService } from './store-providers.service';

/** Responsible for providing read and write access to global state. */
@Injectable()
export class Store<TState> extends StoreBase<TState> {

    defaultState: Immutable<UnknownState>;

    constructor(
        actionDispatcher: ActionDispatcher,     
        storeProviders: StoreProvidersService,
        @Optional() @Inject(STORE_DEFAULT_STATE) defaultState: UnknownState,
        @Optional() @Inject(STORE_SETTINGS) storeSettings: StoreSettings,
    ) { 
        super(new StateBase(defaultState), actionDispatcher, storeProviders, storeSettings);
        this.defaultState = defaultState; 
    }
    
    /** Default global state */
    addDefaultState(defaultState: Object): void {
        this.defaultState = {...this.defaultState, ...defaultState}; //accumulate default state from feature modules to keep track
        const currState = <UnknownState> this.base.getStoreState();
        const newState: UnknownState = {};
        for(const prop in defaultState)
            if(currState[prop] === undefined) 
                newState[prop] = (<UnknownState>defaultState)[prop];

        this.base.setStoreState(newState)
    }

}

