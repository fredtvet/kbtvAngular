import { DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { Immutable, Maybe, Prop } from 'global-types';
import { SaveAction } from 'state-model';
import { StateAction } from 'state-management'
import { Observable } from 'rxjs';

/** Represents a function that converts a form value to a state action */
export type ActionConverter<TInput, TAction extends StateAction> = (input: Immutable<TInput>) => TAction;

/** Represents a function that converts a model form input to a state action */
export type FormToSaveModelConverter<TForm extends {}, TState extends {}, TAction extends StateAction> = 
    (input: ModelFormToSaveModelInput<TForm, TState>) => TAction

/** Represents a configuration object for a model form */
export interface ModelFormConfig<TState extends {}, TForm extends {}, TFormState extends OptionsFormState<Partial<TState>>>
{    
    /** The id of the entity being updated. If null, the form will attempt to create the entity on submit */  
    entityId?: unknown;
    /** The state property corresponding with the model */
    stateProp: Prop<TState>;
    /** The form being used */
    dynamicForm: DynamicForm<TForm, TFormState>;
    /** A custom converter used to convert form to a state action. */
    actionConverter?: FormToSaveModelConverter<TForm, TState, StateAction>
}

/** The input value passed to converters by the model form when form is submitted.  */
export interface ModelFormToSaveModelInput<TForm extends {}, TState extends {}> {
    /** The actual value of the form */
    formValue: Immutable<TForm>,
    /** Any options used in the form */
    options?: Maybe<Immutable<Partial<TState>>>,
    /** The state property corresponding with the model */
    stateProp: Prop<TState>,
    /** The type of action being handled */
    saveAction: SaveAction,
}

/** Represents a configuration object for the model form service. */
export interface ModelFormServiceConfig<TState extends {}, TForm extends {}, TFormState extends OptionsFormState<TState>> {
    /** The form config used to configure the form */
    formConfig: ModelFormConfig<TState, TForm, TFormState>, 
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
    submitCallback?: (val: unknown) => void
  }