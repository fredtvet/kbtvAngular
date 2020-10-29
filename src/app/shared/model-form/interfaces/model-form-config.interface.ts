import { ModelState } from 'src/app/core/services/model/interfaces/model-state.interface';
import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { Prop } from 'src/app/shared-app/prop.type';
import { ModelFormToSaveStateCommandAdapter, SaveModelFormState } from './model-form-to-state-command-adapter.interface';

export interface ModelFormConfig<TForm, TFormState extends  SaveModelFormState<Partial<ModelState>>>
{      
    entityId?: any;
    stateProp: Prop<ModelState>;
    dynamicForm: DynamicForm<TForm, TFormState>;
    adapter?: ModelFormToSaveStateCommandAdapter<any>
}