import { Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { ModelState } from 'src/app/model/interfaces';
import { ModelStateConfig } from 'src/app/model/model-state.config';
import { DeleteModelStateCommand, DeleteModelActionId } from 'src/app/model/state/delete-model/delete-model-action.const';
import { ActionType } from 'src/app/shared-app/enums';
import { Prop } from 'src/app/shared-app/prop.type';
import { ModelFormComponent } from 'src/app/shared/model-form/components/model-form.component';
import { translations } from 'src/app/shared/translations';
import { Store } from 'src/app/state/store';
import { FormSheetWrapperComponent } from '../form/form-sheet-wrapper.component';
import { FormSheetWrapperConfig } from '../form/interfaces';
import { ModelFormConfig } from './interfaces/model-form-config.interface';
import { SaveModelFormState } from './interfaces/model-form-to-state-command-adapter.interface';

export interface ModelFormServiceConfig<TForm, TFormState extends  SaveModelFormState<Partial<ModelState>>> {
  formConfig: ModelFormConfig<TForm, TFormState>,  
  formState?: TFormState | Observable<TFormState>,
  onSaveUri?: string, 
  onDeleteUri?: string, 
  deleteDisabled?: boolean, 
  customTitle?: string, 
  submitCallback?: (val: any) => void
}

type State = SaveModelFormState<Partial<ModelState>>;

@Injectable()
export class ModelFormService {

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private confirmService: ConfirmDialogService,  
    private store: Store<ModelState>,
  ) {}

  open<TForm>(
    config: ModelFormServiceConfig<TForm, State>
  ): MatBottomSheetRef<FormSheetWrapperComponent, ActionType> {
    const ref =  this.matBottomSheet.open(FormSheetWrapperComponent, { 
      data: <FormSheetWrapperConfig<ModelFormConfig<TForm, State>, State, any>>{
        
        formConfig: config.formConfig, submitCallback: config.submitCallback,
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

  close = (res: ActionType, ref: MatBottomSheetRef<any, any>, url?: string) => {
    if(url) this.router.navigate([url]);
    ref.dismiss(res);
  } 

  private translateStateProp = (prop: Prop<ModelState>): string => 
    translations[ModelStateConfig.get(prop).foreignProp?.toLowerCase()]?.toLowerCase();

  private confirmDelete = (formConfig: ModelFormConfig<any, any>, deleteUrl: string, ref: MatBottomSheetRef<any, any>) => { 
    const translatedProp = this.translateStateProp(formConfig.stateProp)
    this.confirmService.open({
        title: `Slett ${translatedProp}?`, 
        message: `Bekreft at du ønsker å slette ${translatedProp} med id "${formConfig.entityId}"`, 
        confirmText: 'Slett',
        confirmCallback: () => this.deleteEntity(formConfig, deleteUrl, ref)
    });
  }

  private deleteEntity = (formConfig: ModelFormConfig<any, any>, deleteUrl: string, ref: MatBottomSheetRef<any, any>) => {
      this.close(ActionType.Delete, ref, deleteUrl);

      this.store.dispatch<DeleteModelStateCommand>({
          stateProp: formConfig.stateProp, 
          actionId: DeleteModelActionId, 
          id: formConfig.entityId
      });
  };

}
