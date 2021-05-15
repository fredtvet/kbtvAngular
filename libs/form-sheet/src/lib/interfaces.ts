import { Type } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DynamicForm, FormComponent } from 'dynamic-forms';
import { Immutable, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { FormSheetWrapperComponent } from './form-sheet-wrapper.component';

/** Represents the configuration for {@link FormSheetWrapperComponent} */
export interface FormSheetWrapperConfig<TFormConfig, TInputState extends object| null, TResult>{
    /** The form config passed to the provided form component */
    formConfig?: Maybe<TFormConfig>;
    /** Form state required by the form */
    formState$?: Observable<Maybe<Immutable<TInputState>>>;
    /** Configuration for the top navigation bar on bottom sheet */
    navConfig?: Maybe<FormSheetNavConfig>;
    /** Function that executes when form is submitted. */
    submitCallback?: Maybe<(val: TResult) => void>;
    /** The form component that should be rendered. */
    formComponent: Type<FormComponent<TFormConfig, TInputState, TResult>>;
}

/** Represents configuration for opening a form with {@link FormService} */
export interface FormServiceConfig<TForm extends object, TFormState extends object| null = null>{
    /** The form config passed to the provided form component */
    formConfig: DynamicForm<TForm, TFormState>, 
    /** Configuration for the top navigation bar on bottom sheet */
    navConfig: FormSheetNavConfig,
    /** Form state required by the form */
    formState?: Immutable<Partial<TFormState>> | Observable<Immutable<Partial<TFormState>>>,
    /** Function that executes when form is submitted. */
    submitCallback?: (val: Immutable<TForm>) => void
}

/**  Represents a configuration object for the top navigation bar on the form sheet */
export interface FormSheetNavConfig {
    title: string;
    /** Buttons to be rendered on the top right of the nav bar */
    buttons?: FormSheetNavButton[];
}

/** Represents a button used in the form sheet navigation bar.  */
export interface FormSheetNavButton{
    /** The material icon representing the button */
    icon: string;
    /** The function thats being called on button click */
    callback: (ref: MatBottomSheetRef<FormSheetWrapperComponent, unknown>) => void;
    /** The color of the button */
    color?: "primary" | "accent" | "warn"; 
    /** A description of the button's function */
    aria?: string;
}