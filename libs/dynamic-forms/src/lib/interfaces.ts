import { EventEmitter, Type } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { Immutable, ImmutableArray, Maybe, NotNull } from 'global-types';
import { Observable } from 'rxjs';

type ObjProps<T> = { [K in keyof T as T[K] extends Maybe<object> ? K : never]: NotNull<T[K]>; };

/** Represents a map of properties from TForm with an associated control */
export type ValidControlObject<TForm, TFormState extends object | null = null> = {[P in keyof TForm]: ValidControl<TForm, P, TFormState> }

/** Represents a function that converts an error to a readable error message */
export type ErrorDisplayFn = (err: unknown) => string;

/** Represents a map of validation errors with accociated {@link ErrorDisplayFn} 
 *  Provided with the token {@link VALIDATION_ERROR_MESSAGES} */
export interface ValidationErrorMap { [key: string]: ErrorDisplayFn }

/** Represents a map of controls that should be disabled */
export type DisabledControls<TForm> = {[P in keyof NotNull<TForm>]: boolean };

/** Represents a map of controls with callbacks that are called on form value changes. Return true on callback to hide control. */
export type HideOnValueChanges<TForm> = {[P in keyof NotNull<TForm>]: (val: TForm) => boolean }

/** Represents an async validator that reacts to an observer of state T */
export type AsyncStateValidator<T> = ((state$: Observable<T>) => AsyncValidatorFn);

/** Represents a getter function that returns an array of options from provided state
 *  Can also can the options directly. */
 export type OptionsGetter<T, TFormState extends object | null = null> = 
 T[] | ((state: Immutable<TFormState>) => Maybe<ImmutableArray<T>>);

/** Represents a valid control for a given form */
export type ValidControl<TForm, TProp extends keyof TForm = keyof TForm, TFormState extends object | null = null> = 
        DynamicControl<TForm, TProp, TFormState> | 
        DynamicControlGroup<TForm, TProp extends keyof ObjProps<TForm> ? TProp : never, TFormState>

/** Represents a object for hooking onto a controls value changes. */
export interface ControlHook<TResponse>{
    /** The name of the control(s) */
    controlName: string | string[], 
    /** The function being called when the control(s) value changes. */
    callback: (val: unknown) => TResponse
}

/** Describes a form that can render dynamically with the {@link DynamicFormComponent}
 *  Creates a reactive form with visible fields to change the values of the form. 
 *  @see {@link https://angular.io/guide/reactive-forms} */
export interface DynamicForm<TForm, TFormState extends object | null> extends DynamicAbstractGroup<TForm, TFormState> {
    /** The initial form value */
    initialValue?: Maybe<Partial<TForm>>;
    /** A function that modifies the form value when submitted */
    onSubmitFormatter?: (f: TForm, s: Immutable<TFormState>) => Immutable<TForm>;
    /** Validators for the form on submit */
    validators?: ValidatorFn[];
    /** Set to true if the form should have a reset option */
    resettable?: boolean;
    /** The form value that will be set on reset */
    resetState?: Partial<TForm>;
    /** Should the form require the user to be online before submitting? */
    onlineRequired?: boolean;
    /** Can the form submit in pristine state? */
    allowPristine?: boolean;    
    /** Set to true to get the raw form value on submit. 
     * This includes the values of disabled controls. */
    getRawValue?: boolean;
    /** Set to true if disabled controls shouldn't be rendered. */
    noRenderDisabledControls?: boolean;    
    /** A custom text on the submit button */
    submitText?: string;
    /** If true, all controls with an initial value are disabled */
    disableControlsWithValue?: boolean
}   

/** Describes a group of controls that make up an object in the form model */
export interface DynamicControlGroup<
    TForm, 
    TProp extends keyof ObjProps<TForm>, 
    TFormState extends object | null = null> extends DynamicAbstractGroup<ObjProps<TForm>[TProp], Partial<TFormState> | null>{
    /** The type of control */
    type: "group",
    /** The name of the control group. If name is set, the controls are nested within a form group with given name. */
    name: TProp,  
    /** A custom control group component for displaying the group */
    controlGroupComponent?: Type<ControlGroupComponent>,
    /** A visual label displayed above the group on the rendered form */
    label?: string,
}

export interface DynamicAbstractGroup<TForm, TFormState extends object | null> {
    /** The form controls that make up the group */
    controls: ValidControlObject<TForm, Partial<TFormState> | null >
    /** A map of controls with a function that runs on form value changes that decides if control should be hidden. */
    hideOnValueChangeMap?: HideOnValueChanges<Partial<TForm>>;
    /** A map of controls that should be disabled by default */
    disabledControls?: DisabledControls<Partial<TForm>>;
    /** A custom class added to the anchor tag of the group */
    panelClass?: string; 
}

/** Describes the rendering, value and validation of an form control */
export interface DynamicControl<TForm, TProp extends keyof TForm, TFormState extends object | null = null> { 
    /** The type of control */
    type: "control"
    /** The name of the control */
    name: TProp,     
    /** The question component that should be rendered */
    questionComponent?: Type<QuestionComponent>;
    /** The question component view configuration */
    question?: Question<Partial<TFormState> | null>;
    /** Set to true to require a value before the form can be submitted */
    required?: boolean, 
    /** A custom function for formatting the initial value before setting control. */      
    valueFormatter?: ((value: Maybe<Immutable<TForm[TProp]>>) => Maybe<TForm[TProp]>),
    /** Validators for the control value */
    validators?: ValidatorFn[],
    /** Async state validators for the control value  */
    asyncStateValidators?: AsyncStateValidator<Maybe<Partial<TFormState>>>[],
    /** A custom class added to the anchor tag of the question component */
    panelClass?: string; 
}

 /** Describes the data required to display a question in the form */
export interface Question<TFormState extends object | null = null> {
    /** A placeholder value for the field */
    placeholder?: string;
    /** A label describing the field */
    label?: string;
    ariaLabel?: string;
    /** A hint helping the user fill out the field */
    hint?: string;
    /** The color theme of the field */
    color?: "primary" | "accent";
    /** The width of the field. Use css syntax. */
    width?: string;
    /** Used to retrieve a set of options for select questions. Can be a static value or selected from form state */
    optionsGetter?: OptionsGetter<unknown, TFormState>;
}

/** Represents a question component used to display a field to set a form control value. */
export interface QuestionComponent<TQuestion extends Question<object | null> = Question<object | null>> {
    /** The question component view configuration */
    question: Immutable<TQuestion>;
    /** A form group with all the controls of the form */
    form: FormGroup;
    /** Set to true to indicate the question is required. */
    required?: boolean;
    /** The control accociated with the question */
    control: Maybe<AbstractControl>;
    /** An observable emitting true if the question field should be hidden */
    hideField$: Observable<boolean>;
}

//Represents a component rendering multiple questions in a group. 
export interface ControlGroupComponent {
    /** A form group with all the controls of the form */
    form: FormGroup;
    /** The dynamic control group associated with the component */ 
    controlGroup: Immutable<DynamicControlGroup<any, any, any>>;
    /** The names of parent groups.
     *  Used to keep track of where in the form model tree the group is located. */
    nestedNames: string[];
    /** A set of configurable options */
    config: Immutable<DynamicForm<any, any>>

    loadGroupComponents: Function;
}

/** Represents a form component. Implemented by {@link DynamicForm} */
export interface FormComponent<TConfig, TFormState, TResult> {
    /** The form configuration object */
    config: Immutable<Maybe<TConfig>>;
    /** The form state shared by the controls of the form */
    formState: Maybe<Immutable<TFormState>>;
    /** An event emitter that emits the form value when the user submits the form*/
    formSubmitted: EventEmitter<Maybe<TResult>>;
}
