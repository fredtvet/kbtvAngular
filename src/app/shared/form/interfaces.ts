import { Type } from '@angular/core';
import { DynamicForm, FormComponent } from '@dynamic-forms/interfaces';
import { Observable } from 'rxjs';
import { MainTopNavConfig } from '../components/main-top-nav-bar/main-top-nav.config';

export interface AdapterConstructor<TInput, TOutput>{
    new(input: TInput): TOutput;     
}

export interface FormSheetWrapperConfig<TFormConfig, TFormState, TResult>{
    formConfig?: TFormConfig;
    formState$?: Observable<TFormState>;
    navConfig?: MainTopNavConfig;
    submitCallback?: (val: TResult) => void;
    formComponent?: Type<FormComponent<TFormConfig, TFormState, TResult>>;
}

export interface OptionsFormState<TOptions extends Object>{ 
    options?: Readonly<TOptions>
}

export interface FormServiceConfig<TForm, TFormState>{
    formConfig: DynamicForm<TForm, TFormState>, 
    navConfig: MainTopNavConfig,
    formState?: TFormState | Observable<TFormState>,
    submitCallback?: (val: TForm) => void
  }