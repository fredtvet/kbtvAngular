import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObservableStoreBase } from 'src/app/core/services/state/observable-store-base';
import { Prop } from 'src/app/shared-app/prop.type';
import { Model } from '../../../models/base-entity.interface';
import { ApiService } from '../../api.service';
import { BaseModelStore } from '../../state/abstracts/base-model.store';
import { ModelState } from '../interfaces/model-state.interface';
import { ModelWithRelations } from '../interfaces/model-with-relations.interface';
import { ModelStateConfig } from '../model-state.config';
import { GetWithRelationsConfig } from '../state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from '../state-helpers/get-with-relations.helper';

@Injectable({ providedIn: 'root' })
export class ModelFormStore extends BaseModelStore<ModelState> {

  constructor(
    apiService: ApiService,
    base: ObservableStoreBase,
    private getWithRelationsHelper?: GetWithRelationsHelper,
  ) {
    super(base, apiService);
  }

  getWithForeigns$ = (modelProp: Prop<ModelState>, id: string): Observable<ModelWithRelations<Model>> => {
    if(!this.getWithRelationsHelper) console.error('Get with relation helper required for forms with update');
    const modelCfg = ModelStateConfig.get(modelProp);
    let stateSlice = [modelProp]; 
    if(modelCfg.foreigns) stateSlice = stateSlice.concat(modelCfg.foreigns);
    return this.stateSlice$(stateSlice).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig(modelProp, null, {includeAll: true});
      const entity = this.getWithRelationsHelper.get<Model>(state, relationCfg, id);
      return {entity, foreigns: state};
    }));
  }

  getForeigns$ = (modelProp: Prop<ModelState>): Observable<Partial<ModelState>> => {
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.stateSlice$([...modelCfg.foreigns || [], modelProp]);
  }
    
}