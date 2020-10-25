import { ModelFile } from 'src/app/core/models';
import { BaseFormToSaveModelFileStateCommandAdapter } from 'src/app/core/services/model/abstracts/base-form-to-save-model-file-state-command.adapter';
import { SaveModelFileAction, SaveModelFileStateCommand } from 'src/app/core/services/model/state/save-model-file/save-model-file-state-command.interface';
import { ModelFormToSaveModelInput } from '../interfaces/model-form-to-state-command-adapter.interface';

export class FormToSaveModelFileStateCommandAdapter
    extends BaseFormToSaveModelFileStateCommandAdapter<ModelFile, ModelFile & {file: File}> implements SaveModelFileStateCommand<ModelFile> {

    action: string = SaveModelFileAction;

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