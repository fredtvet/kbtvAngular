import { EventEmitter, Type } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { Immutable } from '@immutable/interfaces';
import { Observable } from 'rxjs';

export type DisabledObjectMap<T> = { [key in keyof Partial<T>]: boolean };

export interface ControlHook<TResponse>{
    controlName: string | string[], 
    callback: (val: unknown) => TResponse
}

export type OptionsGetter<T> = T[] | ((state: unknown) => T[]);

export interface DynamicForm<TForm, TFormState>{
    initialValue?: Immutable<Partial<TForm>>;
    submitText?: string;
    controls: (DynamicControlGroup<TForm, TFormState> | DynamicControl<TForm, TFormState>)[];
    onSubmitFormatter?: (f: TForm, s: Immutable<TFormState>) => Immutable<TForm>;
    getRawValue?: boolean;
    disabledControls?: DisabledObjectMap<TForm>;
    noRenderDisabledControls?: boolean;
    validators?: ValidatorFn[];
    resettable?: boolean;
    resetState?: Partial<TForm>;
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

export interface DynamicControl<TForm, TFormState = unknown> { //Keep TFromState to enforce same state on controls
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
    required: boolean;
    control: AbstractControl;
    hideField$: Observable<boolean>;
}

export interface ControlGroupComponent {
    form: FormGroup;
    controlGroup: DynamicControlGroup<unknown>;
    formConfig: DynamicForm<unknown, Immutable<unknown>>;
    nestedNames: string[];
}

export interface FormComponent<TConfig, TFormState, TResult> {
    config: TConfig;
    formState: Immutable<TFormState>;
    formSubmitted: EventEmitter<TResult>;
}
