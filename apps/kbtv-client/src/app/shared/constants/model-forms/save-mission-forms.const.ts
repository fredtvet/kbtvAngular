import { Validators } from '@angular/forms';
import { Employer, Mission, MissionType } from '@core/models';
import { StateEmployers, StateMissionTypes } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { _googleAddressFormatter } from '@shared-app/helpers/google-address-formatter.helper';
import { _missionFormActionConverter } from '@shared/action-converters/mission-form-to-save-model.converter';
import { DynamicControl } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { Converter, ModelFormConfig, ModelFormState } from 'model/form';
import { AutoCompleteQuestionComponent } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { CheckboxQuestion, CheckboxQuestionComponent } from '../../scam/dynamic-form-questions/checkbox-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../scam/dynamic-form-questions/text-area-question.component';
import { GoogleAddressControl, HiddenIdControl, PhoneNumberControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

export interface CreateMissionForm extends Pick<Mission, "address" | "phoneNumber" | "description"> {
    employerName?: string,
    missionTypeName?: string
}

export interface UpdateMissionForm extends CreateMissionForm, Pick<Mission, "id" | "finished"> {}

type FormState = ModelFormState<StateEmployers & StateMissionTypes>;

const DescriptionControl: Immutable<DynamicControl<CreateMissionForm, "description", FormState>> = { 
    type: "control", name: "description", 
    questionComponent: TextAreaQuestionComponent,
    question: <TextAreaQuestion>{placeholder: "Beskrivelse"}, 
    validators: [Validators.maxLength(ValidationRules.MissionDescriptionMaxLength)] 
}

const EmployerControl: Immutable<DynamicControl<CreateMissionForm, "employerName", FormState>> = { 
    type: "control", name: "employerName",
    questionComponent: AutoCompleteQuestionComponent,
    question: <AutoCompleteQuestion<Employer, FormState>>{
        optionsGetter: (state) => state.options.employers,
        placeholder: "Oppdragsgiver",
        valueProp: "name",
        lazyOptions: "all",
        valueFormatter: (val) => val.name, 
        resetable: true,
        activeFilter: { stringProps: ["name"] }
    },  
}

const MissionTypeControl: Immutable<DynamicControl<CreateMissionForm, "missionTypeName", FormState>> = { 
    type: "control", name: "missionTypeName",
    questionComponent: AutoCompleteQuestionComponent,
    question: <AutoCompleteQuestion<MissionType, FormState>>{
        optionsGetter: (state) => state.options.missionTypes,
        placeholder: "Oppdragstype",
        valueProp: "name",
        lazyOptions: "all",
        valueFormatter: (val) => val.name, 
        resetable: true,
        activeFilter: { stringProps: ["name"] }
    } 
}

const FinishedControl: Immutable<DynamicControl<UpdateMissionForm, "finished", FormState>> = { 
    type: "control", name: "finished",
    questionComponent: CheckboxQuestionComponent,
    question: <CheckboxQuestion>{ text: "Er oppdraget ferdig?" }, 
}

const _missionToMissionFormConverter: Converter<Mission, CreateMissionForm> = ({missionType, employer, ...rest}) => { 
    return {...rest, employerName: employer?.name, missionTypeName: missionType?.name }
}

export const CreateMissionModelForm: Immutable<ModelFormConfig<ModelState, CreateMissionForm, Mission, FormState>> = {
    includes: {prop: "missions", foreigns: "all"},
    actionConverter: _missionFormActionConverter,
    modelConverter: _missionToMissionFormConverter,
    dynamicForm: {
        submitText: "Legg til",
        controls: {
            address: {...GoogleAddressControl, required: true},
            phoneNumber: PhoneNumberControl,
            description: DescriptionControl,
            employerName: EmployerControl,
            missionTypeName: MissionTypeControl,    
        },
        onSubmitFormatter: _googleAddressFormatter
    }
}

export const EditMissionModelForm: Immutable<ModelFormConfig<ModelState, UpdateMissionForm, Mission, FormState>> = {
    includes: {prop: "missions", foreigns: "all"},
    actionConverter: _missionFormActionConverter,
    modelConverter: _missionToMissionFormConverter,
    dynamicForm: {
        submitText: "Oppdater",
        controls: {
            address: {...GoogleAddressControl, required: true},
            phoneNumber: PhoneNumberControl,
            description: DescriptionControl,
            employerName: EmployerControl,
            missionTypeName: MissionTypeControl,   
            finished: FinishedControl,
            id: HiddenIdControl, 
        },
        onSubmitFormatter: _googleAddressFormatter
    }
}