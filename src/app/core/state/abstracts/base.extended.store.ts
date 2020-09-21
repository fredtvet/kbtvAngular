import { merge, Observable, of } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { StateProp } from '../../model/state.types';
import { ApiService } from '../../services/api.service';
import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { BaseStore } from './base.store';

export abstract class BaseExtendedStore<TState> extends BaseStore<TState>  {

    constructor(
        protected arrayHelperService: ArrayHelperService,
        protected apiService: ApiService) {  
        super(arrayHelperService, apiService);
    }
    
    property$ =   <T>(property: StateProp<TState>, fetch$?: Observable<T>): Observable<T> => { 
       if(fetch$) return this._propertyWithFetch$(property, fetch$);
       return super.property$(property);
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