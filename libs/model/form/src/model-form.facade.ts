import { Inject, Injectable } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'confirm-dialog';
import { Immutable, KeyVal, Maybe, UnknownState } from 'global-types';
import { RelationInclude, StateModels, StatePropByModel, _getModelConfig, _getRelationIncludeStateProps } from 'model/core';
import { MODEL_PROP_TRANSLATIONS } from "model/shared";
import { DeleteModelAction, ModelCommand } from 'model/state-commands';
import { FetchModelsAction } from 'model/state-fetcher';
import { Observable } from 'rxjs';
import { StateAction, Store } from 'state-management';
import { ModelFormConfig } from './interfaces';

@Injectable({providedIn: "root"})
export class ModelFormFacade<TState extends object, TModel extends StateModels<TState>> {

  constructor(
    private store: Store<TState>,   
    private confirmService: ConfirmDialogService,  
    private router: Router,
    @Inject(MODEL_PROP_TRANSLATIONS) private translations: KeyVal<string>,
  ) {}

  loadModels(
    includes: Immutable<RelationInclude<TState, TModel>>): void{
    this.store.dispatch(<FetchModelsAction<UnknownState>>{
      type: FetchModelsAction, 
      props: _getRelationIncludeStateProps(includes)
    })
  }

  getModelState$(includes: Immutable<RelationInclude<TState, TModel>>): Observable<Immutable<Partial<TState>>> {
    return this.store.select$<any>(_getRelationIncludeStateProps(includes)) as Observable<Immutable<Partial<TState>>>
  }

  save(action: StateAction): void {
    this.store.dispatch(action);
  }

  translateStateProp = (prop: Immutable<StatePropByModel<TState, TModel>>): string => 
    this.translations[<string> (<string> prop).toLowerCase()]?.toLowerCase();

  confirmDelete = (
    formConfig: Immutable<ModelFormConfig<TState, TModel, any>>, 
    entityId: unknown,
    deleteUrl: Maybe<string>, 
    ref: MatBottomSheetRef<unknown, unknown>) => { 
    const translatedProp = this.translateStateProp(formConfig.includes.prop);
    const modelCfg = _getModelConfig(formConfig.includes.prop);
    const idWord = this.translations[(<string> modelCfg.idProp).toLowerCase()] || modelCfg.idProp
    this.confirmService.open({
        title: `Slett ${translatedProp}?`, 
        message: `Bekreft at du ønsker å slette ${translatedProp} med ${idWord.toLowerCase()} "${entityId}"`, 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteEntity(formConfig, entityId, deleteUrl, ref)
    });
  }

  private deleteEntity = (
    formConfig: Immutable<ModelFormConfig<TState, TModel, any>>, 
    entityId: unknown,
    deleteUrl: Maybe<string>, 
    ref: MatBottomSheetRef<unknown, unknown>) => {
      if(deleteUrl) this.router.navigate([deleteUrl]);
      ref.dismiss(ModelCommand.Delete);
      this.store.dispatch({ 
        type: DeleteModelAction,  
        stateProp: <any> formConfig.includes.prop, 
        payload: { id: entityId } 
      });
  };
}