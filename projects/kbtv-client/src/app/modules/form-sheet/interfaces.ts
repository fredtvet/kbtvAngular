import { Type } from '@angular/core';
import { DynamicForm, FormComponent } from '@dynamic-forms/interfaces';
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';

export interface FormSheetWrapperConfig<TFormConfig, TFormState, TResult>{
    formConfig?: Maybe<TFormConfig>;
    formState$?: Observable<Maybe<Immutable<TFormState>>>;
    navConfig?: Maybe<FormSheetNavConfig>;
    submitCallback?: Maybe<(val: TResult) => void>;
    formComponent: Type<FormComponent<TFormConfig, TFormState, TResult>>;
}

export interface OptionsFormState<TOptions extends {}>{ 
    options: Maybe<Immutable<TOptions>>
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