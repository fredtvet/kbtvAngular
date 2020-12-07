import { Model } from '@core/models';
import { BaseFormToSaveModelStateCommandAdapter } from '@model/abstracts/base-form-to-save-model-state-command.adapter';
import { SaveModelStateCommand, SaveModelActionId } from '@model/state/save-model/save-model-action.const';
import { ModelFormToSaveModelInput } from '../interfaces/model-form-to-state-command-adapter.interface';

export class FormToSaveModelStateCommandAdapter<TModel extends Model> 
    extends BaseFormToSaveModelStateCommandAdapter<TModel, TModel>
    implements SaveModelStateCommand<TModel> {

    actionId: string = SaveModelActionId;

    constructor(input: ModelFormToSaveModelInput<TModel>){
        super(input);
    } 
    
    protected convertFormStateToEntity(): void{
        this.entity = this.input.formState;
    }
}