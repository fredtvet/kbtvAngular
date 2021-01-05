import { EventEmitter, Type } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';

export interface ValidationErrorMap { [key: string]: (err: unknown) => string }

export type DisabledObjectMap<T> = { [key in keyof Partial<T>]: boolean };

export interface ControlHook<TResponse>{
    controlName: string | string[], 
    callback: (val: unknown) => TResponse
}

export type OptionsGetter<T> = T[] | ((state: unknown) => T[]);

export interface DynamicForm<TForm, TFormState>{
    initialValue?: Maybe<Immutable<Partial<TForm>>>;
    submitText?: string;
    controls: (DynamicControlGroup<TForm, TFormState> | DynamicControl<TForm, TFormState>)[];
    onSubmitFormatter?: (f: TForm, s: Immutable<TFormState>) => Immutable<TForm>;
    getRawValue?: boolean;
    disabledControls?: DisabledObjectMap<TForm>;
    noRenderDisabledControls?: boolean;
    validators?: ValidatorFn[];
    resettable?: boolean;
    resetState?: Partial<TForm>;
    onlineRequired?: boolean;
}

export interface DynamicControlGroup<TForm, TFormState = unknown> {
    type: "group",
    name?: Extract<keyof TForm, string>, 
    controls: (DynamicControl<TForm, TFormState> | DynamicControlGroup<TForm, TFormState>)[],  
    controlGroupComponent?: Type<ControlGroupComponent>,
    label?: string,
    styling?: DynamicControlGroupStyling,
    disabledControls?: DisabledObjectMap<TForm>;
}

export interface DynamicControl<TForm, TFormState = {}> { //Keep TFromState to enforce same state on controls? not working atm
    type: "control"
    name: Extract<keyof TForm, string>, 
    required?: boolean,       
    valueGetter?: ((form: Immutable<TForm>) => unknown) | unknown,
    questions?: QuestionWrapper[],
    validators?: ValidatorFn[],
    asyncStateValidators?: ((state$: Observable<unknown>) => AsyncValidatorFn)[],
}

export interface DynamicControlGroupStyling {
    panelClass: string; 
    itemMargin?: string;
    fxLayout?: "row" | "column";
    fxLayoutAlign?: string;
}

export interface QuestionWrapper {
    component: Type<QuestionComponent>;
    question: Question;
    hideOnValueChange?: ControlHook<boolean>;
}

export interface Question {
    placeholder?: string;
    label?: string;
    ariaLabel?: string;
    hint?: string;
    color?: "primary" | "accent";
    width?: string;
}

export interface QuestionComponent {
    question: Question;
    form: FormGroup;
    required?: boolean;
    control: Maybe<AbstractControl>;
    hideField$: Observable<boolean>;
}

export interface ControlGroupComponent {
    form: FormGroup;
    controlGroup: DynamicControlGroup<{}>;
    formConfig: DynamicForm<{}, Immutable<{}>>;
    nestedNames: string[];
}

export interface FormComponent<TConfig, TFormState, TResult> {
    config: Maybe<TConfig>;
    formState: Maybe<Immutable<TFormState>>;
    formSubmitted: EventEmitter<Maybe<TResult>>;
}
