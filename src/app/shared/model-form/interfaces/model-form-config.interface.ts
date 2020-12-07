import { DynamicForm } from '@dynamic-forms/interfaces';
import { ModelState } from '@model/interfaces';
import { Prop } from '@shared-app/prop.type';
import { ModelFormToSaveStateCommandAdapter, SaveModelFormState } from './model-form-to-state-command-adapter.interface';

export interface ModelFormConfig<TForm, TFormState extends  SaveModelFormState<Partial<ModelState>>>
{      
    entityId?: any;
    stateProp: Prop<ModelState>;
    dynamicForm: DynamicForm<TForm, TFormState>;
    adapter?: ModelFormToSaveStateCommandAdapter<any>
}