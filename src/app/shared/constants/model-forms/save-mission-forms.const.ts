import { Validators } from '@angular/forms';
import { Employer, Mission, MissionType } from 'src/app/core/models';
import { StateEmployers, StateMissionTypes } from 'src/app/core/services/state/interfaces';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { AutoCompleteQuestionComponent } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../components/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { CheckboxQuestionComponent, CheckboxQuestion } from '../../components/dynamic-form-questions/checkbox-question.component';
import { TextAreaQuestionComponent, TextAreaQuestion } from '../../components/dynamic-form-questions/text-area-question.component';
import { SaveModelFormState } from '../../model-form';
import { GoogleAddressControl, HiddenIdControl, PhoneNumberControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

type FormState = SaveModelFormState<StateEmployers & StateMissionTypes>;

const DescriptionControl = <DynamicControl<Mission, any>>{ name: "description",
    type: "control", questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse"}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionDescriptionMaxLength)] 
}
const EmployerControl = <DynamicControlGroup<Mission>>{ name: "employer",
    type: "group", controls: [
    <DynamicControl<Employer, FormState>>{ name: "name",
        valueGetter: (s: Mission) => s.employer?.name, 
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<Employer>>{
                optionsGetter: (state: FormState) => state.options.employers,
                placeholder: "Oppdragsgiver",
                valueProp: "name",
                valueFormatter: (val: Employer) => val.name, 
                resetable: true,
                activeFilter: { stringProps: ["name"] }
            }, 
        }], 
    }],
}
const MissionTypeControl = <DynamicControlGroup<Mission>>{ name: "missionType",
    type: "group", controls: [
    <DynamicControl<MissionType, FormState>>{ name: "name",
        valueGetter: (s: Mission) => s.missionType?.name, 
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<MissionType>>{
                optionsGetter: (state: FormState) => state.options.missionTypes,
                placeholder: "Oppdragstype",
                valueProp: "name",
                valueFormatter: (val: MissionType) => val.name, 
                resetable: true,
                activeFilter: { stringProps: ["name"] }
            }, 
        }], 
    }],
}
const FinishedControl = <DynamicControl<Mission, any>>{ name: "finished",
    valueGetter: (s: Mission) => s.finished, 
    type: "control", questions: [{
        component:  CheckboxQuestionComponent,
        question: <CheckboxQuestion>{   
            text: "Er oppdraget ferdig?", 
        }, 
    }], 
}

export const CreateMissionForm: DynamicForm<Mission, FormState> = {
    submitText: "Legg til",
    controls: [
        {...GoogleAddressControl, required: true},
        PhoneNumberControl,
        DescriptionControl,
        EmployerControl,
        MissionTypeControl,    
    ]
}

export const EditMissionForm: DynamicForm<Mission, FormState> = {
    submitText: "Oppdater",
    controls: [
        ...CreateMissionForm.controls,   
        FinishedControl,
        HiddenIdControl,
    ],
}