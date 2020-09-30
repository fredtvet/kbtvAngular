import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelWithRelations } from 'src/app/core/model/interfaces';
import { ModelStateConfig } from 'src/app/core/model/model-state.config';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/model/state-helpers/get-with-relations.helper';
import { Model } from 'src/app/core/models';
import { ObservableStoreBase } from 'src/app/core/observable-store/observable-store-base';
import { ApiService } from 'src/app/core/services/api.service';
import { StateHttpCommandHandler } from 'src/app/core/services/state/state-http-command.handler';
import { BaseModelStore } from 'src/app/core/state/abstracts/base-model.store';
import { StateHttpConverter } from 'src/app/core/state/state-http-converter';
import { ModelState } from '../../model.state';
import { Prop } from '../../state.types';

export abstract class BaseModelFormStore<
    TState,
    TModel extends Model, 
> extends BaseModelStore<TState> {

  constructor(
    apiService: ApiService,
    base: ObservableStoreBase,
    private stateHttpCommandHandler: StateHttpCommandHandler,
    private saveStateHttpConverter: StateHttpConverter<any, any>,
    private getWithRelationsHelper?: GetWithRelationsHelper,
    private deleteStateHttpConverter?: StateHttpConverter<any, any>, 
  ) {
    super(base, apiService);
  }

  getWithForeigns$ = (modelProp: Prop<ModelState>, id: string): Observable<ModelWithRelations<TModel>> => {
    if(!this.getWithRelationsHelper) console.error('Get with relation helper required for forms with update');
    const modelCfg = ModelStateConfig.get(modelProp);
    let stateSlice = [modelProp]; 
    if(modelCfg.foreigns) stateSlice = stateSlice.concat(modelCfg.foreigns);
    return this.stateSlice$(stateSlice as Prop<TState>[]).pipe(map(state => {
      const relationCfg = new GetWithRelationsConfig(modelProp, null, {includeAll: true});
      const entity = this.getWithRelationsHelper.get<TModel>(state, relationCfg, id);
      return {entity, foreigns: state};
    }));
  }

  getForeigns$ = (modelProp: Prop<ModelState>): Observable<Partial<TState>> => {
    const modelCfg = ModelStateConfig.get(modelProp);
    return this.stateSlice$([...modelCfg.foreigns || [], modelProp] as Prop<TState>[]);
  }

  save = (command: any): void =>
    this.stateHttpCommandHandler.dispatch(this.saveStateHttpConverter.convert(command));
  

  delete = (command: any): void => {
    if(!this.deleteStateHttpConverter) console.error('Delete converter required for forms with delete');

    this.stateHttpCommandHandler.dispatch(this.deleteStateHttpConverter.convert(command));
  }
    
}