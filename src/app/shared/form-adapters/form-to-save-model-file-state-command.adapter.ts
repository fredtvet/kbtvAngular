import { ModelFile } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { SaveModelFileActionId, SaveModelFileStateCommand } from '@core/state/save-model-file/save-model-file-action.const';
import { ModelFormToSaveModelInput } from '@model-form/interfaces';
import { BaseFormToSaveModelFileStateCommandAdapter } from '@shared/form-adapters/base-form-to-save-model-file-state-command.adapter';


export class FormToSaveModelFileStateCommandAdapter
    extends BaseFormToSaveModelFileStateCommandAdapter<ModelFile, ModelFile & {file: File}> 
    implements SaveModelFileStateCommand<ModelFile, ModelState> {

    actionId: string = SaveModelFileActionId;

    constructor(   
        protected input: ModelFormToSaveModelInput<ModelFile & {file: File}, ModelState> 
    ){
        super(input);
    }

    protected convertFormStateToEntity(): void{
        delete this.input.formValue.file;
        this.entity = this.input.formValue;      
    }

}