import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelWithRelations } from 'src/app/core/model/interfaces';
import { ModelStateConfig } from 'src/app/core/model/model-state.config';
import { GetWithRelationsConfig } from 'src/app/core/model/state-helpers/get-with-relations.config';
import { GetWithRelationsHelper } from 'src/app/core/model/state-helpers/get-with-relations.helper';
import { Model } from 'src/app/core/models';
import { ApiService, ArrayHelperService } from 'src/app/core/services';
import { StateHttpCommandHandler } from 'src/app/core/services/state/state-http-command.handler';
import { BaseModelStore } from 'src/app/core/state/abstracts/base-model.store';
import { StateHttpConverter } from 'src/app/core/state/state-http-converter';
import { StateProp } from '../../state.types';

export abstract class BaseModelFormStore<
    TState,
    TModel extends Model, 
> extends BaseModelStore<TState> {

  constructor(
    apiService: ApiService,
    arrayHelperService: ArrayHelperService,
    private stateHttpCommandHandler: StateHttpCommandHandler,
    private saveStateHttpConverter: StateHttpConverter<any, any>,
    private getWithRelationsHelper?: GetWithRelationsHelper<TState>,
    private deleteStateHttpConverter?: StateHttpConverter<any, any>, 
  ) {
    super(arrayHelperService, apiService);
  }

  getWithForeigns$ = (modelProp: StateProp<TState>, id: string): Observable<ModelWithRelations<TModel>> => {
    if(!this.getWithRelationsHelper) console.error('Get with relation helper required for forms with update');
    const modelCfg = ModelStateConfig.get<TState>(modelProp);
    let stateSlice = [modelProp];
    if(modelCfg.foreigns) stateSlice = stateSlice.concat(modelCfg.foreigns);
    return this.stateSlice$(stateSlice).pipe(map(state => {
        let entity = this.getWithRelationsHelper.get<TModel>(state as any, new GetWithRelationsConfig(modelProp, null, {includeAll: true}), id);
        let result: ModelWithRelations<TModel> = {entity, foreigns: {}};
        if(modelCfg.foreigns)
          for(var fkProp of modelCfg.foreigns) { result.foreigns[fkProp] = state[fkProp] }; //Map foreign state to response
        return result;
    }));
  }

  getForeigns$ = (modelProp: StateProp<TState>): Observable<Partial<TState>> => {
    const modelCfg = ModelStateConfig.get<TState>(modelProp);
    return this.stateSlice$(modelCfg.foreigns);
  }

  save = (command: any): void =>
    this.stateHttpCommandHandler.dispatch(this.saveStateHttpConverter.convert(command));
  

  delete = (command: any): void => {
    if(!this.deleteStateHttpConverter) console.error('Delete converter required for forms with delete');

    this.stateHttpCommandHandler.dispatch(this.deleteStateHttpConverter.convert(command));
  }
    
}