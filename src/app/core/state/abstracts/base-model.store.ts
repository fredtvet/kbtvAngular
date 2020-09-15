import { Observable } from 'rxjs';
import { ApiService, ArrayHelperService } from 'src/app/core/services';
import { ModelStateConfig } from '../../model/model-state.config';
import { Model } from '../../models';
import { BaseCommandStore } from './base-command.store';
import { StateProp } from '../../model/state.types';

export abstract class BaseModelStore<TState> extends BaseCommandStore<TState>  {

    constructor(
        protected arrayHelperService: ArrayHelperService,
        protected apiService: ApiService) {  
        super(arrayHelperService, apiService);
    }

    modelProperty$ =   <T extends Model[]>(property: StateProp<TState>): Observable<T> => { 
        const modelCfg = ModelStateConfig.get(property);
        if(modelCfg.notPersisted) return this.property$(property, this.apiService.get(modelCfg.apiUrl));
        return this.property$(property);
    }
}
