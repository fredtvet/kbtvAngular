import { InjectionToken } from '@angular/core';
import { Reducer, StateAction, Effect, MetaReducer } from '../interfaces';

export const STORE_REDUCERS = new InjectionToken<Reducer<any, StateAction>[]>('StoreReducers');
export const STORE_META_REDUCERS = new InjectionToken<MetaReducer<any, StateAction>[]>("MetaReducers")
export const STORE_EFFECTS = new InjectionToken<Effect<StateAction>[]>('StoreEffects');
export const STORE_DEFAULT_STATE = new InjectionToken<Object>('DefaultStoreState');