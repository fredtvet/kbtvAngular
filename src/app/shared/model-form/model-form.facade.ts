import { Injectable } from '@angular/core';
import { GetWithRelationsConfig } from '@model/get-with-relations.config';
import { _getWithRelations } from '@model/helpers/get-with-relations.helper';
import { ModelStateConfig } from '@model/model-state.config';
import { OptionsFormState } from '@shared/form';
import { StateAction } from '@state/interfaces';
import { Store } from '@state/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModelFormFacade {

  constructor(private store: Store<any>) {}

  getFormState$(modelProp: string): Observable<Readonly<OptionsFormState<any>>>{
    const modelCfg = ModelStateConfig.get<any, any>(modelProp);
    return this.store.select$(modelCfg.foreigns || [], false).pipe(
      map(state => { return {options: state} })
    )
  }

  getModelWithForeigns(id: string, modelProp: string, fkState: any): any {
    const state = {...fkState};
    state[modelProp] = this.store.selectProperty(modelProp, false)
    const relationCfg = new GetWithRelationsConfig(modelProp, null, 'all');
    return _getWithRelations<any, any>(state, relationCfg, id);
  }

  save(action: StateAction): void {
    this.store.dispatch(action);
  }
    
}