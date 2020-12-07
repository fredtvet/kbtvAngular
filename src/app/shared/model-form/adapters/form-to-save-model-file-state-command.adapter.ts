import { ModelFile } from '@core/models';
import { BaseFormToSaveModelFileStateCommandAdapter } from '@model/abstracts/base-form-to-save-model-file-state-command.adapter';
import { SaveModelFileStateCommand, SaveModelFileActionId } from '@model/state/save-model-file/save-model-file-action.const';
import { ModelFormToSaveModelInput } from '../interfaces/model-form-to-state-command-adapter.interface';

export class FormToSaveModelFileStateCommandAdapter
    extends BaseFormToSaveModelFileStateCommandAdapter<ModelFile, ModelFile & {file: File}> implements SaveModelFileStateCommand<ModelFile> {

    actionId: string = SaveModelFileActionId;

    constructor(   
        protected input: ModelFormToSaveModelInput<ModelFile & {file: File}> 
    ){
        super(input);
    }

    protected convertFormStateToEntity(): void{
        delete this.input.formState.file;
        this.entity = this.input.formState;      
    }

}