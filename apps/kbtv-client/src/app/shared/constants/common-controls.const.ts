import { Validators } from '@angular/forms';
import { Employer, Mission, MissionChild, User } from '@core/models';
import { IAddress } from '@core/models/sub-interfaces/iaddress.interface';
import { IId } from '@core/models/sub-interfaces/iid.interface';
import { IName } from '@core/models/sub-interfaces/iname.interface';
import { StateMissions, StateEmployers, StateUsers } from '@core/state/global-state.interfaces';
import { DynamicControl } from 'dynamic-forms';
import { _compareProp } from '@shared-app/helpers/compare-with-prop.helper';
import { isObjectValidator } from '@shared/validators/is-object.validator';
import { AutoCompleteQuestionComponent } from '../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { GooglePlacesAutoCompleteQuestionComponent, GooglePlacesAutoCompleteQuestion } from '../scam/dynamic-form-questions/google-places-autocomplete-question.component';
import { InputQuestionComponent, InputQuestion } from '../scam/dynamic-form-questions/input-question.component';
import { SelectQuestionComponent, SelectQuestion } from '../scam/dynamic-form-questions/select-question.component';
import { ValidationRules } from './validation-rules.const';
import { Immutable } from 'global-types';
import { ModelFormState } from 'model/form';

export const HiddenIdControl: Immutable<DynamicControl<IId, "id">> = { 
    type: "control", name: "id", required: true,         
}
export const HiddenMissionIdControl: Immutable<DynamicControl<MissionChild, "missionId">> = { 
    type: "control", name: "missionId", required: true,         
}
export const PhoneNumberControl: Immutable<DynamicControl<{phoneNumber: string}, "phoneNumber">> = { 
    type: "control", name: "phoneNumber",
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Kontaktnummer" }, 
    validators: [
        Validators.minLength(ValidationRules.PhoneNumberMinLength), 
        Validators.maxLength(ValidationRules.PhoneNumberMaxLength)
    ] 
}
export const EmailControl: Immutable<DynamicControl<{email: string}, "email">> = { 
    type: "control", name: "email",
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Epost" },  
    validators: [Validators.email] 
}
export const GoogleAddressControl: Immutable<DynamicControl<IAddress, "address">> = {
    type: "control",  name: "address",
    questionComponent: GooglePlacesAutoCompleteQuestionComponent,
    question: <GooglePlacesAutoCompleteQuestion>{
        placeholder: "Adresse", 
        hint: "F.eks. Furuberget 17, 1940 Bjørkelangen",
        resetable: true
    },  
    validators: [Validators.maxLength(ValidationRules.AddressMaxLength)] 
}
export const NameControl: Immutable<DynamicControl<IName, "name">> = {
    type: "control", name: "name",
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Navn"},  
    validators: [Validators.maxLength(ValidationRules.NameMaxLength)] 
}
export const FirstNameControl: Immutable<DynamicControl<{firstName: string}, "firstName">> = {
    type: "control", name: "firstName",
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Fornavn" }, 
}
export const LastNameControl: Immutable<DynamicControl<{lastName: string}, "lastName">> = { 
    type: "control", name: "lastName", 
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Etternavn" }
}
export const MissionAutoCompleteControl: Immutable<DynamicControl<{mission: Mission}, "mission", ModelFormState<StateMissions>>> = {  
    type: "control", name: "mission",
    questionComponent: AutoCompleteQuestionComponent,
    question: <AutoCompleteQuestion<Mission, ModelFormState<StateMissions>>>{
        optionsGetter: (state) => state.options.missions,
        placeholder: "Oppdrag",
        lazyOptions: "all",
        valueFormatter: (val) => val.address,
        displayWith: (mission) => mission ? mission.address : null,
        resetable: true,
        activeFilter: { stringProps: ["address"], maxChecks: 50 }
    }, 
    validators: [isObjectValidator()], 
}
export const EmployerSelectControl: Immutable<DynamicControl<{employer: Employer}, "employer", ModelFormState<StateEmployers>>> = { 
    type: "control",name: "employer",
    questionComponent: SelectQuestionComponent,
    question: <SelectQuestion<Employer, ModelFormState<StateEmployers>>>{
        optionsGetter: (s) => s.options.employers,
        valueFormatter: (val) => val.name,
        compareWith: _compareProp<Employer>("id"),
        lazyOptions: "all",
        placeholder: "Velg oppdragsgiver",
    },  
}
export const UserSelectControl: Immutable<DynamicControl<{user: User}, "user", ModelFormState<StateUsers>>> = { 
    type: "control", name: "user", 
    questionComponent: SelectQuestionComponent,
    question: <SelectQuestion<User, ModelFormState<StateUsers>>>{
        optionsGetter: (state) => state.options.users,
        valueFormatter: (val) => val.firstName + ' ' + val.lastName,
        compareWith: _compareProp<User>("userName"),
        lazyOptions: "all",
        placeholder: "Velg ansatt",
    }, 
} 
export const UserNameControl: Immutable<DynamicControl<{userName: string}, "userName">> = { 
    type: "control", name: "userName",
    question: {placeholder: "Brukernavn"}, 
    questionComponent: InputQuestionComponent,
    validators: [
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(4),
        Validators.maxLength(ValidationRules.NameMaxLength)
    ] 
}