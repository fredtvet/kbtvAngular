import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetWithRelationsConfig } from 'src/app/model/helpers/get-with-relations.config';
import { _getWithRelations } from 'src/app/model/helpers/get-with-relations.helper';
import { ModelState } from 'src/app/model/interfaces';
import { ModelStateConfig } from 'src/app/model/model-state.config';
import { Prop } from 'src/app/shared-app/prop.type';
import { StateAction } from 'src/app/state/interfaces';
import { Store } from 'src/app/state/store';
import { Model } from '../../core/models';
import { SaveModelFormState } from './interfaces/model-form-to-state-command-adapter.interface';

@Injectable()
export class ModelFormFacade {

  constructor(private store: Store<ModelState>) {}

  getFormState$(modelProp: Prop<ModelState>): Observable<SaveModelFormState<Partial<ModelState>>>{
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.store.select$([...(modelCfg.foreigns || []), modelProp], false).pipe(
      map(state => { return {options: state} })
    )
  }

  getModelWithForeigns(id: string, modelProp: Prop<ModelState>, fkState: Partial<ModelState>): Model {
    const state = {...fkState};
    state[modelProp] = this.store.selectProperty(modelProp, false)
    const relationCfg = new GetWithRelationsConfig(modelProp, null, 'all');
    return _getWithRelations<Model>(state, relationCfg, id);
  }

  save(action: StateAction): void {
    this.store.dispatch(action);
  }
    
}