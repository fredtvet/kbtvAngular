import { Validators } from '@angular/forms';
import { Employer, Mission, User } from '@core/models';
import { StateEmployers, StateMissions, StateUsers } from '@core/state/global-state.interfaces';
import { _compareProp } from '@shared-app/helpers/compare-with-prop.helper';
import { isObjectValidator } from '@shared/validators/is-object.validator';
import { DynamicControl, _formStateBinding } from 'dynamic-forms';
import { Immutable } from 'global-types';
import { AutoCompleteQuestionComponent } from '../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.component';
import { AutoCompleteQuestion } from '../scam/dynamic-form-questions/auto-complete-question/auto-complete-question.interface';
import { GooglePlacesAutoCompleteQuestion, GooglePlacesAutoCompleteQuestionComponent } from '../scam/dynamic-form-questions/google-places-autocomplete-question.component';
import { InputQuestion, InputQuestionComponent } from '../scam/dynamic-form-questions/input-question.component';
import { SelectQuestion, SelectQuestionComponent } from '../scam/dynamic-form-questions/select-question.component';
import { ValidationRules } from './validation-rules.const';

export const PhoneNumberControl: Immutable<DynamicControl<string>> = { 
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Kontaktnummer" }, 
    validators: [
        Validators.minLength(ValidationRules.PhoneNumberMinLength), 
        Validators.maxLength(ValidationRules.PhoneNumberMaxLength)
    ] 
}
export const EmailControl: Immutable<DynamicControl<string>> = { 
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Epost" },  
    validators: [Validators.email] 
}
export const GoogleAddressControl: Immutable<DynamicControl<string>> = {
    questionComponent: GooglePlacesAutoCompleteQuestionComponent,
    question: <GooglePlacesAutoCompleteQuestion>{
        placeholder: "Adresse", 
        hint: "F.eks. Furuberget 17, 1940 Bjørkelangen",
        resetable: true
    },  
    validators: [Validators.maxLength(ValidationRules.AddressMaxLength)] 
}
export const NameControl: Immutable<DynamicControl<string>> = {
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Navn"},  
    validators: [Validators.maxLength(ValidationRules.NameMaxLength)] 
}
export const FirstNameControl: Immutable<DynamicControl<string>> = {
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Fornavn" }, 
}
export const LastNameControl: Immutable<DynamicControl<string>> = { 
    questionComponent: InputQuestionComponent,
    question: <InputQuestion>{ placeholder: "Etternavn" }
}
export const MissionAutoCompleteControl: Immutable<DynamicControl<Mission, StateMissions>> = {  
    questionComponent: AutoCompleteQuestionComponent,
    question: <AutoCompleteQuestion<Mission, StateMissions>>{
        placeholder: "Oppdrag",
        lazyOptions: "all",
        valueFormatter: (val) => val.address,
        displayWith: (mission) => mission ? mission.address : null,
        resetable: true,
        activeFilter: { stringProps: ["address"], maxChecks: 50 },
        stateBindings: { 
            options: _formStateBinding<StateMissions, Mission[]>()( ["missions"] , (s) => s.missions || [] )
        }
    }, 
    validators: [isObjectValidator()], 
}
export const EmployerSelectControl: Immutable<DynamicControl<Employer, StateEmployers>> = { 
    questionComponent: SelectQuestionComponent,
    question: <SelectQuestion<Employer, StateEmployers>>{
        valueFormatter: (val) => val.name,
        compareWith: _compareProp<Employer>("id"),
        lazyOptions: "all",
        placeholder: "Velg oppdragsgiver",
        stateBindings: { 
            options: _formStateBinding<StateEmployers, Employer[]>()( ["employers"] , (s) => s.employers || [] )
        }
    },  
}
export const UserSelectControl: Immutable<DynamicControl<User, StateUsers>> = { 
    questionComponent: SelectQuestionComponent,
    question: <SelectQuestion<User, StateUsers>>{
        valueFormatter: (val) => val.firstName + ' ' + val.lastName,
        compareWith: _compareProp<User>("userName"),
        lazyOptions: "all",
        placeholder: "Velg ansatt",
        stateBindings: { 
            options: _formStateBinding<StateUsers, User[]>()( ["users"] , (s) => s.users || [] )
        }
    }, 
} 
export const UserNameControl: Immutable<DynamicControl<string>> = { 
    question: {placeholder: "Brukernavn"}, 
    questionComponent: InputQuestionComponent,
    validators: [
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(4),
        Validators.maxLength(ValidationRules.NameMaxLength)
    ] 
}