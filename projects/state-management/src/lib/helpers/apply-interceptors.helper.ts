import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { ActionInterceptor } from '../interfaces';
import { StateAction } from '../state.action';

export function _applyInterceptors(
    action: Immutable<StateAction>, 
    interceptors: ImmutableArray<ActionInterceptor>): Maybe<StateAction> {
    if(!interceptors?.length) return action;
    let result: Maybe<StateAction> = {...action};
    for(const interceptor of interceptors) if(result) result = interceptor.intercept(result)
    return result;
}