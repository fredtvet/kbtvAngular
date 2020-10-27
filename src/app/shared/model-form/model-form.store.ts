import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { Prop } from 'src/app/shared-app/prop.type';
import { Model } from '../../core/models';
import { ObservableStore } from '../../core/services/state/abstracts/observable-store';
import { ModelState } from '../../core/services/model/interfaces/model-state.interface';
import { ModelStateConfig } from '../../core/services/model/model-state.config';
import { GetWithRelationsConfig } from '../../core/services/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from '../../core/services/model/state-helpers/get-with-relations.helper';
import { SaveModelFormState } from './interfaces/model-form-to-state-command-adapter.interface';

@Injectable({ providedIn: 'root' })
export class ModelFormStore extends ObservableStore<ModelState>  {

  constructor(
    base: ObservableStoreBase,
    private getWithRelationsHelper: GetWithRelationsHelper,
  ) {
    super(base);
  }

  getFormState$(modelProp: Prop<ModelState>): Observable<SaveModelFormState<Partial<ModelState>>>{
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.stateSlice$([...(modelCfg.foreigns || []), modelProp], false).pipe(
      map(state => { return {options: state} })
    )
  }

  getModelWithForeigns(id: string, modelProp: Prop<ModelState>, fkState: Partial<ModelState>): Model {
    const state = {...fkState};
    state[modelProp] = this.getStateProperty(modelProp, false)
    const relationCfg = new GetWithRelationsConfig(modelProp, null, 'all');
    return this.getWithRelationsHelper.get<Model>(state, relationCfg, id);
  }
    
}