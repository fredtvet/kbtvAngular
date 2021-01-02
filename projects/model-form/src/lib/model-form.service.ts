import { Inject, Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'confirm-dialog';
import { FormSheetWrapperComponent, FormSheetWrapperConfig, OptionsFormState } from 'form-sheet';
import { Immutable, Maybe, UnknownState, KeyVal } from "global-types";
import { Observable, of } from 'rxjs';
import { Store } from 'state-management';
import { DeleteModelAction, ModelCommand, ModelStateConfig, MODEL_PROP_TRANSLATIONS, SaveAction } from 'state-model';
import { ModelFormConfig } from './interfaces';
import { ModelFormComponent } from './model-form.component';

type FormState<TState> = OptionsFormState<TState>;

export interface ModelFormServiceConfig<TState extends {}, TForm extends {}, TFormState extends FormState<TState>> {
  formConfig: ModelFormConfig<TState, TForm, TFormState>,  
  formState?: Immutable<TFormState> | Observable<Immutable<TFormState>>,
  onSaveUri?: string, 
  onDeleteUri?: string, 
  deleteDisabled?: boolean, 
  customTitle?: string, 
  submitCallback?: (val: unknown) => void
}

@Injectable()
export class ModelFormService {

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private confirmService: ConfirmDialogService,  
    private store: Store<unknown>,
    @Inject(MODEL_PROP_TRANSLATIONS) private translations: KeyVal<string>
  ) {}

  open<TState extends {}, TForm extends {}>(
    config: ModelFormServiceConfig<TState, TForm, FormState<TState>>
  ): MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand> {
    const ref =  this.matBottomSheet.open(FormSheetWrapperComponent, { 
      data: <FormSheetWrapperConfig<ModelFormConfig<UnknownState, TForm, FormState<UnknownState>>, FormState<UnknownState>, SaveAction>>{
        
        formConfig: config.formConfig, 
        submitCallback: config.submitCallback,
        formComponent: ModelFormComponent,   
        formState$: config.formState instanceof Observable ? config.formState : of(config.formState),

        navConfig: {
          title: config.customTitle || 
            `${config.formConfig.entityId ? "Oppdater" : "Registrer"} 
             ${this.translateStateProp(config.formConfig.stateProp)}`,      
          backFn: () => this.close(null, ref),
          backIcon: "close",
          buttons: (config.deleteDisabled || !(config.formConfig.entityId)) ? 
              null : 
              [{icon: 'delete_forever', color: "warn", callback: () => this.confirmDelete(config.formConfig, config.onDeleteUri, ref)}]    
        },
      } 
    });

    if(config.onSaveUri)
      ref.afterDismissed().subscribe(x => this.router.navigate([config.onSaveUri]))

    return ref;
  }

  close = (res: Maybe<ModelCommand>, ref: MatBottomSheetRef<unknown, unknown>, url?: Maybe<string>) => {
    if(url) this.router.navigate([url]);
    ref.dismiss(res);
  } 

  private translateStateProp = (prop: string): string => 
    this.translations[<string> ModelStateConfig.get(prop).foreignProp?.toLowerCase()]?.toLowerCase();

  private confirmDelete = <TState, TForm>(
    formConfig: ModelFormConfig<TState, TForm, FormState<TState>>, 
    deleteUrl: Maybe<string>, 
    ref: MatBottomSheetRef<unknown, unknown>) => { 
    const translatedProp = this.translateStateProp(formConfig.stateProp)
    this.confirmService.open({
        title: `Slett ${translatedProp}?`, 
        message: `Bekreft at du ønsker å slette ${translatedProp} med id "${formConfig.entityId}"`, 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteEntity(formConfig, deleteUrl, ref)
    });
  }

  private deleteEntity = <TState, TForm>(
    formConfig: ModelFormConfig< TState, TForm, FormState<TState>>, 
    deleteUrl: Maybe<string>, 
    ref: MatBottomSheetRef<unknown, unknown>) => {
      this.close(ModelCommand.Delete, ref, deleteUrl);
      this.store.dispatch({ 
        type: DeleteModelAction,  
        stateProp: <string> formConfig.stateProp, 
        payload: { id: formConfig.entityId } 
      });
  };

}
