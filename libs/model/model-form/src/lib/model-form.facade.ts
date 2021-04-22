import { Injectable } from '@angular/core';
import { OptionsFormState } from 'form-sheet';
import { Immutable, Maybe, UnknownState } from 'global-types';
import { RelationInclude, UnknownModelState, _getModelConfig, _getWithRelations } from 'model/core';
import { FetchModelsAction } from 'model/state-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateAction, Store } from 'state-management';

@Injectable()
export class ModelFormFacade {

  constructor(private store: Store<UnknownModelState>) {}

  loadModels(modelProp: string): void{
    const modelCfg = _getModelConfig(modelProp);
    this.store.dispatch(<FetchModelsAction<UnknownState>>{
      type: FetchModelsAction, 
      props: [modelProp, ...(modelCfg.foreigns || [])]
    })
  }

  getFormState$(modelProp: string): Observable<Immutable<OptionsFormState<UnknownModelState>>>{
    const modelCfg = _getModelConfig(modelProp);
    return this.store.select$([modelProp, ...(modelCfg.foreigns || [])]).pipe(
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