import { Injectable } from '@angular/core';
import { OptionsFormState } from '@form-sheet/interfaces';
import { Immutable, Maybe, UnknownState } from 'global-types';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { RelationInclude, UnknownModelState } from '@model/interfaces';
import { ModelStateConfig } from '@model/model-state.config';
import { FetchModelsAction } from '@model/state/fetch-model/fetch-models.http.effect';
import { StateAction } from '@state/state.action';
import { Store } from '@state/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModelFormFacade {

  constructor(private store: Store<UnknownModelState>) {}

  loadModels(modelProp: string): void{
    const modelCfg = ModelStateConfig.get(modelProp);
    this.store.dispatch(<FetchModelsAction<UnknownState>>{
      type: FetchModelsAction, 
      props: [modelProp, ...(modelCfg.foreigns || [])]
    })
  }

  getFormState$(modelProp: string): Observable<Immutable<OptionsFormState<UnknownModelState>>>{
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.store.select$<UnknownModelState>([modelProp, ...(modelCfg.foreigns || [])]).pipe(
      map(state => { return {options: state || {}} })
    )
  }

  getModelWithForeigns(id: string, modelProp: string, state: Immutable<UnknownModelState>): Maybe<Immutable<{}>> {
    const cfg: RelationInclude<UnknownModelState> = {prop: modelProp, foreigns: "all"}; 
    return _getWithRelations<UnknownState, UnknownModelState>(state, cfg, id);
  }

  save(action: StateAction): void {
    this.store.dispatch(action);
  }
    
}