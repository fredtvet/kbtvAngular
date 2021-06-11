import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicForm, DynamicFormComponent } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { Observable, of } from 'rxjs';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';
import { FormSheetState, FormSheetViewConfig, FormSheetWrapperConfig } from './interfaces';

/** Responsible for opening the provided form in a bottom sheet */
@Injectable({ providedIn: "any" })
export class FormService {

  constructor(
    private matBottomSheet: MatBottomSheet,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){}

  /** Opens the specified form as a form sheet
   * @param view - The view config for the form sheet
   * @param state - The state of the form
   * @param submitCallback - An optional callback that gets called when the form is submitted. 
   * @returns A reference to the bottom sheet with the form.
   */
  open<TForm extends object, TInputState extends object | null, TFormConfig = DynamicForm<TForm, TInputState>, TResult = Immutable<TForm>>(
    view: Immutable<FormSheetViewConfig<TForm, TInputState, TFormConfig, TResult>>, 
    state: Immutable<FormSheetState<TForm, TInputState>>,
    submitCallback?: (val: TResult) => void
  ): MatBottomSheetRef<FormSheetWrapperComponent, TResult> {  

    const ref = this.matBottomSheet.open(FormSheetWrapperComponent, { 
      panelClass: view.fullScreen === false ? ["form-sheet-wrapper"] : ["form-sheet-wrapper", "form-sheet-wrapper-fullscreen"],
      data: <Immutable<FormSheetWrapperConfig<TFormConfig, TForm, TInputState, TResult>>> {  
        submitCallback,
        formConfig: view.formConfig,
        navConfig: view.navConfig, 
        formComponent: view.customFormComponent || DynamicFormComponent,    
        initialValue: state.initialValue,
        formState$: state.formState instanceof Observable ? state.formState : of(state.formState)
      } 
    });

    if(view.useRouting === true || view.useRouting === undefined) 
      this.addSheetRouting(ref);
    
    return ref;
  }

  private addSheetRouting(ref: MatBottomSheetRef<FormSheetWrapperComponent>): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: {sheet: true}, queryParamsHandling: 'merge' });
    ref.afterDismissed().subscribe(x => x ? this.location.back() : null);
  }

}
    