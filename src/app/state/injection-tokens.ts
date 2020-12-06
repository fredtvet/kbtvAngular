import { InjectionToken } from '@angular/core';
import { Reducer, StateAction } from './interfaces';
import { Effect } from './interfaces/effect.interface';

export const STORE_REDUCERS = new InjectionToken<Reducer<any>[]>('StoreReducers');
export const STORE_EFFECTS = new InjectionToken<Effect<StateAction>[]>('StoreEffects');
export const STORE_DEFAULT_STATE = new InjectionToken<Object>('DefaultStoreState');