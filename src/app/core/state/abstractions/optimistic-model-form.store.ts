import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { TempEntity } from "src/app/core/models";
import { ApiService } from '../../services/api.service';
import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { BaseModelStore } from './base-model.store';
import { ModelPropertyConfig, ModelStateConfig } from '../model-state.config';
import { Optimistic } from '../optimistic.action';
  
@Injectable({
  providedIn: 'any',
})
export abstract class OptimisticModelFormStore<TState> extends BaseModelStore<TState>  {

  protected get propCfg(): ModelPropertyConfig { 
    const cfg = ModelStateConfig[this.stateProp as string];
    if(!cfg) throw `No model state settings for property ${this.stateProp}`;
    return ModelStateConfig[this.stateProp as string]; 
  };

  constructor(
    arrayHelperService: ArrayHelperService,
    apiService: ApiService,
    protected stateProp?: Extract<keyof TState, string>
  ) {
    super(arrayHelperService, apiService, {trackStateHistory: true,logStateChanges: true});
  
    console.log("BaseFormStore")
  }

  protected _add$<TEntity extends TempEntity>(
    postObserver: Observable<any>, 
    optimisticAdd: TEntity, 
    stateFunc?: (response: any) => Partial<TState>
  ): Observable<void> {
    if(!this.stateProp) throwError("No state property set");
    let tempId = Math.floor(Math.random() * (100000 - 1) + 1);
    let state = this.getState(false);
  
    this._updateStateProperty(
       this.stateProp, 
      (entities: TEntity[]) => this.arrayHelperService.add(entities, {...optimisticAdd, tempId}), 
      Optimistic
    )

    return postObserver.pipe(
          catchError(err => {this._setStateVoid(state, Optimistic); return throwError(err)}),
          tap(entity => {
            if(stateFunc) this._setStateVoid(stateFunc(entity));
            else this._setStateVoid(this.modifyEntityWithForeigns(entity,
              (entity, entities) => this.arrayHelperService.replace(entities, entity, tempId, "tempId")))
          })
        );  
  }

  protected _update$<TEntity extends TempEntity>(
    postObserver: Observable<any>, 
    optimisticUpdate: TEntity, 
    stateFunc?: (response: any) => Partial<TState>): Observable<void> {
    if(!this.stateProp) throwError("No state property set");
    let state = this.getState(false);

    this._updateStateProperty(
        this.stateProp, 
        (entities: TEntity[]) => this.arrayHelperService.update(entities, optimisticUpdate, this.propCfg.identifier),
        Optimistic
    )

    return postObserver.pipe(
        catchError(err => {this._setStateVoid(state, Optimistic); return throwError(err)}),
        tap(entity => {
          if(stateFunc) this._setStateVoid(stateFunc(entity));
          else this._setStateVoid(this.modifyEntityWithForeigns(entity, 
              (entity, entities) => this.arrayHelperService.update(entities, entity, this.propCfg.identifier)))
        })
    );  
  }

  protected _delete$ = (id: number, stateFunc?: (id: number) => Partial<TState>): Observable<void> =>{
    if(!this.stateProp) throwError("No state property set");
    let state = this.getState(false);

    this._updateStateProperty(
        this.stateProp, 
        (entities: TempEntity[]) => this.arrayHelperService.removeByIdentifier(entities, id, this.propCfg.identifier),
        Optimistic
    )

    return this.apiService.delete(this.propCfg.apiUrl + '/' + id).pipe(
        catchError(err => {this._setStateVoid(state, Optimistic); return throwError(err)}),
        tap(x => this._setStateVoid(stateFunc ? stateFunc(id) : this.deleteEntityChildren({id})))
    ); 
  }

  protected _deleteRange$(ids: number[], stateFunc?: (ids: number[]) => Partial<TState>): Observable<void> {
    if(!this.stateProp) throwError("No state property set");
    let state = this.getState(false);

    this._updateStateProperty(
        this.stateProp, 
        (entities: TempEntity[]) => this.arrayHelperService.removeRangeByIdentifier(entities, ids, this.propCfg.identifier),
        Optimistic
    )

    return this.apiService.post(`${this.propCfg.apiUrl}/DeleteRange`, {Ids: ids})    
        .pipe(
          catchError(err => {this._setStateVoid(state, Optimistic); return throwError(err)}),
          tap(x => this._setStateVoid(stateFunc ? stateFunc(ids) : this.deleteEntityChildren({ids}))) 
        )
  }

  //Add foreign properties (multiple properties can be created in single API call)
  private modifyEntityWithForeigns
    (entity: TempEntity, actionFn: (entity: TempEntity, entities: TempEntity[]) => TempEntity[]): Partial<TState>{

    let state: Partial<TState> = {};
    
    for(var fkProp of this.propCfg.foreigns || []){
        const fkPropConfig = ModelStateConfig[fkProp]; //Key information about foreign prop
        const foreignEntity = entity[fkPropConfig.foreignProp];
        if(foreignEntity?.id){ //If response model contains fk entity, add to state
            state[fkProp] = this.arrayHelperService.add(this.getStateProperty(fkProp), foreignEntity);
            entity[fkPropConfig.foreignKey] = foreignEntity.id; //Set foreign key on entity
            entity[fkPropConfig.foreignProp] = null; //Remove foreign entity to prevent duplicate data
        }
    }

    entity.tempId = null;
    state[this.stateProp as string] = actionFn(entity, this.getStateProperty(this.stateProp, false));

    return state;
  }

  private deleteEntityChildren(cfg: {id?: number, ids?: number[]}): Partial<TState>{
    if(!cfg.id && !cfg.ids) throw "deleteEntityChildren config requires either id or ids property set."
    let state: Partial<TState> = {};

    let filterExp: (x: Object) => boolean;
    if(cfg.id) filterExp = (x) => x[this.propCfg.foreignKey] !== cfg.id;
    else if(cfg.ids) filterExp = (x) => !cfg.ids.includes(x[this.propCfg.foreignKey]);

    for(var childProp of this.propCfg.children || []){
        state[childProp] = 
            this.arrayHelperService.filter(this.getStateProperty(childProp), filterExp);
    };

    return state;
  }
  
} 