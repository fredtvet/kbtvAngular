import { Validators } from '@angular/forms';
import { InboundEmailPassword } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelConverter } from '@shared/action-converters/form-to-save-model.converter';
import { Immutable } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { InputQuestion, InputQuestionComponent } from '../../scam/dynamic-form-questions/input-question.component';

export interface CreateInboundEmailPasswordForm extends Pick<InboundEmailPassword, "password"> {}

export const CreateInboundEmailPasswordModelForm: Immutable<ModelFormConfig<ModelState, CreateInboundEmailPasswordForm, InboundEmailPassword>> = {
    includes: {prop: "inboundEmailPasswords"},
    actionConverter: _formToSaveModelConverter,
    dynamicForm: {
        submitText: "Legg til",
        controls: { 
            password: { type: "control", name: "password", required: true,
                questionComponent: InputQuestionComponent,    
                question: <InputQuestion> { placeholder: "Epostpassord" },
                validators: [Validators.maxLength(250)] 
            } 
        },
    }
}