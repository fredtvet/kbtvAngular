import { Validators } from '@angular/forms';
import { Employer, Mission, MissionType } from '@core/models';
import { StateEmployers, StateMissionTypes } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { _googleAddressFormatter } from '@shared-app/helpers/google-address-formatter.helper';
import { _missionFormActionConverter } from '@shared/action-converters/mission-form-to-save-model.converter';
import { DynamicControl, _formStateBinding } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { Converter, ModelFormConfig } from 'model/form';
import { AutoCompleteQuestionComponent } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { CheckboxQuestion, CheckboxQuestionComponent } from '../../scam/dynamic-form-questions/checkbox-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../scam/dynamic-form-questions/text-area-question.component';
import { GoogleAddressControl, PhoneNumberControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

export interface CreateMissionForm extends Pick<Mission, "address" | "phoneNumber" | "description"> {
    employerName?: string,
    missionTypeName?: string
}

export interface UpdateMissionForm extends CreateMissionForm, Pick<Mission, "id" | "finished"> {}

type FormState = StateEmployers & StateMissionTypes;

const DescriptionControl: Immutable<DynamicControl<string, FormState>> = { 
    questionComponent: TextAreaQuestionComponent,
    question: <TextAreaQuestion>{placeholder: "Beskrivelse"}, 
    validators: [Validators.maxLength(ValidationRules.MissionDescriptionMaxLength)] 
}

const EmployerControl: Immutable<DynamicControl<string, FormState>> = { 
    questionComponent: AutoCompleteQuestionComponent,
    question: <AutoCompleteQuestion<Employer, FormState>>{
        placeholder: "Oppdragsgiver",
        valueProp: "name",
        lazyOptions: "all",
        valueFormatter: (val) => val.name, 
        resetable: true,
        activeFilter: { stringProps: ["name"] },
        stateBindings:{ options: _formStateBinding<FormState, Employer[]>()(["employers"], s => s.employers || []) }
    },  
}

const MissionTypeControl: Immutable<DynamicControl<string, FormState>> = { 
    questionComponent: AutoCompleteQuestionComponent,
    question: <AutoCompleteQuestion<MissionType, FormState>>{
        placeholder: "Oppdragstype",
        valueProp: "name",
        lazyOptions: "all",
        valueFormatter: (val) => val.name, 
        resetable: true,
        activeFilter: { stringProps: ["name"] },
        stateBindings:{ options: _formStateBinding<FormState, MissionType[]>()(["missionTypes"], s => s.missionTypes || []) }
    } 
}

const FinishedControl: Immutable<DynamicControl<boolean, FormState>> = { 
    questionComponent: CheckboxQuestionComponent,
    question: <CheckboxQuestion>{ text: "Er oppdraget ferdig?" }, 
}

const _missionToMissionFormConverter: Converter<Mission, CreateMissionForm> = ({missionType, employer, ...rest}) => { 
    return {...rest, employerName: employer?.name, missionTypeName: missionType?.name }
}

export const CreateMissionModelForm: Immutable<ModelFormConfig<ModelState, Mission, CreateMissionForm, FormState>> = {
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

export const EditMissionModelForm: Immutable<ModelFormConfig<ModelState, Mission, UpdateMissionForm, FormState>> = {
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
            id: { required: true, questionComponent: null }, 
        },
        onSubmitFormatter: _googleAddressFormatter
    }
}