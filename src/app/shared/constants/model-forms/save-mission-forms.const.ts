import { Validators } from '@angular/forms';
import { Employer, Mission, MissionType } from 'src/app/core/models';
import { DynamicControl, DynamicControlGroup, DynamicForm } from '../../dynamic-form/interfaces';
import { AutoCompleteQuestionComponent } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../dynamic-form/questions/auto-complete-question/auto-complete-question.interface';
import { CheckboxQuestionComponent, CheckboxQuestion } from '../../dynamic-form/questions/checkbox-question.component';
import { GooglePlacesAutoCompleteQuestionComponent, GooglePlacesAutoCompleteQuestion } from '../../dynamic-form/questions/google-places-autocomplete-question.component';
import { InputQuestionComponent, InputQuestion } from '../../dynamic-form/questions/input-question.component';
import { TextAreaQuestionComponent, TextAreaQuestion } from '../../dynamic-form/questions/text-area-question.component';
import { SaveModelFormState } from '../../model-form';

type FormState = SaveModelFormState;

const AddressControl = <DynamicControl<Mission>>{ name: "address", required: true, 
    type: "control", questions: [{
        component:  GooglePlacesAutoCompleteQuestionComponent,
        question: <GooglePlacesAutoCompleteQuestion>{
            placeholder: "Adresse", 
            hint: "F.eks. Furuberget 17, 1940 Bjørkelangen",
            resetable: true
        }, 
    }], 
    validators: [Validators.maxLength(100)] 
}
const PhoneNumberControl = <DynamicControl<Mission>>{ name: "phoneNumber",
    type: "control", questions: [{
        component:  InputQuestionComponent,
        question: <InputQuestion>{placeholder: "Kontaktnummer"}, 
    }], 
    validators: [Validators.minLength(4), Validators.maxLength(12)] 
}
const DescriptionControl = <DynamicControl<Mission>>{ name: "description",
    type: "control", questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse"}, 
    }], 
    validators: [Validators.maxLength(400)] 
}
const EmployerControl = <DynamicControlGroup<Mission>>{ name: "employer",
    type: "group", controls: [
    <DynamicControl<Employer>>{ name: "name",
        valueGetter: (s: Mission) => s.employer?.name, 
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<Employer>>{
                optionsGetter: (state: FormState) => state.foreigns.employers,
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
    <DynamicControl<MissionType>>{ name: "name",
        valueGetter: (s: Mission) => s.missionType?.name, 
        type: "control", questions: [{
            component:  AutoCompleteQuestionComponent,
            question: <AutoCompleteQuestion<MissionType>>{
                optionsGetter: (state: FormState) => state.foreigns.missionTypes,
                placeholder: "Oppdragstype",
                valueProp: "name",
                valueFormatter: (val: MissionType) => val.name, 
                resetable: true,
                activeFilter: { stringProps: ["name"] }
            }, 
        }], 
    }],
}
const FinishedControl = <DynamicControl<Mission>>{ name: "finished",
    valueGetter: (s: Mission) => s.finished, 
    type: "control", questions: [{
        component:  CheckboxQuestionComponent,
        question: <CheckboxQuestion>{   
            text: "Er oppdraget ferdig?", 
        }, 
    }], 
}
const IdControl = <DynamicControl<Mission>>{ name: "id", required: true,
    type: "control", valueGetter: (s: Mission) => s.id,          
}

export const CreateMissionForm: DynamicForm<Mission, FormState> = {
    submitText: "Legg til",
    controls: [
        AddressControl,
        PhoneNumberControl,
        DescriptionControl,
        EmployerControl,
        MissionTypeControl,    
    ]
}

export const EditMissionForm: DynamicForm<Mission, FormState> = {
    submitText: "Oppdater",
    controls: [
        {...AddressControl, valueGetter: (s: Mission) => s.address},
        {...PhoneNumberControl, valueGetter: (s: Mission) => s.phoneNumber},
        {...DescriptionControl, valueGetter: (s: Mission) => s.description},
        EmployerControl,
        MissionTypeControl,    
        FinishedControl,
        IdControl,
    ],
}