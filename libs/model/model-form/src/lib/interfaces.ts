import { DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { Immutable, Maybe, Prop } from 'global-types';
import { RelationInclude } from 'model/core';
import { ModelCommand, SaveAction } from 'model/state-commands';
import { Observable } from 'rxjs';
import { StateAction } from 'state-management';

/** Represents a function that converts a form value to a state action */
export type Converter<TInput, TOutput> = (input: Immutable<TInput>) => TOutput;

/** The input value passed to converters by the model form when form is submitted.  */
export interface ModelFormResult<TForm extends {}, TState extends {}> {
    /** The actual value of the form */
    formValue: TForm,
    /** Any options used in the form */
    options?: Maybe<Partial<TState>>,
    /** The state property corresponding with the model */
    stateProp: Prop<TState>,
    /** The type of action being handled */
    saveAction: SaveAction,
}

/** Represents a configuration object for a model form */
export interface ModelFormConfig<TState extends object, TForm extends object, TFormState = OptionsFormState<TState>>
{    
    // /** The state property corresponding with the model */
    // stateProp: Prop<TState>;
    /** The form being used */
    dynamicForm: DynamicForm<TForm, TFormState>;
    /** Configure what relational state that will be mapped to entity and included in form state. */
    includes: RelationInclude<TState>
    /** A custom converter used to convert form to a state action. 
     *  Defaults to {@link _formToSaveModelConverter} with form value as entity.  */
    actionConverter?: Converter<ModelFormResult<TForm, TState>, StateAction>
    /** A custom converter used to convert the model to form. Only required on edit. If null, form value is treated as model */
    modelConverter?: Converter<unknown, TForm>
}

/** Represents a configuration object for the model form service. */
export interface ModelFormServiceOptions<TFormState = object> {
    /** Additional form state that should be merged with model state */ 
    formState?: Immutable<TFormState> | Observable<Immutable<TFormState>>,
    /** If set, user will be redirected when saving the model. */
    onSaveUri?: string, 
    /** If set, user will be redirected when deleting the model. */
    onDeleteUri?: string, 
    /** If set to false, the delete option will not be displayed. */
    deleteDisabled?: boolean, 
    /** A custom title for the form sheet. */
    customTitle?: string, 
    /** A callback that gets executed when form is submitted. */
    submitCallback?: (val: ModelCommand.Create | ModelCommand.Update) => void
  }