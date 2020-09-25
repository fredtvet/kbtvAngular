import { Observable, of } from 'rxjs';
import { filter, map, skip, take, tap } from 'rxjs/operators';
import { Prop } from '../../model/state.types';
import { ObservableStore } from '../../observable-store/observable-store';
import { ObservableStoreBase } from '../../observable-store/observable-store-base';
import { ApiService } from '../../services/api.service';
import { ArrayHelperService } from '../../services/utility/array-helper.service';

export abstract class BaseExtendedStore<TState> extends ObservableStore<TState>  {

    constructor(
        base: ObservableStoreBase,
        protected arrayHelperService: ArrayHelperService,
        protected apiService: ApiService) {  
        super(base, {logStateChanges: true});
    }
    
    property$ = <T>(property: Prop<TState>, fetch$?: Observable<T>): Observable<T> => { 
       if(fetch$) return this._propertyWithFetch$(property, fetch$);
       return super.stateProperty$(property);
    }

    private _propertyWithFetch$<T>(property: Prop<TState>, fetch$: Observable<T>): Observable<T>{
        const fetchData$ = fetch$.pipe(take(1),filter(x => x != null), tap(arr => {
                let state = {} as Partial<TState>;
                state[property] = arr as any;
                this.setState(state)
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