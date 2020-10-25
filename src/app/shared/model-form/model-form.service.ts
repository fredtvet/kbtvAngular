import { Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { ModelStateConfig } from 'src/app/core/services/model/model-state.config';
import { DeleteModelStateCommand, DeleteModelAction } from 'src/app/core/services/model/state/delete-model/delete-model-state-command.interface';
import { DeleteModelHttpEffect } from 'src/app/core/services/model/state/delete-model/delete-model.http.effect';
import { DeleteModelReducer } from 'src/app/core/services/model/state/delete-model/delete-model.reducer';
import { CommandDispatcher } from 'src/app/core/services/state/command.dispatcher';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { Prop } from 'src/app/shared-app/prop.type';
import { ModelFormComponent } from 'src/app/shared/model-form/components/model-form.component';
import { translations } from 'src/app/shared/translations';
import { FormSheetWrapperComponent } from '../components/form-sheet-wrapper.component';
import { FormSheetWrapperConfig } from '../form';
import { ModelFormConfig } from './interfaces/model-form-config.interface';
import { SaveModelFormState } from './interfaces/model-form-to-state-command-adapter.interface';

export interface ModelFormServiceConfig<TForm, TFormState extends SaveModelFormState> {
  formConfig: ModelFormConfig<TForm, TFormState>,  
  formState?: TFormState | Observable<TFormState>,
  onSaveUri?: string, 
  onDeleteUri?: string, 
  deleteDisabled?: boolean, 
  customTitle?: string, 
  submitCallback?: (val: any) => void
}

@Injectable({ providedIn: "any" })
export class ModelFormService {

  constructor(
    private matBottomSheet: MatBottomSheet,
    deleteReducer: DeleteModelReducer, 
    deleteHttpEffect: DeleteModelHttpEffect,
    private router: Router,
    private confirmService: ConfirmDialogService,  
    private commandDispatcher: CommandDispatcher,
  ) {}

  open<TForm, TFormState extends SaveModelFormState>(
    config: ModelFormServiceConfig<TForm, TFormState>
  ): MatBottomSheetRef<FormSheetWrapperComponent, StateAction> {
    const ref =  this.matBottomSheet.open(FormSheetWrapperComponent, { 
      data: <FormSheetWrapperConfig<ModelFormConfig<TForm, TFormState>, SaveModelFormState, any>>{
        formConfig: config.formConfig, submitCallback: config.submitCallback,
        formComponent: ModelFormComponent,   
        formState$: config.formState instanceof Observable ? config.formState : of(config.formState),

        navConfig: {
          title: config.customTitle || 
            `${config.formConfig.entityId ? 
            "Oppdater" : "Registrer"} ${this.translateStateProp(config.formConfig.stateProp)}`,      
          backFn: () => this.close(null, ref),
          backIcon: "close",
          buttons: [
              (config.deleteDisabled || !(config.formConfig.entityId)) ? null : 
                {icon: 'delete_forever', callback: () => this.confirmDelete(config.formConfig, config.onDeleteUri, ref)}
          ]
        },
      } 
    });

    if(config.onSaveUri)
      ref.afterDismissed().subscribe(x => this.router.navigate([config.onSaveUri]))

    return ref;
  }

  close = (res: StateAction, ref: MatBottomSheetRef<any, any>, url?: string) => {
    if(url) this.router.navigate([url]);
    ref.dismiss(res);
  } 

  private translateStateProp = (prop: Prop<ModelState>): string => 
    {
      return translations[ModelStateConfig.get(prop).foreignProp?.toLowerCase()]?.toLowerCase();
    }

  private confirmDelete = (formConfig: ModelFormConfig<any, any>, deleteUrl: string, ref: MatBottomSheetRef<any, any>) => { 
    const translatedProp = this.translateStateProp(formConfig.stateProp)
    this.confirmService.open({
        title: `Slett ${translatedProp}?`, 
        message: `bekreft at du ønsker å slette ${translatedProp} med id "${formConfig.entityId}"`, 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteEntity(formConfig, deleteUrl, ref)
    });
  }

  private deleteEntity = (formConfig: ModelFormConfig<any, any>, deleteUrl: string, ref: MatBottomSheetRef<any, any>) => {
      this.close(StateAction.Delete, ref, deleteUrl);

      this.commandDispatcher.dispatch<DeleteModelStateCommand>({
          stateProp: formConfig.stateProp, 
          action: DeleteModelAction, 
          id: formConfig.entityId
      });
  };

}
