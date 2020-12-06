import { EventEmitter, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { MainTopNavConfig } from '../components/main-top-nav-bar/main-top-nav.config';

export interface AdapterConstructor<TInput, TOutput>{
    new(input: TInput): TOutput;     
}

export interface FormComponent<TConfig, TFormState, TResult> {
    config: TConfig;
    formState: TFormState;
    formSubmitted: EventEmitter<TResult>;
}

export interface FormSheetWrapperConfig<TFormConfig, TFormState, TForm>{
    formConfig?: TFormConfig;
    formState$?: Observable<TFormState>;
    navConfig?: MainTopNavConfig;
    submitCallback?: (val: TForm) => void;
    formComponent?: Type<FormComponent<TFormConfig, TFormState, TForm>>;
}

export interface OptionsFormState<TOptions extends Object>{ 
    options?: TOptions
}
