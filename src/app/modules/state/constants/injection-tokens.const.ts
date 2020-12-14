import { InjectionToken } from '@angular/core';
import { Reducer, Effect, MetaReducer, StoreSettings } from '../interfaces';
import { StateAction } from '../state.action';

export const STORE_REDUCERS = new InjectionToken<Reducer<any, StateAction>[]>('StoreReducers');
export const STORE_META_REDUCERS = new InjectionToken<MetaReducer<any, StateAction>[]>("MetaReducers")
export const STORE_EFFECTS = new InjectionToken<Effect<StateAction>[]>('StoreEffects');
export const STORE_DEFAULT_STATE = new InjectionToken<Object>('DefaultStoreState');
export const STORE_SETTINGS = new InjectionToken<StoreSettings>('StoreSettings');