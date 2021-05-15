import { Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { FormSheetWrapperComponent, FormSheetWrapperConfig } from 'form-sheet';
import { Immutable } from "global-types";
import { StateModels } from "model/core";
import { ModelCommand, SaveAction } from "model/state-commands";
import { Observable, of } from 'rxjs';
import { ModelFormConfig, ModelFormServiceOptions } from './interfaces';
import { ModelFormComponent } from './model-form.component';
import { ModelFormFacade } from "./model-form.facade";

type WrapperConfig<TState extends object, TModel extends StateModels<TState>, TForm extends object, TInputState extends object> = 
  FormSheetWrapperConfig<Immutable<ModelFormConfig<TState, TModel, TForm, TInputState>> & {entityId?: unknown}, TState, SaveAction>;

type BottomSheetRef = MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand>;

/** Responsible for showing a form sheet with the specified model form */
@Injectable()
export class ModelFormService<TState extends object> {

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private facade: ModelFormFacade<TState, StateModels<TState>>
  ) {}

  /** Opens the specified model form as a form sheet
   * @param config
   * @param entityId If set, the form will be in edit mode for the model with corresponding id.
   * @returns A reference to the bottom sheet with the model form.
   */
  open<TModel extends StateModels<TState>, TForm extends object = TModel extends object ? TModel : never, TInputState extends object | null = null>(
    config: Immutable<ModelFormConfig<TState, TModel, TForm, TInputState>>,
    entityId?: unknown,
    options?: Immutable<ModelFormServiceOptions<TState>>
  ): BottomSheetRef {
    var ref: MatBottomSheetRef<FormSheetWrapperComponent, ModelCommand> = 
      this.matBottomSheet.open(FormSheetWrapperComponent, { 
        panelClass: "form-sheet-wrapper",
        data: {      
          formConfig: entityId ? {...config, entityId} : config, 
          formComponent:  ModelFormComponent,
          submitCallback: options?.submitCallback,
          formState$: options?.formState instanceof Observable ? options.formState : of(options?.formState),
          navConfig: {
            title: options?.customTitle || 
              `${entityId ? "Oppdater" : "Registrer"} 
              ${this.facade.translateStateProp(<any> config.includes.prop)}`,   
            buttons: (options?.deleteDisabled || !(entityId)) ? 
                null : 
                [{ icon: 'delete_forever', color: "warn", 
                   callback: (ref: BottomSheetRef) => 
                    this.facade.confirmDelete(<any> config, entityId, options?.onDeleteUri, ref) 
                }]    
          },
        } 
      });

    if(options?.onSaveUri)
      ref.afterDismissed().subscribe(x => this.router.navigate([options.onSaveUri]))

    return ref;
  }

}
