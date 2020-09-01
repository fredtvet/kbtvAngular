import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { BaseEntity } from "src/app/core/models";
import { ModelPropertyConfig, ModelStateConfig } from './model-state.config';
import { BaseModelStore } from './base-model.store';
import { ModelState } from './global.state';
import { ApiService } from '../services/api.service';
import { ArrayHelperService } from '../services/utility/array-helper.service';

@Injectable({
  providedIn: 'any',
})
export abstract class OptimisticFormStore<TState extends Partial<ModelState>> extends BaseModelStore<TState>  {

  protected get propCfg(): ModelPropertyConfig { return ModelStateConfig[this.stateProp as string]; };

  constructor(
    arrayHelperService: ArrayHelperService,
    apiService: ApiService,
    protected stateProp?: Extract<keyof TState, string>
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  
    console.log("BaseFormStore")
  }

  protected _add$(postObserver: Observable<any>, optimisticAdd: BaseEntity, stateFunc?: (response: any) => void): Observable<void> {
    if(!this.stateProp) throwError("No state property set");
    let tempId = Math.floor(Math.random() * (100000 - 1) + 1);
    let state = this.getState(false);
  
    this._updateStateProperty(
       this.stateProp, 
      (entities: BaseEntity[]) => this.arrayHelperService.add(entities, {...optimisticAdd, tempId})
    )

    return postObserver.pipe(
          catchError(err => {this._setStateVoid(state); return throwError(err)}),
          tap(entity => {
            if(stateFunc) stateFunc(entity);
            else this.modifyEntityWithForeigns(entity,
              (entity) => this.arrayHelperService.replace(this.getStateProperty(this.stateProp), entity, tempId, "tempId"))
          })
        );  
  }

  protected _update$(postObserver: Observable<any>, optimisticUpdate: BaseEntity, stateFunc?: (response: any) => void): Observable<void> {
    if(!this.stateProp) throwError("No state property set");
    let state = this.getState(false);

    this._updateStateProperty(
        this.stateProp, 
        (entities: BaseEntity[]) => this.arrayHelperService.update(entities, optimisticUpdate, this.propCfg.identifier)
    )

    return postObserver.pipe(
        catchError(err => {this._setStateVoid(state); return throwError(err)}),
        tap(entity => {
          if(stateFunc) stateFunc(entity);
          else this.modifyEntityWithForeigns(entity, 
              (entity) => this.arrayHelperService.update(this.getProperty(this.stateProp, false), entity, this.propCfg.identifier))
        })
    );  
  }

  protected _delete$ = (id: number, stateFunc?: (id: number) => void): Observable<void> =>{
    if(!this.stateProp) throwError("No state property set");
    let state = this.getState(false);

    this._updateStateProperty(
        this.stateProp, 
        (entities: BaseEntity[]) => this.arrayHelperService.removeByIdentifier(entities, id, this.propCfg.identifier)
    )

    return this.apiService.delete(this.propCfg.apiUrl + '/' + id).pipe(
        catchError(err => {this._setStateVoid(state); return throwError(err)}),
        tap(x => stateFunc ? stateFunc(id) : this.deleteEntityChildren({id}))
    ); 
  }

  protected _deleteRange$(ids: number[], stateFunc?: (ids: number[]) => void): Observable<void> {
    if(!this.stateProp) throwError("No state property set");
    let state = this.getState(false);

    this._updateStateProperty(
        this.stateProp, 
        (entities: BaseEntity[]) => this.arrayHelperService.removeRangeByIdentifier(entities, ids, this.propCfg.identifier)
    )

    return this.apiService.post(`${this.propCfg.apiUrl}/DeleteRange`, {Ids: ids})    
        .pipe(
          catchError(err => {this._setStateVoid(state); return throwError(err)}),
          tap(x => stateFunc ? stateFunc(ids) : ids.forEach(id => this.deleteEntityChildren({ids}))) 
        )
  }

  //Add foreign properties (multiple properties can be created in single API call)
  private modifyEntityWithForeigns<TEntity extends BaseEntity>
    (entity: TEntity, actionFn: (entity: TEntity) => TEntity[]): void{

    let state: Partial<TState> = {};

    for(var fk of this.propCfg.foreignKeys){
        const fkPropConfig = ModelStateConfig[fk]; //Key information about foreign prop
        if(entity[fkPropConfig.modelProp]?.id){ //If response model contains fk entity, add to state
            state[fk] = this.arrayHelperService.add(this.getStateProperty(fk), entity[fkPropConfig.modelProp]);
            entity[fkPropConfig.fkProp] = entity[fkPropConfig.modelProp].id; //Set foreign key on entity
            entity[fkPropConfig.modelProp] = null; //Remove foreign entity to prevent duplicate data
        }
    }

    entity.tempId = null;
    state[this.stateProp as string] = actionFn(entity);

    this._setStateVoid(state);
  }

  private deleteEntityChildren(cfg: {id?: number, ids?: number[]}): void{
    let state: Partial<TState> = {};

    let filterExp = (x) => x[this.propCfg.fkProp] !== cfg.id;
    if(cfg.ids) filterExp = (x) => !cfg.ids.includes(x[this.propCfg.fkProp]);

    for(var childProp of this.propCfg.children){
        state[childProp as string] = 
            this.arrayHelperService.filter(this.getStateProperty(childProp), filterExp);
    };

    this._setStateVoid(state);
  }
  
} 