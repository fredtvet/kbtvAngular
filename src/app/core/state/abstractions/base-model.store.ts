import { ObservableStore, ObservableStoreSettings } from '@codewithdan/observable-store';
import { merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';
import { ApiService, ArrayHelperService } from 'src/app/core/services';

export abstract class BaseModelStore<TState> extends ObservableStore<TState>  {

    constructor(
        protected arrayHelperService: ArrayHelperService,
        protected apiService: ApiService,
        storeSettings: ObservableStoreSettings) {  
        super(storeSettings);
    }
    
    property$ =   <T>(property: Extract<keyof TState, string>): Observable<T> => { 
       return  merge(
            of(property).pipe(map(x => this.getProperty<T>(x, false))), //Initial state
            this.propertyChanges$(property)
        ) as Observable<T>;
    }

    propertyChanges$ = <T>(property: Extract<keyof TState, string>): Observable<T> => { 
        return  this.globalStateWithPropertyChanges.pipe( //State changes
            filter((stateWithChanges) => stateWithChanges?.stateChanges[property as string] != null),
            map((stateWithChanges) => stateWithChanges?.state[property as string]),
            distinctUntilChanged()
        )
    }

    stateSlice$ = (properties: Extract<keyof TState, string>[]): Observable<Partial<TState>> => { 
        return  merge(
            of(properties).pipe(
                map(props => props.reduce((state: Partial<TState>, prop) => {
                    state[prop] = this.getProperty(prop);
                    return state;
                }, {}))
            ), //Initial state
            this.stateSliceChanges$(properties)
         ) as Observable<Partial<TState>>;
     }

    stateSliceChanges$ = (properties: Extract<keyof TState, string>[]): Observable<Partial<TState>> => { 
        return  this.globalStateWithPropertyChanges.pipe( //State changes
            filter(({stateChanges}) => {
                for(let prop of properties){ if(stateChanges[prop]) return true; }
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

    getProperty<T>(property: Extract<keyof TState, string>, deepClone: boolean = true): T{
       return super.getStateProperty(property, deepClone);
    }
    
    protected _propertyWithFetch$<T>(property: Extract<keyof TState, string>, fetch$: Observable<T>): Observable<T>{
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

    protected _getBy$<TEntity>(property: Extract<keyof TState, string>, expression: (value: TEntity, index?: number, Array?: any[]) => boolean): Observable<TEntity[]> {
        return this.property$<TEntity[]>(property).pipe(
            map(arr => this.arrayHelperService.filter<TEntity>(arr, expression))
        );
    }

    protected _getById$<TEntity>(property: Extract<keyof TState, string>, id: any, identifier: any): Observable<TEntity>{
        return this.property$<TEntity[]>(property).pipe(
            map(entities => this.arrayHelperService.find(entities, id, identifier))
        );
    } 

    protected _updateStateProperty = <T>(property: Extract<keyof TState, string>, actionFn: (prop: T) => T, action?: string): void => {
        let state: Partial<TState> = {};
        state[property as string] = actionFn(this.getProperty<T>(property));
        this._setStateVoid(state, action)
    } 

    protected _setStateVoid(state: Partial<TState>, action?: string): void{ 
        this._setState(state, action, true, false) 
    }

    protected _setState(state: Partial<TState>, action?: string, dispatchState?: boolean, deepCloneState?: boolean): TState{
        state['lastAction'] = action;
        return super.setState(state, action, dispatchState, deepCloneState);
    }
}
