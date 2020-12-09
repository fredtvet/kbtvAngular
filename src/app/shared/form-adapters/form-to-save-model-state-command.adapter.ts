import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { SaveModelStateCommand, SaveModelActionId } from '@model/state/save-model/save-model-action.const';
import { ModelFormToSaveModelInput } from '@shared/model-form';
import { BaseFormToSaveModelStateCommandAdapter } from './base-form-to-save-model-state-command.adapter';

export class FormToSaveModelStateCommandAdapter
    extends BaseFormToSaveModelStateCommandAdapter<Model, Model>
    implements SaveModelStateCommand<Model, ModelState> {

    actionId: string = SaveModelActionId;

    constructor(input: ModelFormToSaveModelInput<Model, ModelState>){
        super(input);
    } 
    
    protected convertFormStateToEntity(): void{
        this.entity = this.input.formValue;
    }
}