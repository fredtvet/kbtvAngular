import { Inject, Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { ModelState } from '@core/state/model-state.interface';
import { FormSheetWrapperComponent } from '@form-sheet/form-sheet-wrapper.component';
import { FormSheetWrapperConfig, OptionsFormState } from '@form-sheet/interfaces';
import { Immutable } from "@immutable/interfaces";
import { MODEL_PROP_TRANSLATIONS } from '@model/injection-tokens.const';
import { KeyVal, SaveAction } from '@model/interfaces';
import { ModelCommand } from '@model/model-command.enum';
import { ModelStateConfig } from '@model/model-state.config';
import { DeleteModelAction } from '@model/state/delete-model/delete-model.action';
import { Store } from '@state/store';
import { Observable, of } from 'rxjs';
import { ConfirmDialogService } from 'src/app/modules/confirm-dialog/confirm-dialog.service';
import { ModelFormConfig } from './interfaces';
import { ModelFormComponent } from './model-form.component';

type FormState<TState> = OptionsFormState<Partial<TState>>;

export interface ModelFormServiceConfig<TState, TForm, TFormState extends FormState<TState>> {
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

  open<TState, TForm>(
    config: ModelFormServiceConfig<TState, TForm, FormState<TState>>
  ): MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand> {
    const ref =  this.matBottomSheet.open(FormSheetWrapperComponent, { 
      data: <FormSheetWrapperConfig<ModelFormConfig<TState, TForm, FormState<TState>>, FormState<TState>, SaveAction>>{
        
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

  close = (res: ModelCommand, ref: MatBottomSheetRef<unknown, unknown>, url?: string) => {
    if(url) this.router.navigate([url]);
    ref.dismiss(res);
  } 

  private translateStateProp = (prop: string): string => 
    this.translations[ModelStateConfig.get(prop).foreignProp?.toLowerCase()]?.toLowerCase();

  private confirmDelete = <TState, TForm>(
    formConfig: ModelFormConfig<TState, TForm, FormState<TState>>, 
    deleteUrl: string, 
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
    formConfig: ModelFormConfig<TState, TForm, FormState<TState>>, 
    deleteUrl: string, 
    ref: MatBottomSheetRef<unknown, unknown>) => {
      this.close(ModelCommand.Delete, ref, deleteUrl);
      this.store.dispatch(<DeleteModelAction<ModelState>>{ 
        type: DeleteModelAction, 
        stateProp: formConfig.stateProp, 
        payload: { id: formConfig.entityId } 
      });
  };

}
