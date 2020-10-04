import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { Model } from 'src/app/core/models';
import { Prop } from 'src/app/shared-app/prop.type';
import { ApiService } from '../../api.service';
import { ModelState } from '../../model/interfaces';
import { ModelStateConfig } from '../../model/model-state.config';
import { ObservableStoreBase } from '../observable-store-base';
import { ObservableStore } from './observable-store';

export abstract class BaseModelStore<TState> extends ObservableStore<TState>  {

    constructor(
        base: ObservableStoreBase,
        protected apiService: ApiService) {  
        super(base);
    }

    modelProperty$ =   <T extends Model[]>(property: Prop<ModelState>): Observable<T> => { 
        const modelCfg = ModelStateConfig.get(property);

        if(modelCfg?.notPersisted) 
            return this._propertyWithFetch$(property as Prop<TState>, this.apiService.get(modelCfg.apiUrl));

        return super.stateProperty$(property as any);
    }
 
    private _propertyWithFetch$<T>(property: Prop<TState>, fetch$: Observable<T>): Observable<T>{
        const fetchData$ = fetch$.pipe(take(1),filter(x => x != null), tap(arr => {
                let state = {} as Partial<TState>;
                state[property] = arr as any;
                this.setState(state)
            }));
 
        return super.stateProperty$<T>(property).pipe(
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
