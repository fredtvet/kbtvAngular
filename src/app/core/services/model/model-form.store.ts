import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { Prop } from 'src/app/shared-app/prop.type';
import { SaveModelFormState } from 'src/app/shared/model-form/interfaces';
import { Model } from '../../models';
import { ObservableStore } from '../state/abstracts/observable-store';
import { ModelState } from './interfaces/model-state.interface';
import { ModelStateConfig } from './model-state.config';
import { GetWithRelationsConfig } from './state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from './state-helpers/get-with-relations.helper';

@Injectable({ providedIn: 'root' })
export class ModelFormStore extends ObservableStore<ModelState>  {

  constructor(
    base: ObservableStoreBase,
    private getWithRelationsHelper: GetWithRelationsHelper,
  ) {
    super(base);
  }

  getFormState$(modelProp: Prop<ModelState>): Observable<SaveModelFormState>{
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.stateSlice$([...(modelCfg.foreigns || []), modelProp], false).pipe(
      map(state => { return {foreigns: state} })
    )
  }

  getModelWithForeigns(id: string, modelProp: Prop<ModelState>, fkState: Partial<ModelState>): Model {
    const state = {...fkState};
    state[modelProp] = this.getStateProperty(modelProp, false)
    const relationCfg = new GetWithRelationsConfig(modelProp, null, 'all');
    return this.getWithRelationsHelper.get<Model>(state, relationCfg, id);
  }
    
}