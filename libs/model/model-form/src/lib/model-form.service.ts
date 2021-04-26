import { Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { FormSheetWrapperComponent, FormSheetWrapperConfig, OptionsFormState } from 'form-sheet';
import { Immutable } from "global-types";
import { ModelCommand, SaveAction } from "model/state-commands";
import { Observable, of } from 'rxjs';
import { ModelFormConfig, ModelFormServiceOptions } from './interfaces';
import { ModelFormComponent } from './model-form.component';
import { ModelFormFacade } from "./model-form.facade";

type WrapperConfig<TState extends object, TForm extends object, TFormState> = FormSheetWrapperConfig<Immutable<ModelFormConfig<TState, TForm, TFormState>> & {entityId?: unknown}, TState, SaveAction>;
type BottomSheetRef = MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand>;


/** Responsible for showing a form sheet with the specified model form */
@Injectable()
export class ModelFormService {

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private facade: ModelFormFacade
  ) {}

  /** Opens the specified model form as a form sheet
   * @param config
   * @param entityId If set, the form will be in edit mode for the model with corresponding id.
   * @returns A reference to the bottom sheet with the model form.
   */
  open<TState extends object, TForm extends object, TFormState extends OptionsFormState<object> = OptionsFormState<object>>(
    config: Immutable<ModelFormConfig<TState, TForm, TFormState>>,
    entityId?: unknown,
    options?: Immutable<ModelFormServiceOptions<TState>>
  ): BottomSheetRef {
    var ref: MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand> = 
      this.matBottomSheet.open(FormSheetWrapperComponent, { 
        panelClass: "form-sheet-wrapper",
        data: <WrapperConfig<TState, TForm, TFormState>> {      
          formConfig: entityId ? {...config, entityId} : config, 
          formComponent:  ModelFormComponent,
          submitCallback: options?.submitCallback,
          formState$: options?.formState instanceof Observable ? options.formState : of(options?.formState),
          navConfig: {
            title: options?.customTitle || 
              `${entityId ? "Oppdater" : "Registrer"} 
              ${this.facade.translateStateProp(config.includes.prop)}`,   
            buttons: (options?.deleteDisabled || !(entityId)) ? 
                null : 
                [{ icon: 'delete_forever', color: "warn", 
                   callback: (ref: BottomSheetRef) => 
                    this.facade.confirmDelete(<ModelFormConfig<object, object>> config, entityId, options?.onDeleteUri, ref) 
                }]    
          },
        } 
      });

    if(options?.onSaveUri)
      ref.afterDismissed().subscribe(x => this.router.navigate([options.onSaveUri]))

    return ref;
  }

}
