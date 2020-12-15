import { Injectable } from '@angular/core';
import { OptionsFormState } from '@form-sheet/interfaces';
import { Immutable } from '@immutable/interfaces';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { ModelStateConfig } from '@model/model-state.config';
import { StateAction } from '@state/state.action';
import { Store } from '@state/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModelFormFacade {

  constructor(private store: Store<{[key:string]: Object[]}>) {}

  getFormState$(modelProp: string): Observable<Immutable<OptionsFormState<Object>>>{
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.store.select$(modelCfg.foreigns || []).pipe(
      map(state => { return {options: state} })
    )
  }

  getModelWithForeigns(id: string, modelProp: string, fkState: Object): Object {
    const state = {...fkState};
    state[modelProp] = this.store.selectProperty(modelProp)
    const relationCfg = new GetWithRelationsConfig(modelProp, null, 'all');
    return _getWithRelations(state, relationCfg, id);
  }

  save(action: StateAction): void {
    this.store.dispatch(action);
  }
    
}