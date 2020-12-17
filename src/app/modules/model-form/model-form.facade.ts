import { Injectable } from '@angular/core';
import { OptionsFormState } from '@form-sheet/interfaces';
import { Immutable, Maybe, UnknownState } from '@global/interfaces';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { UnknownModelState } from '@model/interfaces';
import { ModelStateConfig } from '@model/model-state.config';
import { StateAction } from '@state/state.action';
import { Store } from '@state/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModelFormFacade {

  constructor(private store: Store<UnknownModelState>) {}

  getFormState$(modelProp: string): Observable<Immutable<OptionsFormState<UnknownModelState>>>{
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.store.select$<UnknownModelState>(modelCfg.foreigns || []).pipe(
      map(state => { return {options: state || {}} })
    )
  }

  getModelWithForeigns(id: string, modelProp: string, fkState: Immutable<UnknownModelState>): Maybe<Immutable<{}>> {
    const state = {...fkState};
    state[modelProp] = this.store.selectProperty<UnknownState[]>(modelProp) || []
    const relationCfg = new GetWithRelationsConfig(modelProp, null, 'all');
    return _getWithRelations<UnknownState, UnknownModelState>(state, relationCfg, id);
  }

  save(action: StateAction): void {
    this.store.dispatch(action);
  }
    
}