import { Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { ConfirmDialogService } from '@core/services/ui/confirm-dialog.service';
import { ModelCommand } from '@model/model-command.enum';
import { ModelStateConfig } from '@model/model-state.config';
import { DeleteModelActionId, DeleteModelStateCommand } from '@model/state/delete-model/delete-model-action.const';
import { SaveAction } from '@model/state/save-model/save-model-action.const';
import { translations } from '@shared/translations';
import { Store } from '@state/store';
import { Observable, of } from 'rxjs';
import { FormSheetWrapperComponent } from '../form/form-sheet-wrapper.component';
import { FormSheetWrapperConfig, OptionsFormState } from '../form/interfaces';
import { ModelFormComponent } from './components/model-form.component';
import { ModelFormConfig } from './interfaces/model-form-config.interface';

type FormState<TState> = OptionsFormState<Partial<TState>>;

export interface ModelFormServiceConfig<TState, TForm, TFormState extends FormState<TState>> {
  formConfig: ModelFormConfig<TState, TForm, TFormState>,  
  formState?: TFormState | Observable<TFormState>,
  onSaveUri?: string, 
  onDeleteUri?: string, 
  deleteDisabled?: boolean, 
  customTitle?: string, 
  submitCallback?: (val: any) => void
}

@Injectable()
export class ModelFormService {

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private confirmService: ConfirmDialogService,  
    private store: Store<any>,
  ) {}

  open<TForm>(
    config: ModelFormServiceConfig<any, TForm, FormState<any>>
  ): MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand> {
    const ref =  this.matBottomSheet.open(FormSheetWrapperComponent, { 
      data: <FormSheetWrapperConfig<ModelFormConfig<any, TForm, FormState<any>>, FormState<any>, SaveAction>>{
        
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
          buttons: [
              (config.deleteDisabled || !(config.formConfig.entityId)) ? null : 
                {icon: 'delete_forever', color: "warn", callback: () => this.confirmDelete(config.formConfig, config.onDeleteUri, ref)}
          ]
        },
      } 
    });

    if(config.onSaveUri)
      ref.afterDismissed().subscribe(x => this.router.navigate([config.onSaveUri]))

    return ref;
  }

  close = (res: ModelCommand, ref: MatBottomSheetRef<any, any>, url?: string) => {
    if(url) this.router.navigate([url]);
    ref.dismiss(res);
  } 

  private translateStateProp = (prop: string): string => 
    translations[ModelStateConfig.get(prop).foreignProp?.toLowerCase()]?.toLowerCase();

  private confirmDelete = (formConfig: ModelFormConfig<any, any, any>, deleteUrl: string, ref: MatBottomSheetRef<any, any>) => { 
    const translatedProp = this.translateStateProp(formConfig.stateProp)
    this.confirmService.open({
        title: `Slett ${translatedProp}?`, 
        message: `Bekreft at du ønsker å slette ${translatedProp} med id "${formConfig.entityId}"`, 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteEntity(formConfig, deleteUrl, ref)
    });
  }

  private deleteEntity = (formConfig: ModelFormConfig<any, any, any>, deleteUrl: string, ref: MatBottomSheetRef<any, any>) => {
      this.close(ModelCommand.Delete, ref, deleteUrl);

      this.store.dispatch<DeleteModelStateCommand<any>>({
          stateProp: formConfig.stateProp, 
          actionId: DeleteModelActionId, 
          id: formConfig.entityId
      });
  };

}
