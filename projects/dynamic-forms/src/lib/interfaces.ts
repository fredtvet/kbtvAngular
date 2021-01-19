import { EventEmitter, Type } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { Immutable, ImmutableArray, Maybe } from 'global-types';
import { Observable } from 'rxjs';

/** Represents a function that converts an error to a readable error message */
export type ErrorDisplayFn = (err: unknown) => string;

/** Represents a map of validation errors with accociated {@link ErrorDisplayFn} 
 *  Provided with the token {@link VALIDATION_ERROR_MESSAGES} */
export interface ValidationErrorMap { [key: string]: ErrorDisplayFn }

/** Represents a map of controls that should be disabled */
export type DisabledControls<T> = { [key in keyof Partial<T>]: boolean };

/** Represents a object for hooking onto a controls value changes. */
export interface ControlHook<TResponse>{
    /** The name of the control(s) */
    controlName: string | string[], 
    /** The function being called when the control(s) value changes. */
    callback: (val: unknown) => TResponse
}

/** Represents a getter function that returns an array of options from provided state
 *  Can also can the options directly. */
export type OptionsGetter<T> = T[] | ((state: Immutable<unknown>) => ImmutableArray<T>);

/** Describes a form that can render dynamically with the {@link DynamicFormComponent}
 *  Creates a reactive form with visible fields to change the values of the form. 
 *  @see {@link https://angular.io/guide/reactive-forms} */
export interface DynamicForm<TForm, TFormState>{
    /** The initial form value */
    initialValue?: Maybe<Immutable<Partial<TForm>>>;
    /** A custom text on the submit button */
    submitText?: string;
    /** The form controls that make up the form */
    controls: (DynamicControlGroup<TForm, TFormState> | DynamicControl<TForm, TFormState>)[];
    /** A function that modifies the form value when submitted */
    onSubmitFormatter?: (f: TForm, s: Immutable<TFormState>) => Immutable<TForm>;
    /** Set to true to get the raw form value on submit. 
     * This includes the values of disabled controls. */
    getRawValue?: boolean;
    /** A map of controls that should be disabled by default */
    disabledControls?: DisabledControls<TForm>;
    /** Set to true if disabled controls shouldn't be rendered. */
    noRenderDisabledControls?: boolean;
    /** Validators for the form on submit */
    validators?: ValidatorFn[];
    /** Set to true if the form should have a reset option */
    resettable?: boolean;
    /** The form value that will be set on reset */
    resetState?: Partial<TForm>;
    /** Should the form require the user to be online before submitting? */
    onlineRequired?: boolean;
}

/** Describes a group of controls that make up an object in the form model */
export interface DynamicControlGroup<TForm, TFormState = unknown> {
    /** The type of control */
    type: "group",
    /** The name of the control group */
    name?: Extract<keyof TForm, string>, 
    /** The controls belonging to the group */
    controls: (DynamicControl<TForm, TFormState> | DynamicControlGroup<TForm, TFormState>)[],  
    /** A custom control group component for displaying the group */
    controlGroupComponent?: Type<ControlGroupComponent>,
    /** A visual label displayed above the group on the rendered form */
    label?: string,
    /** Custom stylings for the group */
    styling?: DynamicControlGroupStyling,
    /** {@inheritDoc DynamicForm.disabledControls} */
    disabledControls?: DisabledControls<TForm>;
}

/** Describes the rendering, value and validation of an form control */
export interface DynamicControl<TForm, TFormState = {}> { 
    /** The type of control */
    type: "control"
    /** The name of the control */
    name: Extract<keyof TForm, string>, 
    /** Set to true to require a value before the form can be submitted */
    required?: boolean, 
    /** The value of the control either as static value or a function of form value */      
    valueGetter?: ((form: Immutable<TForm>) => unknown) | unknown,
    /** The questions that can set the control value */
    questions?: QuestionWrapper[],
    /** Validators for the control value */
    validators?: ValidatorFn[],
    /** Async state validators for the control value  */
    asyncStateValidators?: AsyncStateValidator<unknown>[],
}

/** Represents an async validator that reacts to an observer of state T */
export type AsyncStateValidator<T> = ((state$: Observable<T>) => AsyncValidatorFn);

/** Describes the different stylings options available for {@link DynamicControlGroup} */
export interface DynamicControlGroupStyling {
    /** A custom class added to the anchor tag of the component */
    panelClass: string; 
    /** The margin applied to questions in the group. Use regular css margin syntax. */
    itemMargin?: string;
    /** The flex layout type for the group. 
     * @see {@link https://github.com/angular/flex-layout} */
    fxLayout?: "row" | "column";
    /** The flex alignments for the group. Check fxLayout
     * @see {@link https://github.com/angular/flex-layout} */
    fxLayoutAlign?: string;
}

/** Describes a wrapper for a question component with additional information */
export interface QuestionWrapper {
    /** The component that should be rendered */
    component: Type<QuestionComponent>;
    /** The question component view configuration */
    question: Question;
    /** If set the question will be hidden when the hook returns true. */
    hideOnValueChange?: ControlHook<boolean>;
}

 /** Describes the data required to display a question in the form */
export interface Question {
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
}

/** Represents a question component used to display a field to set a form control value. */
export interface QuestionComponent {
    /** The question component view configuration */
    question: Immutable<Question>;
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
    controlGroup: Immutable<DynamicControlGroup<{}>>;
    /** The dynamic form configuration  */
    formConfig: Immutable<DynamicForm<{}, {}>>;
    /** The names of parent groups.
     *  Used to keep track of where in the form model tree the group is located. */
    nestedNames: string[];
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
