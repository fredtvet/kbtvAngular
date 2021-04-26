import { Validators } from '@angular/forms';
import { Employer, Mission, MissionType } from '@core/models';
import { IAddress } from '@core/models/sub-interfaces/iaddress.interface';
import { StateEmployers, StateMissionTypes } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { _googleAddressFormatter } from '@shared-app/helpers/google-address-formatter.helper';
import { _formToSaveModelConverter } from '@shared/action-converters/form-to-save-model.converter';
import { _find } from 'array-helpers';
import { DynamicControl, DynamicControlGroup, DynamicForm } from 'dynamic-forms';
import { OptionsFormState } from 'form-sheet';
import { Immutable } from 'global-types';
import { Converter, ModelFormConfig, ModelFormResult } from 'model/form';
import { SaveModelAction } from 'model/state-commands';
import { AutoCompleteQuestionComponent } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { CheckboxQuestion, CheckboxQuestionComponent } from '../../scam/dynamic-form-questions/checkbox-question.component';
import { TextAreaQuestion, TextAreaQuestionComponent } from '../../scam/dynamic-form-questions/text-area-question.component';
import { GoogleAddressControl, HiddenIdControl, PhoneNumberControl } from '../common-controls.const';
import { ValidationRules } from '../validation-rules.const';

export interface CreateMissionForm extends IAddress {
    address?: string,
    phoneNumber?: string,
    description?: string,
    employerName?: string,
    missionTypeName?: string
}
export interface UpdateMissionForm extends CreateMissionForm {
    finished?: boolean;
    id?: string;
}
type FormState = OptionsFormState<StateEmployers & StateMissionTypes>;

const DescriptionControl: Immutable<DynamicControl<CreateMissionForm, FormState>> = { name: "description",
    type: "control", questions: [{
        component:  TextAreaQuestionComponent,
        question: <TextAreaQuestion>{placeholder: "Beskrivelse"}, 
    }], 
    validators: [Validators.maxLength(ValidationRules.MissionDescriptionMaxLength)] 
}

const EmployerControl: Immutable<DynamicControl<CreateMissionForm, FormState>> = { name: "employerName",
    valueGetter: (s: Immutable<CreateMissionForm>) => s.employerName, 
    type: "control", questions: [{
        component:  AutoCompleteQuestionComponent,
        question: <AutoCompleteQuestion<Employer>>{
            optionsGetter: (state: FormState) => state.options?.employers,
            placeholder: "Oppdragsgiver",
            valueProp: "name",
            lazyOptions: "all",
            valueFormatter: (val: Employer) => val.name, 
            resetable: true,
            activeFilter: { stringProps: ["name"] }
        }, 
    }], 
}

const MissionTypeControl: Immutable<DynamicControl<CreateMissionForm, FormState>> = { name: "missionTypeName",
    valueGetter: (s: Immutable<CreateMissionForm>) => s.missionTypeName, 
    type: "control", questions: [{
        component:  AutoCompleteQuestionComponent,
        question: <AutoCompleteQuestion<MissionType>>{
            optionsGetter: (state: FormState) => state.options?.missionTypes,
            placeholder: "Oppdragstype",
            valueProp: "name",
            lazyOptions: "all",
            valueFormatter: (val: MissionType) => val.name, 
            resetable: true,
            activeFilter: { stringProps: ["name"] }
        }, 
    }], 
}

const FinishedControl: Immutable<DynamicControl<UpdateMissionForm, FormState>> = { name: "finished",
    valueGetter: (s: Mission) => s.finished, 
    type: "control", questions: [{
        component:  CheckboxQuestionComponent,
        question: <CheckboxQuestion>{   
            text: "Er oppdraget ferdig?", 
        }, 
    }], 
}

const _missionFormActionConverter: Converter<ModelFormResult<CreateMissionForm, ModelState>, SaveModelAction<Mission, ModelState>> = 
    (input) => {      
        const {employerName, missionTypeName, ...rest} = input.formValue;

        let mission: Partial<Mission> = rest;

        const existingEmployer = (!employerName || !input.options?.employers) ?  null :
            _find(input.options.employers, employerName, "name");

        if(existingEmployer) mission.employerId = existingEmployer.id;
        else if(employerName) mission.employer = {name: employerName}

        const existingType = (!missionTypeName || !input.options?.missionTypes) ?  null :
            _find(input.options.missionTypes, missionTypeName, "name");

        if(existingType) mission.missionTypeId = existingType.id;
        else if(missionTypeName) mission.missionType = {name: missionTypeName}
        console.log(mission);
        return _formToSaveModelConverter({...input, formValue: mission})
    }

const _missionToMissionFormConverter: Converter<Mission, CreateMissionForm> = ({missionType, employer, ...rest}) => { 
    return {...rest, employerName: employer?.name, missionTypeName: missionType?.name }
}

export const CreateMissionModelForm: Immutable<ModelFormConfig<ModelState, CreateMissionForm, FormState>> = {
    includes: {prop: "missions", foreigns: "all"},
    actionConverter: _missionFormActionConverter,
    modelConverter: _missionToMissionFormConverter,
    dynamicForm: {
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
}

export const EditMissionModelForm: Immutable<ModelFormConfig<ModelState, UpdateMissionForm, FormState>> = {
    includes: {prop: "missions", foreigns: "all"},
    actionConverter: _missionFormActionConverter,
    modelConverter: _missionToMissionFormConverter,
    dynamicForm: {
        submitText: "Oppdater",
        controls: [
            ...CreateMissionModelForm.dynamicForm.controls,   
            FinishedControl,
            HiddenIdControl,
        ],
        onSubmitFormatter: _googleAddressFormatter
    }
}