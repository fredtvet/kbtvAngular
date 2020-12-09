import { ModelFile } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { SaveModelFileStateCommand } from '@core/state/save-model-file/save-model-file-action.const';
import { ModelFormToSaveModelInput } from '@model-form/interfaces';
import { ModelFileWrapper } from '../../modules/model/model-file.wrapper';
import { BaseFormToSaveModelStateCommandAdapter } from './base-form-to-save-model-state-command.adapter';

export abstract class BaseFormToSaveModelFileStateCommandAdapter<TModel extends ModelFile, TForm extends {file: File}> 
    extends BaseFormToSaveModelStateCommandAdapter<TModel, TForm> implements SaveModelFileStateCommand<ModelFile, ModelState> {

    fileWrapper: ModelFileWrapper;
    actionId: string;

    constructor(   
        protected input: ModelFormToSaveModelInput<TForm, ModelState>
    ){
        super(input);
    }
    
    protected adapt(): void{
        const file = this.input.formValue.file;
        super.adapt();
        // var fileId = Math.floor(Math.random() * 100).toString() + command.entity.id;
        this.fileWrapper = 
            new ModelFileWrapper(file, this.entity[this.modelConfig.identifier] as any);
    }
}