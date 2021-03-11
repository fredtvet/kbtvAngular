import { Validators } from '@angular/forms';
import { Employer, Mission, MissionType } from '@core/models';
import { StateEmployers, StateMissionTypes } from '@core/state/global-state.interfaces';
import { _googleAddressFormatter } from '@shared-app/helpers/google-address-formatter.helper';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { Immutable } from 'global-types';
import { AutoCompleteQuestionComponent } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { CheckboxQuestion, CheckboxQuestionComponent } from '../../components/dynamic-form-questions/checkbox-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../components/dynamic-form-questions/text-area-question.component';
import { GoogleAddressControl, HiddenIdControl, PhoneNumberControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

type FormState = OptionsFormState<StateEmployers & StateMissionTypes>;

const DescriptionControl: Immutable<DynamicControl<Mission, FormState>> = { name: "description",
    type: "control", questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse"}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionDescriptionMaxLength)] 
}

const EmployerControl: Immutable<DynamicControlGroup<Mission, FormState, Employer>> = { name: "employer",
    type: "group", controls: [
    { name: "name",
        valueGetter: (s: Mission) => s.employer?.name, 
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<Employer>>{
                optionsGetter: (state: FormState) => state.options?.employers,
                placeholder: "Oppdragsgiver",
                valueProp: "name",
                valueFormatter: (val: Employer) => val.name, 
                resetable: true,
                activeFilter: { stringProps: ["name"] }
            }, 
        }], 
    }],
}

const MissionTypeControl: Immutable<DynamicControlGroup<Mission, FormState, MissionType>> = { name: "missionType",
    type: "group", controls: [
    { name: "name",
        valueGetter: (s: Mission) => s.missionType?.name, 
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<MissionType>>{
                optionsGetter: (state: FormState) => state.options?.missionTypes,
                placeholder: "Oppdragstype",
                valueProp: "name",
                valueFormatter: (val: MissionType) => val.name, 
                resetable: true,
                activeFilter: { stringProps: ["name"] }
            }, 
        }], 
    }],
}

const FinishedControl: Immutable<DynamicControl<Mission, FormState>> = { name: "finished",
    valueGetter: (s: Mission) => s.finished, 
    type: "control", questions: [{
        component:  CheckboxQuestionComponent,
        question: <CheckboxQuestion>{   
            text: "Er oppdraget ferdig?", 
        }, 
    }], 
}

export const CreateMissionForm: Immutable<DynamicForm<Mission, FormState>> = {
    submitText: "Legg til",
    controls: [
        {...GoogleAddressControl, required: true},
        PhoneNumberControl,
        DescriptionControl,
        EmployerControl,
        MissionTypeControl,    
    ],
    onSubmitFormatter: _googleAddressFormatter
}

export const EditMissionForm: Immutable<DynamicForm<Mission, FormState>> = {
    submitText: "Oppdater",
    controls: [
        ...CreateMissionForm.controls,   
        FinishedControl,
        HiddenIdControl,
    ],
    onSubmitFormatter: _googleAddressFormatter
}