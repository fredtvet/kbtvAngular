import { Type } from '@angular/core';
import { DynamicForm, FormComponent } from '@dynamic-forms/interfaces';
import { Immutable } from '@immutable/interfaces';
import { Observable } from 'rxjs';

export interface FormSheetWrapperConfig<TFormConfig, TFormState, TResult>{
    formConfig?: TFormConfig;
    formState$?: Observable<Immutable<TFormState>>;
    navConfig?: FormSheetNavConfig;
    submitCallback?: (val: TResult) => void;
    formComponent?: Type<FormComponent<TFormConfig, TFormState, TResult>>;
}

export interface OptionsFormState<TOptions extends Object>{ 
    options?: Immutable<TOptions>
}

export interface FormServiceConfig<TForm, TFormState>{
    formConfig: DynamicForm<TForm, TFormState>, 
    navConfig: FormSheetNavConfig,
    formState?: Immutable<TFormState> | Observable<Immutable<TFormState>>,
    submitCallback?: (val: Immutable<TForm>) => void
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