import { Inject, Injectable } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'confirm-dialog';
import { Immutable, KeyVal, Maybe, UnknownState } from 'global-types';
import { RelationInclude, UnknownModelState, _flattenRelationIncludes, _getModelConfig } from 'model/core';
import { DeleteModelAction, ModelCommand } from 'model/state-commands';
import { FetchModelsAction } from 'model/state-fetcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateAction, Store } from 'state-management';
import { MODEL_FORM_PROP_TRANSLATIONS } from './injection-tokens.const';
import { ModelFormConfig, ModelFormState } from './interfaces';

@Injectable({providedIn: "root"})
export class ModelFormFacade {

  constructor(
    private store: Store<UnknownModelState>,   
    private confirmService: ConfirmDialogService,  
    private router: Router,
    @Inject(MODEL_FORM_PROP_TRANSLATIONS) private translations: KeyVal<string>,
  ) {}

  loadModels(includes: Immutable<RelationInclude<UnknownState>>): void{
    this.store.dispatch(<FetchModelsAction<UnknownState>>{
      type: FetchModelsAction, 
      props: _flattenRelationIncludes(includes)
    })
  }

  getFormState$(includes: Immutable<RelationInclude<UnknownState>>): Observable<Immutable<ModelFormState<UnknownModelState>>>{
    return this.store.select$(_flattenRelationIncludes(includes)).pipe(
      map(state => { return {options: state || {}} })
    )
  }

  save(action: StateAction): void {
    this.store.dispatch(action);
  }

  translateStateProp = (prop: string): string => 
    this.translations[<string> _getModelConfig(prop).foreignProp?.toLowerCase()]?.toLowerCase();

  confirmDelete = (
    formConfig: Immutable<ModelFormConfig<any, any, any, any>>, 
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
    formConfig: Immutable<ModelFormConfig<object, object>>, 
    entityId: unknown,
    deleteUrl: Maybe<string>, 
    ref: MatBottomSheetRef<unknown, unknown>) => {
      if(deleteUrl) this.router.navigate([deleteUrl]);
      ref.dismiss(ModelCommand.Delete);
      this.store.dispatch({ 
        type: DeleteModelAction,  
        stateProp: formConfig.includes.prop, 
        payload: { id: entityId } 
      });
  };
}