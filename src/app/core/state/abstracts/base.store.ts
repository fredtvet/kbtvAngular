import { ObservableStore } from '@codewithdan/observable-store';
import { stateFunc } from '@codewithdan/observable-store/dist/observable-store';
import { merge, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';
import { ApiService, ArrayHelperService } from 'src/app/core/services';
import { StateProp } from '../../model/state.types';

export abstract class BaseStore<TState> extends ObservableStore<TState>  {

    constructor(
        protected arrayHelperService: ArrayHelperService,
        protected apiService: ApiService) {  
        super({logStateChanges: true, trackStateHistory: false});
    }
    
    property$ =   <T>(property: StateProp<TState>, fetch$?: Observable<T>): Observable<T> => { 
       if(fetch$) return this._propertyWithFetch$(property, fetch$);
       return  merge(
            of(property).pipe(map(x => this.getStateProperty<T>(x))), //Initial state
            this.propertyChanges$(property)
        ) as Observable<T>;
    }

    propertyChanges$ = <T>(property: StateProp<TState>): Observable<T> => { 
        return  this.globalStateWithPropertyChanges.pipe( //State changes
            filter((stateWithChanges) => stateWithChanges?.stateChanges[property as string] != null),
            map((stateWithChanges) => stateWithChanges?.state[property as string]),
            distinctUntilChanged()
        )
    }

    stateSlice$ = (properties: StateProp<TState>[]): Observable<Partial<TState>> => { 
        if(!properties || properties.length === 0) return of(null);
        return  merge(
            of(properties).pipe(
                map(props => props.reduce((state: Partial<TState>, prop) => {
                    state[prop] = this.getStateProperty(prop);
                    return state;
                }, {}))
            ), //Initial state
            this.stateSliceChanges$(properties)
         ) as Observable<Partial<TState>>;
    }

    stateSliceChanges$ = (properties: StateProp<TState>[]): Observable<Partial<TState>> => { 
        if(!properties || properties.length === 0) return of(null);
        return  this.globalStateWithPropertyChanges.pipe( //State changes
            filter(x => {
                for(let prop of properties){ 
                    if(x?.stateChanges && x.stateChanges[prop]) return true; 
                }
                return false;
            }),
            map((stateWithChanges) => {
                return properties.reduce((state:Partial<TState>, prop) => {
                    state[prop] = stateWithChanges.state[prop];
                    return state;
                }, {});
            }),
        )
    }

    protected getProperties = (properties: StateProp<TState>[], deepClone?: boolean): Partial<TState> => {
        const state: Partial<TState> = {};
        for(let prop of properties) { 
            state[prop] = this.getStateProperty(prop, deepClone) 
        }
        return state;
    }

    protected _setStateVoid(state: Partial<TState> | stateFunc<TState>, action?: string): void{ 
        if(typeof state === "function") this._setStateVoid(state(this.getState()))
        else this._setState(state as Partial<TState>, action, true, false) 
    }

    protected _setState(state: Partial<TState> , action?: string, dispatchState?: boolean, deepCloneState?: boolean): TState{
        state['lastAction'] = action;
        return super.setState(state, action, dispatchState, deepCloneState);
    } 

    private _propertyWithFetch$<T>(property: StateProp<TState>, fetch$: Observable<T>): Observable<T>{
        const fetchData$ = fetch$.pipe(take(1),filter(x => x != null), tap(arr => {
                let state = {} as Partial<TState>;
                state[property] = arr as any;
                this._setStateVoid(state)
            }));

        return this.property$<T>(property).pipe(
            filter(x => {
                if(!x) {
                    fetchData$.subscribe(); //subscribe and kill emission, next emission when subscribe finishes.  
                    return false
                }
                return true;
            })
        );
    }
}
