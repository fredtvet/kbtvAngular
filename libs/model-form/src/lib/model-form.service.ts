import { Inject, Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'confirm-dialog';
import { FormSheetWrapperComponent, FormSheetWrapperConfig, OptionsFormState } from 'form-sheet';
import { Immutable, Maybe, UnknownState, KeyVal } from "global-types";
import { Observable, of } from 'rxjs';
import { Store } from 'state-management';
import { DeleteModelAction, ModelCommand, ModelStateConfig, MODEL_PROP_TRANSLATIONS, SaveAction } from 'state-model';
import { ModelFormConfig, ModelFormServiceConfig } from './interfaces';
import { ModelFormComponent } from './model-form.component';

type FormState<TState> = OptionsFormState<TState>;
type ModelConfig<TForm> = ModelFormConfig<UnknownState, TForm, FormState<UnknownState>>;
type WrapperConfig<TForm> = FormSheetWrapperConfig<ModelConfig<TForm>, FormState<UnknownState>, SaveAction>;
type BottomSheetRef = MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand>;
/** Responsible for showing a form sheet with the specified model form */
@Injectable()
export class ModelFormService {

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private confirmService: ConfirmDialogService,  
    private store: Store<unknown>,
    @Inject(MODEL_PROP_TRANSLATIONS) private translations: KeyVal<string>
  ) {}

  /** Opens the specified model form as a form sheet
   * @param config
   * @returns A reference to the bottom sheet with the model form.
   */
  open<TState extends {}, TForm extends {}>(
    config: Immutable<ModelFormServiceConfig<TState, TForm, FormState<TState>>>
  ): BottomSheetRef {
    var ref: MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand> = 
      this.matBottomSheet.open(FormSheetWrapperComponent, { 
        panelClass: "form-sheet-wrapper",
        data: <Immutable<WrapperConfig<TForm>>>{
          
          formConfig: config.formConfig, 
          submitCallback: config.submitCallback,
          formComponent: ModelFormComponent,   
          formState$: config.formState instanceof Observable ? config.formState : of(config.formState),
          navConfig: {
            title: config.customTitle || 
              `${config.formConfig.entityId ? "Oppdater" : "Registrer"} 
              ${this.translateStateProp(config.formConfig.stateProp)}`,   

            buttons: (config.deleteDisabled || !(config.formConfig.entityId)) ? 
                null : 
                [{ icon: 'delete_forever', color: "warn", 
                   callback: (ref: BottomSheetRef) => this.confirmDelete(config.formConfig, config.onDeleteUri, ref) }]    
          },
        } 
      });

    if(config.onSaveUri)
      ref.afterDismissed().subscribe(x => this.router.navigate([config.onSaveUri]))

    return ref;
  }

  private close = (res: Maybe<ModelCommand>, ref: MatBottomSheetRef<unknown, unknown>, url?: Maybe<string>) => {
    if(url) this.router.navigate([url]);
    ref.dismiss(res);
  } 

  private translateStateProp = (prop: string): string => 
    this.translations[<string> ModelStateConfig.get(prop).foreignProp?.toLowerCase()]?.toLowerCase();

  private confirmDelete = <TState, TForm>(
    formConfig: Immutable<ModelFormConfig<TState, TForm, FormState<TState>>>, 
    deleteUrl: Maybe<string>, 
    ref: MatBottomSheetRef<unknown, unknown>) => { 
      console.log(ref)
    const translatedProp = this.translateStateProp(formConfig.stateProp);
    const modelCfg = ModelStateConfig.get<unknown, TState>(formConfig.stateProp);
    const idWord = this.translations[(<string> modelCfg.idProp).toLowerCase()] || modelCfg.idProp
    this.confirmService.open({
        title: `Slett ${translatedProp}?`, 
        message: `Bekreft at du ønsker å slette ${translatedProp} med ${idWord.toLowerCase()} "${formConfig.entityId}"`, 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteEntity(formConfig, deleteUrl, ref)
    });
  }

  private deleteEntity = <TState, TForm>(
    formConfig: Immutable<ModelFormConfig< TState, TForm, FormState<TState>>>, 
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
