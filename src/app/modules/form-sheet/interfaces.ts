import { Type } from '@angular/core';
import { DynamicForm, FormComponent } from '@dynamic-forms/interfaces';
import { Observable } from 'rxjs';

export interface FormSheetWrapperConfig<TFormConfig, TFormState, TResult>{
    formConfig?: TFormConfig;
    formState$?: Observable<TFormState>;
    navConfig?: FormSheetNavConfig;
    submitCallback?: (val: TResult) => void;
    formComponent?: Type<FormComponent<TFormConfig, TFormState, TResult>>;
}

export interface OptionsFormState<TOptions extends Object>{ 
    options?: Readonly<TOptions>
}

export interface FormServiceConfig<TForm, TFormState>{
    formConfig: DynamicForm<TForm, TFormState>, 
    navConfig: FormSheetNavConfig,
    formState?: TFormState | Observable<TFormState>,
    submitCallback?: (val: TForm) => void
}

export interface FormSheetNavConfig {
    title: string;
    buttons?: FormSheetNavButton[];
}

export interface FormSheetNavButton{
    icon: string;
    callback: Function;
    color?: "primary" | "accent" | "warn"; 
    aria?: string;
}