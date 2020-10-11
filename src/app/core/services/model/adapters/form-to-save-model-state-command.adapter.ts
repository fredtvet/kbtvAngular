import { Model } from 'src/app/core/models';
import { BaseFormToSaveModelStateCommandAdapter } from '../abstracts/base-form-to-save-model-state-command.adapter';
import { ModelFormToSaveModelInput } from '../form/interfaces/model-form-to-state-command-adapter.interface';
import { SaveModelAction, SaveModelStateCommand } from '../state/save-model/save-model-state-command.interface';

export class FormToSaveModelStateCommandAdapter<TModel extends Model, TFormState extends TModel> 
    extends BaseFormToSaveModelStateCommandAdapter<TModel, TFormState>
    implements SaveModelStateCommand<TModel> {

    action: string = SaveModelAction;

    constructor(input: ModelFormToSaveModelInput<TFormState>){
        super(input);
    } 
    
    protected convertFormStateToEntity(): void{
        this.entity = this.input.formState;
    }
}