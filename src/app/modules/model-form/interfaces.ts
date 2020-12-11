import { DynamicForm } from '@dynamic-forms/interfaces';
import { OptionsFormState } from '@form-sheet/interfaces';
import { SaveAction } from '@model/interfaces';
import { Prop } from '@state/interfaces';
import { StateAction } from '@state/state.action';

export type ActionConverter<TInput, TAction extends StateAction> = (input: TInput) => TAction;

export type FormToSaveModelConverter<TForm, TState, TAction extends StateAction> = 
    (input: ModelFormToSaveModelInput<TForm, TState>) => TAction

export interface ModelFormConfig<TState, TForm, TFormState extends OptionsFormState<Partial<TState>>>
{      
    entityId?: any;
    stateProp: Prop<TState>;
    dynamicForm: DynamicForm<TForm, TFormState>;
    actionConverter?: FormToSaveModelConverter<TForm, TState, StateAction>
}

export interface ModelFormToSaveModelInput<TForm, TState> {
    formValue: TForm,
    options?: Partial<TState>,
    stateProp: Prop<TState>,
    saveAction: SaveAction,
}

export interface ModelFormViewConfig<TModel, TState, TForm>{
    entity?: TModel;
    foreigns?: Partial<TState>;
    lockedValues?: Partial<TForm>; 
}