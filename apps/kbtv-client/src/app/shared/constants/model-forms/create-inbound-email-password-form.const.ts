import { Validators } from '@angular/forms';
import { InboundEmailPassword } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _formToSaveModelConverter } from '@shared/action-converters/form-to-save-model.converter';
import { DynamicControl, DynamicForm } from 'dynamic-forms';
import { Immutable, UnknownState } from 'global-types';
import { ModelFormConfig } from 'model/form';
import { InputQuestionComponent, InputQuestion } from '../../scam/dynamic-form-questions/input-question.component';

const PasswordControl = <Immutable<DynamicControl<InboundEmailPassword>>>{ name: "password", required: true,
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Epostpassord"}, 
    }], 
    validators: [Validators.maxLength(250)] 
}

export const CreateInboundEmailPasswordModelForm: Immutable<ModelFormConfig<ModelState, InboundEmailPassword>> = {
    includes: {prop: "inboundEmailPasswords"},
    actionConverter: _formToSaveModelConverter,
    dynamicForm: {
        submitText: "Legg til",
        controls: [PasswordControl],
    }
}