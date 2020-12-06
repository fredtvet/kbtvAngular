import { ModelFile } from 'src/app/core/models';
import { ModelFormToSaveModelInput } from 'src/app/shared/model-form/interfaces/model-form-to-state-command-adapter.interface';
import { ModelFileWrapper } from '../model-file.wrapper';
import { SaveModelFileStateCommand } from '../state/save-model-file/save-model-file-action.const';
import { BaseFormToSaveModelStateCommandAdapter } from './base-form-to-save-model-state-command.adapter';


export abstract class BaseFormToSaveModelFileStateCommandAdapter<TModel extends ModelFile, TFormState extends {file: File}> 
    extends BaseFormToSaveModelStateCommandAdapter<TModel, TFormState> implements SaveModelFileStateCommand<ModelFile> {

    fileWrapper: ModelFileWrapper;
    actionId: string;

    constructor(   
        protected input: ModelFormToSaveModelInput<TFormState>
    ){
        super(input);
    }
    
    protected adapt(): void{
        const file = this.input.formState.file;
        super.adapt();
        // var fileId = Math.floor(Math.random() * 100).toString() + command.entity.id;
        this.fileWrapper = 
            new ModelFileWrapper(file, this.entity[this.modelConfig.identifier] as any);
    }
}