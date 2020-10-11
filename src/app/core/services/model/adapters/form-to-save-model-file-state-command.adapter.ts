import { Model, ModelFile } from 'src/app/core/models';
import { BaseFormToSaveModelFileStateCommandAdapter } from '../abstracts/base-form-to-save-model-file-state-command.adapter';
import { ModelFormToSaveModelInput } from '../form/interfaces/model-form-to-state-command-adapter.interface';
import { SaveModelFileStateCommand, SaveModelFileAction } from '../state/save-model-file/save-model-file-state-command.interface';


export class FormToSaveModelFileStateCommandAdapter<TModel extends Model, TFormState extends TModel & {file: File}> 
    extends BaseFormToSaveModelFileStateCommandAdapter<TModel, TFormState> implements SaveModelFileStateCommand<ModelFile> {

    action: string = SaveModelFileAction;

    constructor(   
        protected input: ModelFormToSaveModelInput<TFormState> 
    ){
        super(input);
    }

    protected convertFormStateToEntity(): void{
        delete this.input.formState.file;
        this.entity = this.input.formState;      
    }

}