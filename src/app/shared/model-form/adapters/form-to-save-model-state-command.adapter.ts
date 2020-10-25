import { Model } from 'src/app/core/models';
import { BaseFormToSaveModelStateCommandAdapter } from 'src/app/core/services/model/abstracts/base-form-to-save-model-state-command.adapter';
import { SaveModelAction, SaveModelStateCommand } from 'src/app/core/services/model/state/save-model/save-model-state-command.interface';
import { ModelFormToSaveModelInput } from '../interfaces/model-form-to-state-command-adapter.interface';

export class FormToSaveModelStateCommandAdapter<TModel extends Model> 
    extends BaseFormToSaveModelStateCommandAdapter<TModel, TModel>
    implements SaveModelStateCommand<TModel> {

    action: string = SaveModelAction;

    constructor(input: ModelFormToSaveModelInput<TModel>){
        super(input);
    } 
    
    protected convertFormStateToEntity(): void{
        this.entity = this.input.formState;
    }
}