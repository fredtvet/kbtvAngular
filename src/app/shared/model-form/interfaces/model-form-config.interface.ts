import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { ModelState } from 'src/app/model/interfaces';
import { Prop } from 'src/app/shared-app/prop.type';
import { ModelFormToSaveStateCommandAdapter, SaveModelFormState } from './model-form-to-state-command-adapter.interface';

export interface ModelFormConfig<TForm, TFormState extends  SaveModelFormState<Partial<ModelState>>>
{      
    entityId?: any;
    stateProp: Prop<ModelState>;
    dynamicForm: DynamicForm<TForm, TFormState>;
    adapter?: ModelFormToSaveStateCommandAdapter<any>
}